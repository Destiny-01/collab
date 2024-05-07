import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const queryChatGPT = async (prompt: string) => {
  const model = "gpt-3.5-turbo-instruct";
  const response = await openai.completions.create({
    model: model,
    prompt,
    max_tokens: 3000,
  });

  console.log(response);
  const result = response.choices[0]?.text;
  return result;
};
