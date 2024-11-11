import { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
}

const Modal = ({ isOpen, onClose, onSave }: ModalProps) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setUrl(savedUrl);
    }
  }, []);

  const handleSave = () => {
    if (url) {
      localStorage.setItem("savedUrl", url);
      onSave(url);
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return <div></div>;
};

export default Modal;
