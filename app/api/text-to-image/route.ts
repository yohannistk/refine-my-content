import { NextRequest, NextResponse } from "next/server";

const defaultErrorMessage = "Failed to process your request";
const defaultErrorStatus = 500;

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const files = formData.getAll("files") as File[];

  try {
    return NextResponse.json(
      {
        result: {
          summary: "",
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || defaultErrorMessage,
      },
      { status: defaultErrorStatus }
    );
  }
}
