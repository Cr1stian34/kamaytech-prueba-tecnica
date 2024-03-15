import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Post } from "../constans/types";

interface ModalEditPostProps {
  post: Post;
  editPost: boolean;
  seteEditPost: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const ModalEditPost: React.FC<ModalEditPostProps> = ({post, editPost, seteEditPost, setPosts}) => {
    const [editedPost, setEditedPost] = useState<Post>(post);

    const clouseModal = ()=>{
        seteEditPost(!editPost)
    }

    const handleFormEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        axios.patch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, editedPost)
          .then((response) => {
            console.log('Post actualizado:', response.data);
            const updatePost = response.data;
            setEditedPost(updatePost);
            setPosts(prevPosts => prevPosts.map(prevPost=> prevPost.id === updatePost.id ? updatePost : prevPost))
            clouseModal();
          })
          .catch((error) => {
            console.error('Error al actualizar el post:', error);
          });
      };
    

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedPost({ ...editedPost, [name]: value });
      };
    // console.log(post)
  return (
    <section className='fixed top-0 left-0 w-[100%] h-[100vh] bg-black/50 flex justify-center items-center'>
            <form onSubmit={handleFormEdit} className='relative max-w-md mx-auto p-8 bg-white shadow-md rounded-lg'>
                <button type='button' className='absolute top-5 right-8 border border-[black] px-2 bg-black' onClick={clouseModal}>X</button>
                <h2 className='text-2xl font-semibold mb-4 text-black'>Editar Post</h2>
                <input name='title' type="text" defaultValue={post.title} onChange={handleChange} placeholder='titulo' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black' required/>
                <textarea name='body' defaultValue={post.body} onChange={handleChange} placeholder='texto' className='mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black' required/>
                <button type='submit' className=' bg-slate-950 text-white p-2 rounded-md mt-3'>Actualizar</button>
            </form>
        </section>
  )
}

export default ModalEditPost