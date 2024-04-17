import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import * as diff from "diff";
import { Replacement } from "@/components/ContentEditor/extensions/GrammarChecker.types";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export type Correction = {
  replacements: Replacement[];
  offset: number;
  length: number;
  message?: string;
};

// const compareSentences = (
//   incorrectSentence: string,
//   correctSentence: string
// ): Correction[] => {
//   const string_one = incorrectSentence.split(" ");
//   const string_two = correctSentence.split(" ");
//   const corrections: Correction[] = [];
//   const correction = diff.diffArrays(string_one, string_two);
//   console.log(correction);
//   let currentOffset = 0;
//   correction.forEach((cor: any, index: number) => {
//     if (!cor.removed && !cor.added) {
//       currentOffset += cor.value.join(" ").length + 1;
//     } else if (
//       cor.removed &&
//       index < correction.length - 1 &&
//       correction[index + 1].added
//     ) {
//     } else if (
//       cor.removed &&
//       index < correction.length - 1 &&
//       !correction[index + 1].added
//     ) {
//       corrections.push({
//         original: ` ${cor.value.join(" ")}`,
//         correction: "",
//         offset: currentOffset,
//         length: cor.value.join(" ").length + 1,
//       });
//       currentOffset += cor.value.join(" ").length;
//     } else if (cor.added && index > 0 && !correction[index - 1].removed) {
//       const pverCor = correction[index - 1].value;
//       const prevValue = pverCor[pverCor.length - 1];
//       // const correct = `${correction[index - 1].value.join(" ")} ${correction[
//       //   index
//       const correct = `${prevValue} ${correction[index].value.join(" ")}`;
//       corrections.push({
//         original: prevValue,
//         // original: correction[index - 1].value.join(" "),
//         correction: correct,
//         offset: currentOffset - prevValue.length,
//         // offset: currentOffset - correction[index - 1].value.join(" ").length + 1,
//         length: prevValue.length,
//         // length: correction[index - 1].value.join(" ").length,
//       });
//       // currentOffset += correction[index].value.length + 1;
//     } else if (cor.added && index > 0 && correction[index - 1].removed) {
//       corrections.push({
//         original: correction[index - 1].value.join(" "),
//         correction: `${correction[index].value.join(" ")}`,
//         offset: currentOffset + 1,
//         length: correction[index - 1].value.join(" ").length,
//       });
//       currentOffset += correction[index].value.join(" ").length;
//     }
//   });
//   return corrections;
// };
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
type Data = {
  result?: {
    corrections: Correction[];
  };
  error?: string;
};
const defaultErrorMessage = "Failed to process your request";
const defaultErrorStatus = 500;

function generatePrompt(message: string) {
  return `
Here is my text: ${message}.`;
}

export async function POST(req: NextRequest) {
  try {
    const data: { content: string } = await req.json();

    if (!data.content) {
      return NextResponse.json(
        {
          error: "Missing Content",
        },
        { status: 400 }
      );
    }
    const content = data.content.trim().replaceAll("\n", "");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Correct the grammar of this sentence ${content}.
     Responce: your response must be the original sentence if the grammar is correct
     or the correct grammar if you made changes.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const response_content: string = response.text();

    const response_content_splitted = response_content.split(" ");
    const content_splitted = content.split(" ");
    const incorrectSentence =
      "The survey we performed recently showed that most of customers are satisfied.";
    const correctSentence =
      "The survey we performed recently showed that most of the customers are satisfied.";

    let finalResponse: diff.ArrayChange<string>[] = diff.diffArrays(
      content_splitted,
      response_content_splitted
    );

    return NextResponse.json(
      {
        result: {
          corrections: finalResponse,
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

// function getIndicesOf(
//   searchStr: string,
//   content: string,
//   caseSensitive = false
// ) {
//   let searchStrLen = searchStr.length;
//   if (searchStrLen == 0) {
//     return [];
//   }

//   let startIndex = 0,
//     index,
//     indices = [];
//   if (!caseSensitive) {
//     content = content.toLowerCase();
//     searchStr = searchStr.toLowerCase();
//   }

//   while ((index = content.indexOf(searchStr, startIndex)) > -1) {
//     indices.push(index);
//     startIndex = index + searchStrLen;
//   }

//   return indices;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const data: { content: string } = await req.json();
//     const content = data.content.trim();
//     if (!content) {
//       return NextResponse.json(
//         {
//           error: "Missing Content",
//         },
//         { status: 400 }
//       );
//     }
//     let prompt = generatePrompt(content);

//     const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       max_tokens: 800,
//       n: 1,
//     });

//     const response_content = (
//       completion?.data?.choices[0]?.message?.content ?? "[]"
//     ).toString();
//     // console.log("completion?.data?.choices[0]?.message?.content", )
//     const response = JSON.parse(response_content);

//     console.log("corrections by openai :: ", response?.corrections);

//     const finalResponse: Correction[] = [];

//     for (const correction of response?.corrections) {
//       // find all matching words with offset position
//       const offsets = getIndicesOf(correction.original, content, true);
//       // console.log(correction);
//       // const offsets = [
//       //   ...content.matchAll(new RegExp(correction.original, "gi")),
//       // ].map((a) => a.index);

//       if (offsets.length) {
//         // create a new correction object with offset position
//         for (const offset of offsets) {
//           const newCorrectionObject: Correction = {
//             original: correction.original,
//             correction: correction.correction,
//             offset: offset + 1,
//             length: correction.original.length,
//           };
//           finalResponse.push(newCorrectionObject);
//         }
//       }
//     }

//     console.log("content ", finalResponse);
//     return NextResponse.json(
//       {
//         result: {
//           corrections: finalResponse,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     if (error.response) {
//       return NextResponse.json(
//         {
//           error: error?.response?.data || defaultErrorMessage,
//         },
//         {
//           status: error?.response?.status || defaultErrorStatus,
//         }
//       );
//     }

//     return NextResponse.json(
//       {
//         error: error?.message || defaultErrorMessage,
//       },
//       { status: defaultErrorStatus }
//     );
//   }
// }
