'use client'

const PostForm = ({ title, setTitle, content, setContent, editingPostId, onSubmit }) => {
    return (
        <div className='w-xl h-full flex flex-col justify-center items-center'>
            <h3 className='font-bold text-gray-100 text-4xl mb-8 text-center'>HighGate</h3>
            <div className='flex flex-col w-full'>
                <input onChange={(e) => setTitle(e.target.value)} type='text' value={title} placeholder='Enter Title of post' className='w-full h-8 rounded-full pl-3 mt-3 bg-white text-black focus:outline-blue-500 focus:outline-offset-2'></input>
                <input onChange={(e) => setContent(e.target.value)} type='text' value={content} placeholder='Enter Content here' className='w-full h-8 rounded-full pl-3 mt-3 bg-white text-black focus:outline-blue-500 focus:outline-offset-2' ></input>
                <button onClick={onSubmit} className='bg-gray-100 hover:bg-black hover:text-white transition-all rounded-full mt-4 py-2'>{editingPostId ? 'Update Post' : 'Create Post'}</button>
            </div>
        </div>
    )
}

export default PostForm

