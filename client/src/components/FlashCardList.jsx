import React, { useState } from 'react';
import Flashcard from './FlashCard';
import './styles/FlashCardList.scss';

const FlashcardList = ({ flashcards ,role,showForm,setEditForm,setindex,setAnswer,setQuestion}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((currentIndex + 1) % flashcards?.length);
    setindex(currentIndex);
    setAnswer(flashcards[currentIndex+1]?.answer || '');
    setQuestion(flashcards[currentIndex+1]?.question || '');
  };
  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((currentIndex - 1 + flashcards?.length) % flashcards?.length);
    setindex(currentIndex);
    setAnswer(flashcards[currentIndex-1]?.answer || '');
    setQuestion(flashcards[currentIndex-1]?.question || '');
  };
  
  return (
    <div className="flashcard-list">
      <div className="flashcard-navigation">
        <button className="arrow-button" onClick={prevCard}>&lt;</button>
        <div className="flashcard-container">
          <Flashcard 
            question={flashcards[currentIndex]?.question || ''}
            answer={flashcards[currentIndex]?.answer || ''}
            id={flashcards[currentIndex]?._id}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
            role={role}
            setShowForm={setEditForm}
          />
        </div>
        <button className="arrow-button" onClick={nextCard}>&gt;</button>
      </div>
    </div>
  );
};

export default FlashcardList;
