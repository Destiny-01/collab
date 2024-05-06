import axios from "axios";
import UserModel, { User, UserDocument } from "@/models/User";
import Group from "../models/Group";
import { queryChatGPT } from "../utils/openai";
import { synonyms } from "@/utils/sortCountries";

function parseFeedbackString(feedbackString: string) {
  // Split the string by newline character and filter out empty strings
  const feedbackLines = feedbackString
    .split("\n")
    .filter((line) => line.trim() !== "");

  // Map each line to an object
  let feedbackObjects = feedbackLines.map((line) => {
    // Extract values using regular expressions
    const match = line.match(/\{([^}]+)\}/);
    const valuesString = match ? match[1] : "";

    if (valuesString === "") return;

    // Convert values string to an object
    const values = valuesString.split(",").reduce((acc: any, pair) => {
      const [key, value] = pair.split(":").map((part) => part.trim());
      acc[key] = value;
      return acc;
    }, {});

    return values;
  });
  feedbackObjects = feedbackObjects.filter((item) => item);

  return feedbackObjects;
}

const rateCandidatesWithGPT = async (user: User, applicants: User[]) => {
  const limit = 15;
  const batchLimit = 10;
  const delayBetweenRequests = 1000; // Adjust the delay as needed (in milliseconds)
  if (!user || applicants?.length < 3) {
    return null;
  }

  try {
    const results: User[] = [];

    for (let i = 0; i < applicants.length; i = i + batchLimit) {
      const applicantsForThisBatch = applicants
        .slice(i, i + batchLimit)
        .filter(Boolean);

      const prompt = `This document outlines a user profile with a bio "${
        user?.bio
      }".
            The other necessary details of the users are ${user}
            The document includes details about potential candidates (${JSON.stringify(
              applicantsForThisBatch
            )}).
            Your task is to assess each candidate on a scale from 1 to 100, considering factors
            such as their alignment with the user, his interests, his skills and his niche.
            Please provide feedback by identifying the (top ${limit} candidates ONLY) in descending order
            and assigning a percentage-based rating to each, ARRAY structured as Stringified JSON
            {applicant(in lowercase): the _id value from each applicant in ${applicantsForThisBatch} as a
            string, rating(in lowercase): x%, reason(in lowercase): reason for rating not more than 5 words}. Example of compulsory format output: '[
            '  { applicant: "6401ce264f36bae6e8c6b5b8", rating: "90%", reason: "aligned with bio" },\n' +
            '  { applicant: "64dc1a68c6179cb72e0fcd82", rating: "80%", reason: "relevant skills" },\n' +
            '  { applicant: "64004155e40177ee2b9408ab", rating: "70%", reason: "relevant skills" }' +
            ']' it should be in this particular format only. remember just the best ${limit} candidates.`;

      const rating = await queryChatGPT(prompt);
      const feedback = parseFeedbackString(rating || "");

      results.push(...feedback);

      // Introduce delay between requests
      await new Promise((resolve) => setTimeout(resolve, delayBetweenRequests));
    }

    return results;
  } catch (error) {
    console.log({ "ERROR FROM CHATGPT PARENT FUNCTION": error });
    return null;
  }
};

export const getMatchesForGroup = async (id: string, isGroup: boolean) => {
  try {
    const group = isGroup
      ? await Group.findById(id)
      : await UserModel.findById(id);

    const core_skills: any[] = await Promise.all([
      await synonyms(group.core_skills[0]),
      await synonyms(group.core_skills[1]),
      await synonyms(group.core_skills[2]),
      await synonyms(group.interests[0]),
      await synonyms(group.interests[1]),
    ]);

    const escapeRegExp = (str: string) => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };
    const searchRegexes = core_skills.map(
      (word: string) => new RegExp(escapeRegExp(word), "i")
    );

    const users = await UserModel.find({
      _id: { $ne: isGroup ? id : { $in: group.members } },
      niche: group.category,
      $or: [
        { "details.bio": { $regex: new RegExp(core_skills.join("|"), "i") } },
        { "details.interests": { $in: searchRegexes } },
        { "details.skills": { $in: searchRegexes } },
      ],
    });

    const matchedCandidates = await rateCandidatesWithGPT(group, users);
    return matchedCandidates;
  } catch (err) {
    console.log(err);
  }
};
