import { SummarizationMode } from "@/app/(landing)/summarizer/components/ContentSummarizer";
import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const defaultErrorMessage = "Failed to process your request";
const defaultErrorStatus = 500;

export async function POST(req: NextRequest) {
  try {
    const data: { content: string; mode: SummarizationMode } = await req.json();

    const content = data.content.trim();
    console.log("data.mode ", data.mode);
    if (!content || !data.mode) {
      return NextResponse.json(
        {
          error: "Missing Content",
        },
        { status: 400 }
      );
    }

    // const completion = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "You will be provided with statements, and your task is to convert them to grammatically correct English. Jus fix the grammar mistakes, punctuation mistakes and do not suggest new word.",
    //       // content:
    //       //   "You will be provided with statements, and your task is to convert them to standard English. Do not add any suggestions just fix the grammar and the spilling error.",
    //     },
    //     { role: "user", content },
    //   ],
    //   temperature: 0.7,
    //   top_p: 1,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    //   max_tokens: 800,
    //   n: 1,
    // });

    // const response_content: string =
    //   completion?.data?.choices[0]?.message?.content!.toString()!;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Your task is to paraphrase a sentence using synonyms easy words. using the mode ${data.mode} just return 
    the paraphrased result in text format.
    
    Here is my text ${content}
      `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const response_content = response.text();

    return NextResponse.json(
      {
        result: {
          summary: response_content,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      return NextResponse.json(
        {
          error: error?.response?.data || defaultErrorMessage,
        },
        {
          status: error?.response?.status || defaultErrorStatus,
        }
      );
    }

    return NextResponse.json(
      {
        error: error?.message || defaultErrorMessage,
      },
      { status: defaultErrorStatus }
    );
  }
}
