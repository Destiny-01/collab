import User from "@/app/models/User";
import { NextApiHandler } from "next";
import getCurrentUser from "@/app/utils/getCurrentUser";
import Group from "@/app/models/Group";
import { generateProjectIdeas } from "@/app/services/project.service";
import { uuid } from "uuidv4";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { currentUser } = await getCurrentUser();
      if (!currentUser) {
        return new Response("Invalid authentication", {
          status: 401,
        });
      }

      const { category, idea, type_of_members, visibility } = req.body;

      const result = await generateProjectIdeas(
        category,
        idea,
        type_of_members
      );
      if (!result) {
        return new Response(
          "An error occurred while generating project ideas",
          {
            status: 400,
          }
        );
      }

      const { projects } = JSON.parse(result);
      const group = await Group.create({
        uuid: uuid(),
        category,
        owner: currentUser._id,
        suggestedTopics: projects,
        visibility,
      });
      currentUser.groups.push(group._id);
      await currentUser.save();

      return Response.json({ success: true, data: projects, uuid: group.uuid });
    }
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};

export default handler;
