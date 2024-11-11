import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";

const Header = ({ isAuthenticatedUser, scrollToStart, scrollToHistory, scrollToExperience, scrollToContact, toggleEditMode, isEditMode }) => {
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
    <header>
      
    </header>
  );
};

export default Header; 