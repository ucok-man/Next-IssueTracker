import { issueFormInputValidation } from "@/types/issueFormInputValidation";
import prisma from "@db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const input = await req.json();
  const { error, data } = issueFormInputValidation.safeParse(input);
  if (error) {
    return NextResponse.json({ error: error.format() }, { status: 400 });
  }
  const issue = await prisma.issue.create({
    data: {
      title: data.title,
      description: data.description,
    },
  });

  const response = { data: issue };
  return NextResponse.json(response, {
    status: 201,
  });
}
