import { contactUsSchema } from "@/zod_schemas";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

if (!process.env.MY_EMAIL) {
  throw new Error("Missing env var from MY_EMAIL");
}

if (!process.env.MY_PASSWORD) {
  throw new Error("Missing env var from MY_PASSWORD");
}

const defaultErrorMessage = "Failed to process your request";
const defaultErrorStatus = 500;

const sendMailPromise = (
  transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>,
  mailOptions: Mail.Options
) =>
  new Promise<string>((resolve, reject) => {
    transport.sendMail(mailOptions, function (err) {
      if (!err) {
        resolve("Email sent");
      } else {
        reject(err.message);
      }
    });
  });

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const responce = contactUsSchema.safeParse(data);
    if (!responce.success) {
      return NextResponse.json(
        {
          error: "Missing Content",
        },
        { status: 400 }
      );
    }
    const { email, message, subject } = responce.data;
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions: Mail.Options = {
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: subject,
      text: message,
    };

    await sendMailPromise(transporter, mailOptions);

    return NextResponse.json(
      {
        message: "Email sent",
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
