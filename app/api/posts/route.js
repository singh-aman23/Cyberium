import connectToDB from "@/lib/mongodb"; 
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req) {
  try {
    await connectToDB();
    const { content } = await req.json(); // 
    const newPost = await Post.create({ content }); 
    return NextResponse.json(newPost);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
