import dbConnect from "@/lib/dbConnect"
import Post from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
        await dbConnect(); 
    try {
       const posts = await Post.find();
       return NextResponse.json({ posts });
    } catch (error) {
        return NextResponse.json(
            { message: 'posts are not fetched from backend', error: error.message },
            { status: 500 }
        );
    } 
}

export async function POST(request) {
    await dbConnect(); 
    try {
       const data =await request.json()
       
       const post = await Post.create(data);
       return NextResponse.json({ message: "posted created", post });
    } catch (error) {
        return NextResponse.json(
            { message: 'posts are not fetched from backend', error: error.message },
            { status: 500 }
        );
    } 
}