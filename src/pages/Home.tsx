import { useNavigate } from "react-router-dom";

import { app } from "../fireBase.config";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const Home: React.FC = () => {
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
  
  return (
    <div>
      
    </div>
  );
};

export default Home;