import { queryChatGPT } from "../utils/openai";

export const generateProjectIdeas = async (
  category: string,
  idea: string,
  bio: string | undefined
) => {
  try {
    const prompt = `
            ---IDEA--- : ${idea}
            I want you to generate 3 well written project ideas under the ${category} category for a person with bio "${bio}"
            Your return type should be of type JSON structured in the form:
            {
             projects: [
               {
                 name:"", problem: "", solution: "", impact: "", keyFeatures: [], timeline:"", description: "", shortDescription:"", coreSkills: [], interests: []
               }
              ]}
            ${
              idea &&
              `I have an existing idea, and I would like your response to be ideas built on the original idea of the author.
              It should be strictly in the ${category} and must not be web based.
            The idea is labelled "---IDEA---"`
            }
            Your task is to generate 3 detailed project ideas that solves a unique, real world problem that impacts society. Each project is an object
            Each Project should contain a key "problem", that outlines the problem the idea solves, "solution" that describes the solution the idea brings,
            "impact" that describes the impact the idea brings on current day society, "keyFeatures" that outlines at least 7 main features of the idea, 
            "estimated_timeline" that outputs a feasible and estimated timeline for completion of the project, "description" that's basically a detailed description of the project
            "shortDescription" that's basically a short description of the project, "name" which is a suitable name for the project
            Based on the project, generate an attribute "coreSkills" that'll be an array of 5 core skills in the ${category} space needed for the project
            Based on the project, generate an attribute "interests" that'll be an array of 5 interests to look out for in a user I want to invite
            Repeat those steps for the three projects and put the 3 project objects in an array, and output the array "projects"

            Return just the valid json object ONLY in double quote pairs, and nothing more.
            No example, no test. JUST MAKE SURE THE JSON IS VALID and return just that`;

    console.log(prompt);

    const result = await queryChatGPT(prompt);

    return result;
  } catch (error) {
    console.log({ "ERROR FROM CHATGPT PARENT FUNCTION": error });
    return null;
  }
};
