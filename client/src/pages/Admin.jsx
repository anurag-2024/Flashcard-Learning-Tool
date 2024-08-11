import React, { useEffect, useState } from 'react';
import FlashcardList from '../components/FlashCardList';
import Header from '../components/Header';
import './styles/Home.scss';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { API_URL } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admin = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const navigate = useNavigate();
 useEffect(() => {
      setQuestion(flashcards[0]?.question || '');
      setAnswer(flashcards[0]?.answer || '');
 }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const user = jwtDecode(token);
      if (user.role !== 'admin') {
        navigate('/');
      }
    } catch (err) {
      console.error('Invalid token:', err);
      navigate('/');
    }
  }, [navigate]);

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(`${API_URL}/quiz`);
      setFlashcards(res.data);
    } catch (err) {
      console.error('Error fetching flashcards:', err);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post(`${API_URL}/quiz`, {
        question: newQuestion,
        answer: newAnswer,
      });
      if(res.status===201){
        toast.success(res.data.message);
      }
      fetchFlashcards();
      setShowForm(false);
      setNewQuestion('');
      setNewAnswer('');
    } catch (err) {
      toast.error('Something went wrong');
      console.error('Error adding flashcard:', err);
    }
  }
  
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.put(`${API_URL}/quiz/${flashcards[index]._id}`, {
        question,
        answer,
      });
      if(res.status===200){
        toast.success(res.data.message);
      }
      fetchFlashcards();
      setEditForm(false);
    } catch (err) {
      toast.error('Something went wrong');
      console.error('Error editing flashcard:', err);
  }
}
  return (
    <div className="home">
      <Header
        userType="Admin"
        showForm={showForm}
        setShowForm={setShowForm}
      />
      <div className="content">
        <FlashcardList
          flashcards={flashcards}
          role="admin"
          setEditForm={setEditForm}
          index={index}
          setindex={setIndex}
          setAnswer={setAnswer}
          setQuestion={setQuestion}
        />
        {showForm && (
          <div className="form-overlay">
            <div className="form-container">
              <h2>Add New FlashCard</h2>
              <form onSubmit={handleAdd}>
                <div className="form-group">
                  <label htmlFor="question">Question:</label>
                  <textarea
                    type="text"
                    id="question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="answer">Answer:</label>
                  <textarea
                    type="text"
                    id="answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">{index !== null ? 'Save' : 'Add'}</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        {editForm && (
          <div className="form-overlay">
            <div className="form-container">
              <h2>Edit FlashCard</h2>
              <form onSubmit={handleEdit}>
                <div className="form-group">
                  <label htmlFor="question">Question:</label>
                  <textarea
                    type="text"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="answer">Answer:</label>
                  <textarea
                    type="text"
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Admin
