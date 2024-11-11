import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

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

  const saveChanges = () => {
    localStorage.setItem("name", formValues.name);
    localStorage.setItem("linkedin", formValues.linkedin);
    localStorage.setItem("bio", formValues.bio);
    localStorage.setItem("email", formValues.email);
  };

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(savedCards);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!login) return;
      try {
        const response = await axios.get(
          `https://api.github.com/users/${login}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do GitHub:", error);
      }
    };
    fetchUserData();
  }, [login]);

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  if (!userData)
    return (
      <img
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src={Loading}
        alt=""
      />
    );

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div></div>
  );
};

export default Portfolio;
