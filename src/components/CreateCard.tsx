import { useState, useEffect } from 'react';

const CreateCard = ({ modalMode, cardToEdit, onSave, onClose }) => {
  const [formValues, setFormValues] = useState({
    title: '',
    period: '',
    skills: '',
    description: '',
    repositoryLink: '',
  });

  useEffect(() => {
    if (modalMode === 'edit' && cardToEdit) {
      setFormValues({
        title: cardToEdit.title,
        period: cardToEdit.period,
        skills: cardToEdit.skills,
        description: cardToEdit.description,
        repositoryLink: cardToEdit.repositoryLink,
      });
    }
  }, [modalMode, cardToEdit]);

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // Fecha o modal se o clique for na sobreposição
    }
  };

  const isFormValid = formValues.title && formValues.period && formValues.skills && formValues.description;

  const handleSave = () => {
    if (isFormValid) {
      onSave(formValues);
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
      <h2 className="text-start font-extrabold text-2xl py-4">
          {modalMode === 'add' ? 'Criação de Card' : 'Edição de Card'}
        </h2>
        <input
          placeholder="Título"
          value={formValues.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="mb-6 p-2 border border-black rounded w-full"
        />
        <input
          placeholder="Período de atuação"
          value={formValues.period}
          onChange={(e) => handleInputChange('period', e.target.value)}
          className="mb-6 p-2 border border-black rounded w-full"
        />
        <input
          placeholder="Habilidades (Separe-as por vírgula)"
          value={formValues.skills}
          onChange={(e) => handleInputChange('skills', e.target.value)}
          className="mb-6 p-2 border border-black rounded w-full"
        />
        <textarea
          placeholder="Descreva a experiência"
          value={formValues.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="mb-6 p-2 pb-32 border border-black rounded w-full"
        />
        <input
          placeholder="Link do repositório (Opcional)"
          value={formValues.repositoryLink}
          onChange={(e) => handleInputChange('repositoryLink', e.target.value)}
          className="mb-6 p-2 border border-black rounded w-full"
        />

        <div className="flex flex-row mb-6">
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`bg-save_color text-second_text rounded-md w-full mr-6 ${isFormValid ? 'hover:bg-tertiary_color' : 'opacity-50 cursor-not-allowed'}`}
          >
            Salvar
          </button>

          <button
            onClick={onClose}
            className="font-semibold rounded-md border-black border-2 w-full hover:bg-red hover:text-second_text"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
