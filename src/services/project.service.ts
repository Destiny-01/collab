import { queryChatGPT } from "../utils/openai";

export const generateProjectIdeas = async (
  category: string,
  idea: string,
  bio: string | undefined
) => {
  try {
    const prompt = `
            ---IDEA--- : ${idea}
            I want you to generate 3 well written project ideas under the ${category} category for a person with bio ${bio}
            NO TEXT, JUST JSON. Return only JSON
            Your response type should be strictly JSON, no javascript code or any code. Just a valid json of an array containing 3 objects {projects: []}. Return nothing more
            ${
              idea &&
              `I have an existing idea, and I would like your response to be related, around or built on it.
            The idea is labelled "---IDEA---"`
            }
            Your task is to generate 3 detailed project ideas that solves an existing problem. Each project is an object
            Each Project should contain a key "problem", that outlines the problem the idea solves
            It should also contain a key "solution" that describes the solution the idea brings
            It should also contain a key "impact" that describes the impact the idea brings on current day society
            It should contain a key "key_features" that outlines at least 7 main features of the idea
            It should contain a key "estimated_timeline" that outputs a feasible and estimated timeline for completion of the project
            It should contain a key "description" that's basically a detailed description of the project
            It should contain a key "short_description" that's basically a short description of the project
            It should contain a key "name" which is a suitable name for the project
            Based on the project, generate an attribute "core_skills" that'll be an array of 5 core skills in the ${category} space needed for the project
            Based on the project, generate an attribute "interests" that'll be an array of 5 interests to look out for in a user I want to invite
            Repeat those steps for the three projects and put the 3 project objects in an array, and output the array "projects"

            Return just the valid json object ONLY, and nothing more. MAKE SURE THE JSON IS VALID`;

    const result = await queryChatGPT(prompt);

    return result;
  } catch (error) {
    console.log({ "ERROR FROM CHATGPT PARENT FUNCTION": error });
    return null;
  }
};
