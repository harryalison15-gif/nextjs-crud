'use client'
import { useState } from 'react';
import { useCreatePost, useDeletePost, useFetchPosts, useUpdatePost } from "@/hooks";
import PostForm from "../components/PostForm"
import PostListing from "../components/PostListing";

const Home = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingPostId, setEditingPostId] = useState(null);

  const { mutate: createMutate } = useCreatePost();
  const { mutate: updateMutate } = useUpdatePost();
  const { mutate: deleteMutate, isSuccess: deleteIsSuccess } = useDeletePost();
  const { isLoading, data } = useFetchPosts();

  const handleDeletePost = (id) => {
    deleteMutate(id);
    if (deleteIsSuccess) {
      alert('deleted')
    }
  }

  const handlePostsCreate = () => {
    createMutate({ title, content });
    setTitle('');
    setContent('');
  }

  const handleUpdatePost = async () => {
    console.log(editingPostId)
    const id = editingPostId
    const post = { title, content }
    updateMutate({ id, post })
    setTitle('');
    setContent('');
    setEditingPostId(null);
  }

  const startEdit = (post) => {
    setEditingPostId(post._id);
    setTitle(post.title)
    setContent(post.content)
  }

  const handleSubmit = () => {
    editingPostId ? handleUpdatePost() : handlePostsCreate()
  }

  return (
    <div className='w-screen h-full min-h-screen flex items-center justify-center bg-gray-800'>
      <div className='w-xl'>
        <PostForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          editingPostId={editingPostId}
          onSubmit={handleSubmit}
        />
        <PostListing
          startEdit={startEdit}
          handleDeletePost={handleDeletePost}
          data={data}
          isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Home