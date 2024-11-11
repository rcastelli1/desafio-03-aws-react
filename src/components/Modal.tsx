import { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
}

const Modal = ({ isOpen, onClose, onSave }: ModalProps) => {
  const [url, setUrl] = useState<string>('');

 
  useEffect(() => {
    const savedUrl = localStorage.getItem('savedUrl');
    if (savedUrl) {
      setUrl(savedUrl); 
    }
  }, []);

  const handleSave = () => {
    if (url) {
      localStorage.setItem('savedUrl', url); 
      onSave(url); 
      onClose()
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };

  return (
    isOpen && (
      <div onClick={handleOverlayClick} className="fixed inset-0 flex justify-center items-center bg-modal_bg opacity-80 font-roboto z-50">
        <div className="flex flex-col bg-second_text px-8 py-6 rounded-xl w-full max-w-lg">
          <h2 className="text-start font-extrabold text-2xl py-4">Adicionar Link</h2>
          <input
            type="url"
            placeholder="Digite a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)} 
            className="mb-6 p-2 border border-black rounded w-full"
          />
          <div className="flex flex-row mb-6">
            <button
              className="font-semibold rounded-md border-black border-2 w-full mr-3 hover:bg-red hover:text-second_text"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className={`bg-save_color text-second_text rounded-md w-full ${url ? 'hover:bg-tertiary_color' : 'opacity-50 cursor-not-allowed'}`}
              onClick={handleSave} 
              disabled={!url} 
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    )
  )
};

export default Modal;
