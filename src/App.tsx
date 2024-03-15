import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Posts from './components/Posts'
import Header from './components/Header'
import Modal from './components/Modal'
import { Post } from './constans/types'

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  const getAllPosts = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => setPosts(res.data))
    .catch((err) => console.log(err))
  };

  useEffect(() => {
    getAllPosts();
  }, [])

  // console.log(posts);
  // console.log(isShowModal)
  return (
    <main className='bg-[#f2cc97]'>
      <Header isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
      <Modal posts={posts} setPosts={setPosts} isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
      <Posts posts={posts} setPosts={setPosts}/>
    </main>
  )
}

export default App
