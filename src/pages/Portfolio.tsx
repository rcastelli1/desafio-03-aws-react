import { useLocation } from "react-router-dom";

const Portfolio = () => {
  const location = useLocation();
  const { login, isAuthenticatedUser } = location.state || {};
  
  return (
    <div></div>
  );
};

export default Portfolio;
