'use client'
import { useEffect, useState } from 'react';
import { useUpdatePost } from "@/hooks";
import PostForm from '@/app/components/PostForm';
import { fetchPost } from '@/api/post';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const UpdatePage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { mutate: updateMutate } = useUpdatePost();

  useEffect(() => {
    const loadPost = async () => {
      try {
        setIsLoading(true);
        const result = await fetchPost(id);
        setTitle(result.post.title);
        setContent(result.post.content);
      } catch (err) {
        setError('Failed to fetch post');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id]);

  const handleUpdatePost = () => {
    const post = { title, content };
    updateMutate({ id, post }, {
      onSuccess: () => {
        setTitle('');
        setContent('');
        router.push('/');
      },
      onError: (error) => {
        setError('Failed to update post');
        console.error(error);
      }
    });
  };

  if (isLoading) {
    return <div className='w-screen h-full min-h-screen flex items-center justify-center bg-gray-800'>
      <div className='text-gray-100'>Loading post...</div>
    </div>;
  }

  if (error) {
    return <div className='w-screen h-full min-h-screen flex items-center justify-center bg-gray-800'>
      <div className='text-red-400'>{error}</div>
    </div>;
  }

  return (
    <div className='w-screen h-full min-h-screen flex items-center justify-center bg-gray-800'>
      <div className='w-xl'>
        <PostForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          editingPostId={id}
          onSubmit={handleUpdatePost}
        />
      </div>
    </div>
  );
};

export default UpdatePage;