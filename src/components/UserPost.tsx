import React, { useEffect, useState } from 'react'
import ModalEditPost from './ModalEditPost'
import axios from 'axios';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface UserPostProps {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const UserPost: React.FC<UserPostProps> = ({post, setPosts}) => {
  const [editPost, seteEditPost] = useState<boolean>(false);
  const [hiddenComments, setHiddenComments] = useState<boolean>(false)
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  };

  const handleAddComment = () => {
    const comment = {
      postId: post.id,
      id: Math.floor(Math.random() * 1000) + 1, // Simulamos un ID único
      name: 'Usuario',
      email: 'usuario@example.com',
      body: newComment
    };
    setComments(prevComments => [...prevComments, comment]);
    setNewComment('');
  };

  const openModal = ()=>{
    seteEditPost(!editPost);
}

const handleDeletePost = (postId: number) => {
  axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => {
      if(response.status === 200) {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      } else {
        console.error('Failed to delete post:', response.status);
      }
    })
    .catch(error => console.error('Error deleting post:', error));
};

const ocultarComentarios = ()=>{
  setHiddenComments(!hiddenComments)
}
    // console.log(post);
  return (
    <article className='border bg-[#272626] text-white cardpost'>
      <div className='p-4'>
      <p className=' text-center'>{post.title}</p>
      </div>
      <div className='p-2'>
      <p className=' text-[#878585]'>{post.body}</p>
      </div>
      <div className='flex gap-2 justify-center items-center p-4'>
          <button className=" bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
            Actualizar
          </button>
          <button onClick={()=>handleDeletePost(post.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
             Eliminar
          </button>
      </div>
      {/* <div className='w-[100%] mb-4 flex justify-end pr-4'>
        <span className=' text-slate-500 hover:text-white cursor-pointer transition-colors'>Agregar comentario</span>
      </div> */}
      <div className='w-[100%] mb-4 flex justify-center items-center p-2'>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          onClick={handleAddComment}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar comentario
        </button>
      </div>
      <div className=' text-slate-500 flex justify-end mr-4 mb-2 hover:text-white cursor-pointer transition-colors'><span onClick={ocultarComentarios}>Mostrar/Ocultar Comentarios</span></div>
      <div className={`${hiddenComments? "visible opacity-100": "hidden"} transition-all`}>
        <h3 className="text-lg font-semibold mb-2 ml-2">Comentarios</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className='border m-2 p-2 justify-center rounded-md'>{comment.body}</li>
          ))}
        </ul>
      </div>

      {
            editPost? <ModalEditPost post={post} editPost={editPost} seteEditPost={seteEditPost} setPosts={setPosts}/> : " "
      }
    </article>
  )
}

export default UserPost