import GroupModel from "@/models/Group";
import { generateProjectIdeas } from "@/services/project.service";
import { EventEmitter } from "node:events";

class ApplicationEmitter extends EventEmitter {}

export const app = new ApplicationEmitter();

app.on(
  "query",
  async function (category: string, idea: string, bio: string, uuid: string) {
    const result = await generateProjectIdeas(category, idea, bio);
    if (!result) {
      return new Response("An error occurred while generating project ideas", {
        status: 400,
      });
    }
    const jsonString = result.replace(/'(?![^{]*})/g, '"');
    console.log(jsonString);
    const { projects } = JSON.parse(jsonString);

    await GroupModel.findOneAndUpdate({ uuid }, { suggestedTopics: projects });
  }
);
