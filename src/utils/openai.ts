import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const queryChatGPT = async (prompt: string) => {
  const model = "gpt-3.5-turbo-instruct";
  const response = await openai.chat.completions.create({
    model: model,
    messages: [{ role: "user", content: prompt }],
    max_tokens: 200,
  });

  const result = response.choices[0]?.message.content;

  return result;
};
