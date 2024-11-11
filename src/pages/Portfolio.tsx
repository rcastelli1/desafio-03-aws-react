import { useLocation } from "react-router-dom";
import { useState } from "react";

const Portfolio = () => {
  const location = useLocation();
  const { login, isAuthenticatedUser } = location.state || {};

  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    name: localStorage.getItem("name") || "Fulano",
    linkedin: localStorage.getItem("linkedin") || "",
    bio: localStorage.getItem("bio") || "",
    email: localStorage.getItem("email") || "",
  });
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);
  const [modalMode, setModalMode] = useState("edit"); 

  return (
    <div></div>
  );
};

export default Portfolio;
