import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post.model";

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

export async function PATCH(request, { params }) {
    await dbConnect()
    try {
        const post = await request.json()
        const { id } = await params

        if (!id || id.length !== 24) {
            return NextResponse.json({ message: "Invalid post ID format" }, { status: 400 });
        }

        const updatePost = await Post.findByIdAndUpdate(id, post, { new: true })

        if (!updatePost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post updated successfully", post: updatePost });
    } catch (error) {
        console.error("PATCH Error:", error)
        return NextResponse.json(
            { message: 'Error updating post', error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    await dbConnect()
    try {
        const { id } = await params
        console.log("Fetching post with id:", id)

        // Validate MongoDB ObjectId format
        if (!id || id.length !== 24) {
            return NextResponse.json({ message: "Invalid post ID format" }, { status: 400 });
        }

        const post = await Post.findById(id)

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post fetched successfully", post });
    } catch (error) {
        console.error("GET Error:", error)
        return NextResponse.json(
            { message: 'Error fetching post', error: error.message },
            { status: 500 }
        );
    }
}