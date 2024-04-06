import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextRequest, NextResponse } from "next/server";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,

  server: process.env.MAILCHIMP_API_SERVER, // E.g. us1
});

if (!process.env.MAILCHIMP_API_KEY) {
  throw new Error("Missing env var from MAILCHIMP_API_KEY");
}
if (!process.env.MAILCHIMP_API_SERVER) {
  throw new Error("Missing env var from MAILCHIMP_API_SERVER");
}
if (!process.env.MAILCHIMP_AUDIENCE_ID) {
  throw new Error("Missing env var from MAILCHIMP_AUDIENCE_ID");
}

// eslint-disable-next-line import/no-anonymous-default-export
export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      {
        result: {
          corrections: "'Email is required'",
        },
      },
      { status: 200 }
    );
  }
  console.log(process.env.MAILCHIMP_AUDIENCE_ID);
  console.log(process.env.MAILCHIMP_API_KEY);
  console.log(process.env.MAILCHIMP_API_SERVER);

  try {
    const test = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        status: "subscribed",
      }
    );
    return NextResponse.json(
      {
        result: {
          corrections: "Email subscribed",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        result: {
          corrections: "Server Error",
        },
      },
      { status: 500 }
    );
  }
}
