import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/Home";  // Importando a interface User

import { app } from "../fireBase.config";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { FaArrowRight } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);  

  const navigate = useNavigate();
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth(app);

  const githubSignUp = () => {
    signInWithPopup(auth, githubProvider)
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const login = (response as any)._tokenResponse.screenName; 
        const name = response.user.displayName || "";
        const photoURL = response.user.photoURL;

        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

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
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const filteredUsers = users
      .filter(
        (user) =>
          (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.login && user.login.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .map((user) => ({
        name: user.name || user.login,
        login: user.login,
        photoURL: user.photoURL || null, 
      }));
    setSearchResults(filteredUsers);
  } else {
    setSearchResults([]);
  }
}, [searchTerm]);

  const handleSearch = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
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

  const handleUserClick = (login: string) => {
    navigate("/portfolio", { state: { login, isAuthenticatedUser: true } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary_color font-roboto text-primary_text">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center">
          Digite o nome do usuário que deseja buscar
        </h1>

        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 border-2 border-primary_text rounded-xl px-4 py-2 mx-3"
            placeholder="Digite o nome do usuário"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className={`py-2 px-5 rounded-xl border-2 border-primary_text hover:bg-tertiary_color ${
              searchTerm ? "bg-secondary_color" : "bg-tertiary_text cursor-not-allowed"
            }`}
            disabled={!searchTerm}
          >
            <FaArrowRight className="text-white text-2xl" />
          </button>
        </div>

        {searchResults.length > 0 && (
          <ul className="mt-4 border border-gray-300 rounded-lg p-2">
            {searchResults.map((user, index) => (
              <li
                key={index}
                className="py-1 px-2 cursor-pointer flex text-option"
                onClick={() => handleUserClick(user.login)} 
              >
                <IoPersonSharp className="mt-1 mr-3" />
                {user.name} 
              </li>
            ))}
          </ul>
        )}
        
        {userExists === false && (
          <p className="flex text-red-500 mt-2 text-red">
            <IoIosWarning className="text-xl mr-2" /> O nome que você digitou
            não existe ou não está cadastrado!
          </p>
        )}

        <div className="flex items-center justify-center w-full my-8 relative">
          <hr className="w-full h-px border-secondary_color border-2" />
          <span className="absolute px-2 font-semibold bg-primary_color -translate-x-1/2 left-1/2">
            ou
          </span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <span className="font-bold">Acesse sua conta com</span>
          <button
            onClick={githubSignUp}
            className="px-5 py-2 border rounded-3xl bg-dark_green text-primary_color font-semibold hover:bg-tertiary_color flex items-center justify-center"
          >
            <TbBrandGithubFilled className="mr-2 text-xl" /> GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
