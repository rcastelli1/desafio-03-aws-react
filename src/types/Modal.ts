import { Card } from "./Portfolio";

export interface ModalProps {
    modalMode: string;  
    cardToEdit: Card | null; 
    onSave: (card: Card) => void;
    onClose: () => void;
  }