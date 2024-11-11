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

  const handleModalSave = (url: string) => {
    setLinkUrl(url);
  };

  const handleSaveCard = (newCard) => {
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setIsModalOpen(false);
  };

  const handleEditCard = (editedCard) => {
    const updatedCards = cards.map(
      (card) => (card.title === editCard.title ? editedCard : card) 
    );
    setCards(updatedCards); 
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setIsModalOpen(false); 
    setEditCard(null); 
  };

  const handleRemoveCard = (cardTitle) => {
    const updatedCards = cards.filter((card) => card.title !== cardTitle);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards)); // Atualiza no localStorage
  };

  const openEditModal = (card) => {
    setEditCard(card); // Define o card atual a ser editado
    setModalMode("edit"); // Define o modo como edição
    setIsModalOpen(true); // Abre o modal de edição
  };

  const toggleEditMode = () => {
    if (isEditMode) saveChanges();
    setIsEditMode((prevMode) => !prevMode);
  };

  return (
    <div></div>
  );
};

export default Portfolio;
