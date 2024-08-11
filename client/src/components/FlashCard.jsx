import React from 'react';
import './styles/FlashCard.scss';
import axios from 'axios';
import { API_URL } from '../utils/api';
import { toast } from 'react-toastify';

const Flashcard = ({ question, answer, isFlipped, setIsFlipped, role, showForm, setShowForm,id }) => {
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = () => {
      try{
        axios.delete(`${API_URL}/quiz/${id}`)
        .then(() => {
          toast.success('Flashcard deleted successfully');
          setTimeout(() => {
            window.location.reload();
            toast.dismiss();
          }, 2000);
        })
      }
      catch(error){
        toast.error('Failed to delete flashcard');
      }
  };

  return (
    <div className={`plus-flashcard ${isFlipped ? 'flipped' : ''}`}>
      <div className="plus-flashcard__side plus-flashcard__side--front">
        <div className="plus-flashcard__content">
          <h4 className="plus-flashcard__heading">{question}</h4>
          {role === 'admin' && (
            <>
              <button className="edit-button" onClick={() => setShowForm(true)}>Edit</button>
              <button className="delete-button" onClick={handleDelete}>Delete</button>
            </>
          )}
          {!isFlipped && (
            <button className="flip-button" onClick={handleFlip}>Show Answer</button>
          )}
        </div>
      </div>
      <div className="plus-flashcard__side plus-flashcard__side--back">
        <div className="plus-flashcard__content">
          <p>{answer}</p>
          {isFlipped && (
            <button className="flip-button" onClick={handleFlip}>Show Question</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
