import { FC } from "react";

interface HeaderProps {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({isShowModal, setIsShowModal}) => {

    const showModal =()=>{
        setIsShowModal(!isShowModal)
    }

  return (
    <header className=" flex flex-col justify-center items-center gap-4 pt-10">
        <h1 className='text-3xl font-bold text-center'>PUBLICACIONES CON JSONPlaceholder</h1>
        <span>Nota: Las nuevas publicaciones creadas se encuentra al final de la lista</span>
        <button onClick={showModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btncreatepost">
             Crear Publicación
        </button>
    </header>
  )
}

export default Header