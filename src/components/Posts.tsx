import UserPost from "./UserPost"

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const Posts: React.FC<PostsProps> = ({posts, setPosts}) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,_270px)] justify-center gap-5 px-4 py-10">
        {
          posts.map((post, indice)=> <UserPost key={indice} post={post} setPosts={setPosts}/>)
        }
    </section>
  )
}

export default Posts