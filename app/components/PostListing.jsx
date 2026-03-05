'use client'

import { SquarePen, Trash } from 'lucide-react';
import Link from 'next/link';

const PostListing = ({ handleDeletePost , data , isLoading}) => {
    return (
        <div className='w-xl'>
            <div className='bg-gray-700 text-gray-300'>
                {isLoading ? "loading posts" : data.posts.map(post => (
                    <div className='bg-gray-800 my-8 flex justify-between border border-amber-600 rounded-xl py-2 px-4 w-full h-full' key={post._id}>
                        <div>
                            <h3 className='font-bold text-xl'>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                        <div>
                            <button onClick={() => handleDeletePost(post._id)}>
                                <Trash />
                            </button>
                            <Link href={`/posts/update/${post._id}`}>
                                <button>
                                    <SquarePen />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostListing