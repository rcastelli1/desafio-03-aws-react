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
          {isEditMode ? (
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
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-dark_green text-second_text font-semibold py-2 px-12 rounded-xl border-r-4 border-b-4 border-tertiary_color hover:bg-tertiary_color">
                LinkedIn
              </button>
            </a>
          ) : null}

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
      <section ref={experienceRef} className="bg-secondary_color">
        <h1 className="text-second_text font-bold text-4xl text-center py-10">
          Experiências
        </h1>
        <div className="grid grid-cols-2 gap-6 max-w-screen-md mx-auto">
          {cards.length === 0 ? (
            <p>Não há nada por aqui!</p>
          ) : (
            cards.map((card, index) => (
              <div
                key={index}
                className="relative bg-card_color p-6 text-second_text font-bold rounded-xl border-r-4 border-b-4 border-tertiary_color h-96 mb-12 overflow-auto"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h3 className="text-2xl pb-4">{card.title}</h3>
                <p className="text-tertiary_text pb-4">{card.period}</p>
                {card.skills.split(",").map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-dark_green text-xs mr-3 mb-4 p-2 rounded-lg"
                  >
                    {skill.trim()}
                  </span>
                ))}
                <p className="pt-5">{card.description}</p>
                {card.repositoryLink && (
                  <a
                    href={card.repositoryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-dark_green text-second_text font-semibold flex justify-center py-2 mt-4 mx-2 rounded-xl hover:bg-tertiary_color"
                  >
                    Repositório
                  </a>
                )}

                {hoveredIndex === index && isEditMode && (
                  <div className="flex flex-col absolute inset-0 items-center text-tertiary_color h-full z-10">
                    <button
                      onClick={() => openEditModal(card)}
                      className="bg-edit_bg p-2 w-full h-full flex justify-center items-center"
                    >
                      <PiPencilSimpleLineFill size={70} />
                    </button>
                    <button
                      onClick={() => handleRemoveCard(card.title)}
                      className="bg-remove_bg p-2 w-full h-full flex justify-center items-center"
                    >
                      <TbTrashFilled size={70} />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}

          {isEditMode && (
            <button
              onClick={() => {
                setIsModalOpen(true);
                setEditCard(null);
                setModalMode("add");
              }}
              className="flex flex-col justify-center items-center space-y-4 bg-card_color p-6 text-second_text font-bold rounded-xl border-r-4 border-b-4 hover:text-tertiary_color border-tertiary_color w-96 h-96 mb-12 overflow-auto"
            >
              <FiPlusCircle className="text-7xl" />
              <p className="hover:text-tertiary_color text-2xl">
                Adicionar card
              </p>
            </button>
          )}
          {isModalOpen && modalMode !== "editSocialMedia" && (
            <CreateCard
              modalMode={editCard ? "edit" : "add"}
              cardToEdit={editCard}
              onSave={modalMode === "add" ? handleSaveCard : handleEditCard}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </section>
      {(formValues.email || isEditMode) && (
        <section
          ref={contactRef}
          className="flex flex-col items-center bg-dark_green text-second_text font-bold p-20"
        >
          <h3 className="text-3xl">
            Sinta-se livre para me contatar a qualquer momento!
          </h3>
          {isEditMode ? (
            <input
              type="text"
              placeholder="Adicione um email adicional"
              value={formValues.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-transparent border-b-2 border-tertiary_text focus:border-b-2 focus:border-tertiary_text text-center font-bold outline-none min-w-[500px] mt-12 p-1 placeholder:text-tertiary_text text-4xl"
            />
          ) : (
            <h1 className="text-4xl mt-8">
              {formValues.email || "Email não fornecido"}
            </h1>
          )}
        </section>
      )}

      <h2 className="text-dark_green text-center text-4xl font-bold my-28">
        Assim que possível, me envie um email para que possamos trabalhar
        felizes juntos!
      </h2>

      <Footer />
    </div>
  );
};

export default Portfolio;
