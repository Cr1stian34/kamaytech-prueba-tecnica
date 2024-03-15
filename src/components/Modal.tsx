import axios from "axios";
import React, { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface ModalProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({posts, setPosts, isShowModal, setIsShowModal}) => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [nextId, setNextId] = useState(101);

  const handleCreatePost = async () => {
    const newPost:Post = {
      id: nextId, // Utiliza el ID del próximo post
      title,
      body
    };

    try {
      // Agrega el nuevo post al estado antes de enviar la solicitud
      setPosts([...posts, newPost]);
      // Incrementa el ID del próximo post
      setNextId(nextId + 1);
      // Envía el nuevo post a JSONPlaceholder
      await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      clouseModal();
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error al crear el post:', error);
    }
  };

  const clouseModal =()=>{
    setIsShowModal(!isShowModal)
}

  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault( )
  }
  // console.log(isShowModal)
  // console.log(newPost)
  return (
    <section className={`fixed top-0 bottom-0 right-0 left-0 bg-black/50 flex justify-center items-center ${isShowModal ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="relative max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
          <i className='bx bx-exit absolute top-2 right-2 text-3xl cursor-pointer' onClick={()=>clouseModal()}></i>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
  <div className="mb-4">
    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
      Título
    </label>
    <input
      id="title"
      type="text"
      name="title"
      placeholder="Ingrese el título de la publicación"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
      Contenido
    </label>
    <textarea
      id="body"
      name="body"
      placeholder="Ingrese el contenido de la publicación"
      value={body}
      onChange={(e) => setBody(e.target.value)}
      className="w-full border border-gray-300 rounded-md py-2 px-3 h-32 resize-none focus:outline-none focus:border-blue-500"
    ></textarea>
  </div>
  <div className="text-center">
    <button
      onClick={handleCreatePost}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Crear Publicación
    </button>
  </div>
</form>
    </div>
    </section>
  )
}

export default Modal