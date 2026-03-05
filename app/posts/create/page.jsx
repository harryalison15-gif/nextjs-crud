'use client'
import PostForm from '@/app/components/PostForm';
import { useCreatePost} from '@/hooks';
import { useState } from 'react';
import {useRouter} from 'next/navigation'
const Home = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { mutate: createMutate } = useCreatePost();
  const router = useRouter()
  const handlePostsCreate = () => {
    createMutate({ title, content });
    setTitle('');
    setContent('');
  }

  const handleSubmit = () => {
     handlePostsCreate()
    router.push('/')
  }

  return (
    <div className='w-screen h-full min-h-screen flex items-center justify-center bg-gray-800'>
      <div className='w-xl'>
        <PostForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default Home