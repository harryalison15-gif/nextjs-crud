import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post.model";
import { IdCardLanyard } from "lucide-react";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const deletedPost = await Post.findByIdAndDelete(id);
        console.log(id)
        if (!deletedPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post deleted successfully", id });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error deleting post', error: error.message },
            { status: 500 }
        );
    }
}

export async function PATCH(request,{params}) {
    await dbConnect() 
    try {
        const post = await request.json()
        const {id} = await params
        const updatePost = await Post.findByIdAndUpdate(id,post)
        return NextResponse.json({ message: "Post updated successfully", updatePost });
     } catch (error) {
        return NextResponse.json(
            { message: 'Error updating post', error: error.message },
            { status: 500 }
        );
    }
}