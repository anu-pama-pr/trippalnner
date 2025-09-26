import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json(); // get the form data
    console.log("Received contact form data:", data);

    // Here you can also send an email using Nodemailer or EmailJS

    return NextResponse.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error submitting form" }, { status: 500 });
  }
}
