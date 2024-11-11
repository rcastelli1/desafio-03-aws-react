import { useState, useEffect } from "react"; 

const Header = () => {
  const [photoURL, setUserPhoto] = useState<string | null>(null); 

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]"); 
    if (users.length > 0) {
      const loggedInUser = users[users.length - 1];
      setUserPhoto(loggedInUser.photoURL); 
    }
  }, []); 

  return (
    <header>

    </header>
  );
};

export default Header; 
