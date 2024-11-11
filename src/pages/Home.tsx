import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { app } from "../fireBase.config";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const Home: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]); 

  const navigate = useNavigate();
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth(app);

  const githubSignUp = () => {
    signInWithPopup(auth, githubProvider)
      .then((response) => {
        const login = response._tokenResponse.screenName;
        const name = response.user.displayName || ""; 
        const photoURL = response.user.photoURL;
  
        const users = JSON.parse(localStorage.getItem("users") || "[]");
  
        const userExists = users.some((u) => u.login === login);
  
        if (!userExists && login) {
          users.push({ login, name, photoURL }); 
          localStorage.setItem("users", JSON.stringify(users));
        }
  
        navigate("/portfolio", { state: { login, photoURL } });
      })
      .catch((err) => {
        console.log(err.code);
      });
  };
  
  useEffect(() => {
    if (searchTerm.trim()) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const filteredUsers = users
        .filter(
          (user: { name?: string; login?: string }) =>
            (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.login && user.login.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .map((user: { name?: string; login: string }) => ({
          name: user.name || user.login, 
          login: user.login, 
        }));
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);
  
const handleSearch = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userFound = users.find(
      (user) =>
        user.login.toLowerCase() === searchTerm.toLowerCase() ||
        user.name?.toLowerCase() === searchTerm.toLowerCase() 
    );
  
    setUserExists(!!userFound);
  
    if (userFound) {
      navigate("/portfolio", { state: { login: userFound.login } });
    }
  };
  
  

  return (
    <div>
      
    </div>
  );
};

export default Home;