
import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion =
      await client.chat.completions.create({
        model: "gpt-4o-mini",

        messages: [
          {
            role: "system",
            content: `
You are FluencyGo AI Coach.

Help users improve their English.

Always respond with:

IMPROVED VERSION

VOCABULARY

LEVEL

FEEDBACK

Keep responses practical and concise.
`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

    return NextResponse.json({
      response:
        completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "OpenAI request failed",
      },
      {
        status: 500,
      }
    );
  }
}
