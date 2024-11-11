import { useState, useEffect } from 'react';

const CreateCard = () => {

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


  return (
    <div>
      
    </div>
  );
};

export default CreateCard;
