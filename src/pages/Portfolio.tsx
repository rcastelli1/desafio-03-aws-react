import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";

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
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState<string>(
    localStorage.getItem("savedUrl") || ""
  );
  const startRef = useRef(null);
  const myHistoryRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div></div>
  );
};

export default Portfolio;
