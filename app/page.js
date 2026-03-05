'use client'
import { useDeletePost, useFetchPosts } from "@/hooks";
import PostListing from "./components/PostListing";
import Link from 'next/link';

const Home = () => {
  const { mutate: deleteMutate, isSuccess: deleteIsSuccess } = useDeletePost();
  const { isLoading, data } = useFetchPosts();

  const handleDeletePost = (id) => {
    deleteMutate(id);
    if (deleteIsSuccess) {
      alert('deleted')
    }
  }

  return (
    <div className='w-screen h-full min-h-screen flex items-center justify-center bg-gray-800'>
      <div className='w-xl'>
        <div className='flex justify-between items-center'><h4>We have {data?.posts.length} Posts</h4>   <Link href={'/posts/create'}>Create Post</Link>    </div>
        <PostListing
          handleDeletePost={handleDeletePost}
          data={data}
          isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Home