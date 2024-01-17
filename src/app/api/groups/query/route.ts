import { NextApiHandler } from "next";
import getCurrentUser from "@/utils/getCurrentUser";
import Group from "@/models/Group";
import { generateProjectIdeas } from "@/services/project.service";
import { v4 as uuid } from "uuid";

export const POST = async (req: Request, res: Response) => {
  try {
    const { currentUser } = await getCurrentUser();
    if (!currentUser) {
      return new Response("Invalid authentication", {
        status: 401,
      });
    }

    const { category, idea, bio } = await req.json();
    console.log(category, idea, bio);

    // const result = await generateProjectIdeas(
    //   category,
    //   idea,
    //   currentUser?.details?.bio || bio
    // );
    // if (!result) {
    //   return new Response("An error occurred while generating project ideas", {
    //     status: 400,
    //   });
    // }
    // const jsonString = result.replace(/'/g, '"');
    //     const { projects } = JSON.parse(jsonString);
    const { projects } = {
      projects: [
        {
          name: "SoundSpire",
          problem:
            "Musicians struggle to come up with new and unique sounds, often falling into the trap of using the same melodies and chords repeatedly.",
          solution:
            "GenAI will analyze existing popular songs and create a database of unique chord progressions and melodies to inspire musicians.",
          impact:
            "Encourages creativity and helps musicians break out of repetitive patterns, leading to more diverse and engaging music.",
          keyFeatures: [
            "Database of analyzed popular songs",
            "Machine learning algorithms to generate unique melodies and chord progressions",
            "Option to choose a specific genre or style",
            "Tempo and key customization",
            "Real-time playback of generated ideas",
            "Option to save and export ideas for later use",
            "Continuous updates and additions to the database",
          ],
          complexity: "Intermediate",
          timeline: "6 months",
          description:
            "GenAI is a web-based application that uses intelligent algorithms to analyze and generate unique melodies and chord progressions. It aims to inspire musicians and provide them with endless possibilities for creativity in their music-making process.",
          shortDescription: "AI music generator",
          coreSkills: ["Music theory", "Programming", "Machine learning"],
          interests: ["Music", "Technology"],
        },
        {
          name: "BeatBuilder AI",
          problem:
            "Developing different drum patterns and beats can be time-consuming, especially for beginners in music production.",
          solution:
            "GenAI will have a feature that generates drum patterns and beats based on the chosen tempo and style, saving time and effort for musicians.",
          impact:
            "Saves time and energy in the music production process, making it more accessible for beginners to experiment with different drum patterns and beats.",
          keyFeatures: [
            "Customizable drum kits",
            "Tempo and style selection",
            "Ability to tweak and adjust generated patterns",
            "Real-time playback",
            "Option to save and export patterns",
            "Continuous updates and additions to the drum kits",
          ],
          complexity: "Beginner",
          timeline: "3 months",
          description:
            "GenAI is expanding its offerings to include a drum pattern generator. Using its intelligent algorithms, it will create unique and diverse drum patterns for musicians to use in their music production.",
          shortDescription: "Drum pattern generator",
          coreSkills: ["Music production", "Programming", "Machine learning"],
          interests: ["Music", "Technology"],
        },
        {
          name: "TuneTraining",
          problem:
            "Learning an instrument can be difficult and overwhelming for beginners, leading to high drop-out rates.",
          solution:
            "GenAI will offer interactive lessons and exercises for different instruments, using audio and visual cues to aid in the learning process.",
          impact:
            "Makes learning an instrument more accessible and engaging, increasing the likelihood of sticking with it and improving overall music skills.",
          keyFeatures: [
            "Video tutorials and demonstrations",
            "Interactive exercises",
            "Visual and audio cues for better understanding",
            "Progress tracking",
            "Personalized learning paths",
            "Option to connect with other learners",
            "Continuous updates and additions to the lesson library",
          ],
          complexity: "Beginner",
          timeline: "4 months",
          description:
            "GenAI is expanding its services to include interactive lessons and exercises for different instruments. Using AI technology, it will provide personalized learning paths for beginners to improve their skills in an engaging and interactive way.",
          shortDescription: "AI music lessons",
          coreSkills: ["Music theory", "Instrument proficiency", "Programming"],
          interests: ["Music", "Technology"],
        },
      ],
    };

    const group = await Group.create({
      uuid: uuid(),
      category,
      owner: currentUser._id,
      suggestedTopics: projects,
    });
    currentUser.groups.push(group._id);
    await currentUser.save();

    return Response.json({ success: true, data: projects, uuid: group.uuid });
  } catch (err) {
    console.log(err);
    return new Response("An error occurred", {
      status: 400,
    });
  }
};
