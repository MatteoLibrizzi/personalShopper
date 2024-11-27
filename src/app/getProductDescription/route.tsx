import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const body = await request.json();

  const age = body.age;
  const likesInFreetime = body.likesInFreetime;
  const worksInSector = body.worksInSector;
  const isEcoFriendly = body.isEcoFriendly;

  if (age > 40) {
    return new Response(
      JSON.stringify({
        description:
          "Stay refreshed and eco-conscious with our sleek reusable bottle, perfect for busy parents. Its durable, non-toxic materials ensure safe hydration, while the leak-proof design fits seamlessly into your bustling routine. Plus, by choosing this bottle, you're making a positive impact on the planet for your beloved family's future.",
      })
    );
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an expert in selling reusable bottles to different people. Based on the following user description: Generate a description of about 50 words of the bottle to make it more appealing to this user. Do not repeat user information.",
      },
      {
        role: "user",
        content: `I am ${age} years old. In my free time I like to ${likesInFreetime}. I work in ${worksInSector}. ${
          isEcoFriendly ? "I care about the environment." : ""
        }`,
      },
    ],
  });

  console.log("body", body);

  console.log("compl: ", completion.choices[0].message);

  return new Response(
    JSON.stringify({
      description:
        completion.choices[0].message.content ??
        "Urban Bottle is our iconic non-insulated, reusable water bottle. Surprisingly lightweight and space-saving, it is designed for your comfortable daily hydration. What’s EXTRA with the REactive Collection? Fill with cold drinks and watch the colour REact!",
    })
  );
}
