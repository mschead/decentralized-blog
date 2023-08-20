import { ENV_VARIABLES } from "@/app/api/post/config";
import { NextRequest, NextResponse } from "next/server";
import { Web3Storage } from "web3.storage";

const client = new Web3Storage({
  token: ENV_VARIABLES.WEB3_STORAGE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const fileContent: File | null = data.get("content") as File;
  if (!fileContent) {
    return NextResponse.json(
      { error: "The file content is empty!" },
      { status: 500 }
    );
  }
  const cid = await client.put([fileContent]);
  return NextResponse.json({ cid });
}

export async function GET(req: NextRequest) {
  const cid = req.nextUrl.searchParams.get("cid");
  if (!cid) {
    return NextResponse.json({ error: "The cid is empty!" }, { status: 500 });
  }
  const clientRes = await client.get(cid);
  if (!clientRes?.ok) {
    return NextResponse.json(
      { error: `Failed to get ${cid}!` },
      { status: 500 }
    );
  }
  const files = await clientRes.files();
  const content = await files[0].text();
  return NextResponse.json({ content });
}
