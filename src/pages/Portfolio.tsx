import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import axios from "axios";

import { FiPlusCircle } from "react-icons/fi";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { TbTrashFilled } from "react-icons/tb";

import Loading from "../assets/loading.gif";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import CardModal from "../components/CardModal";
import CreateCard from "../components/CreateCard";

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
    const updatedCards = cards.map((card) =>
      card.title === editCard.title ? editedCard : card
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
    <div className="font-roboto">
      <Header
        isAuthenticatedUser={isAuthenticatedUser || false}
        isEditMode={isEditMode}
        toggleEditMode={toggleEditMode}
        scrollToInicio={() => scrollToSection(inicioRef)}
        scrollToHistoria={() => scrollToSection(minhaHistoriaRef)}
        scrollToExperiencias={() => scrollToSection(experienciasRef)}
        scrollToContato={() => scrollToSection(contatoRef)}
      />

      <section
        ref={startRef}
        className="flex flex-row justify-between px-36 pt-44"
      >
        <div className="flex flex-col items-center">
          <img
            src={userData.avatar_url}
            alt="Foto de perfil"
            className="rounded-full w-60"
          />
          <h1 className="font-bold text-5xl my-1">
            {userData.name || "Usuário GitHub"}
          </h1>
          <p className="font-semibold mb-2">{userData.location || ""}</p>
          <p className="font-semibold">{userData.email || ""}</p>
        </div>
        <div>
          <h1 className="text-5xl font-bold">
            Hello, <br />
            I'm{" "}
            {isEditMode ? (
              <input
                type="text"
                value={formValues.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="hover:border-b-2 border-black border-b-2 focus:border-black p-1 text-tertiary_color text-5xl font-bold outline-none w-72"
              />
            ) : (
              <span className="text-tertiary_color">{formValues.name}</span>
            )}
          </h1>
          <p className="my-5 font-semibold max-w-sm">{userData.bio || ""}</p>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-dark_green text-second_text font-semibold mr-4 py-2 px-8 rounded-xl border-r-4 border-b-4 border-tertiary_color hover:bg-tertiary_color"
          >
            GitHub
          </a>
          {
            isEditMode ? (
              <button
                className="bg-dark_green text-second_text font-semibold py-2 px-12 rounded-xl border-r-4 border-b-4 border-tertiary_color hover:bg-tertiary_color"
                onClick={() => {
                  setIsModalOpen(true);
                  setModalMode("editSocialMedia"); 
                }}
              >
                LinkedIn
              </button>
            ) : linkUrl ? (
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer" 
              >
                <button className="bg-dark_green text-second_text font-semibold py-2 px-12 rounded-xl border-r-4 border-b-4 border-tertiary_color hover:bg-tertiary_color">
                  LinkedIn
                </button>
              </a>
            ) : null 
          }

          {isModalOpen && modalMode === "editSocialMedia" && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleModalSave} 
            />
          )}
        </div>
      </section>
      <section
        ref={myHistoryRef}
        className="bg-card_color text-second_text px-14 py-12 mx-16 my-20 rounded-xl"
      >
        <h1 className="font-bold text-5xl mb-8">Minha História</h1>
        {isEditMode ? (
          <textarea
            value={formValues.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            placeholder="Adicione sua história:"
            className="resize-none w-full border-0 focus:outline-none placeholder:text-tertiary_text bg-transparent"
          />
        ) : (
          <p className="font-semibold">
            {formValues.bio || "Não há nenhuma história pra contar!"}
          </p>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Portfolio;
