import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";

import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { HiOutlineCheck } from "react-icons/hi";

interface HeaderProps {
  isAuthenticatedUser: boolean;
  scrollToStart: () => void;
  scrollToHistory: () => void;
  scrollToExperience: () => void;
  scrollToContact: () => void;
  toggleEditMode: () => void;
  isEditMode: boolean;
}


const Header: React.FC<HeaderProps> = ({ isAuthenticatedUser, scrollToStart, scrollToHistory, scrollToExperience, scrollToContact, toggleEditMode, isEditMode }) => {
  const [photoURL, setUserPhoto] = useState<string | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]"); 
    if (users.length > 0) {
      const loggedInUser = users[users.length - 1]; 
      setUserPhoto(loggedInUser.photoURL); 
      
    }
  }, []); 

  const handleLogout = () => {
    setUserPhoto(null);
    navigate("/"); 
  };

  const handleLoginClick = () => {
    navigate("/"); 
  };

  return (
    <header className="flex justify-between bg-dark_green text-second_text font-semibold px-6 py-6 rounded-b-2xl fixed w-full z-20 text-xl">
      {!isAuthenticatedUser ? (
  <button
    onClick={toggleEditMode} 
    className="fixed top-28 right-4 p-4 bg-card_color hover:bg-tertiary_color rounded-full text-second_text z-20 flex items-center space-x-1 cursor-pointer"
  >
    {isEditMode ? <HiOutlineCheck size={45} /> : <MdEdit size={45} />}
  </button>
) : (
    <span></span> 
)}
      <span></span> 
      <nav className="flex justify-between items-center"> 
        <ul className="flex space-x-16"> 
          <li>
            <button onClick={scrollToStart} className="hover:text-tertiary_color">
              Início 
            </button>
          </li>
          <li>
            <button onClick={scrollToHistory} className="hover:text-tertiary_color">
              Minha história 
            </button>
          </li>
          <li>
            <button onClick={scrollToExperience} className="hover:text-tertiary_color">
              Experiências 
            </button>
          </li>
          <li>
            <button onClick={scrollToContact} className="hover:text-tertiary_color">
              Contato 
            </button>
          </li>
        </ul>
      </nav>

      {isAuthenticatedUser ? (
        <a onClick={handleLoginClick} className="flex items-center space-x-1 hover:text-tertiary_color cursor-pointer">
        <FaArrowRightToBracket /> 
        <span>Entrar</span> 
      </a>
      ) : (
        <a onClick={handleLogout} className="flex items-center space-x-1 hover:text-tertiary_color cursor-pointer">
          
          <span className="pr-2">Sair</span> 
          {photoURL && <img src={photoURL} alt="User" className="w-10 h-10 rounded-full" />}
        </a>
      )}

      
    </header>
  );
};

export default Header; 