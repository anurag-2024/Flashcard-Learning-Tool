import React, { useEffect, useState } from 'react';
import FlashcardList from '../components/FlashCardList';
import Header from '../components/Header';
import './styles/Home.scss'; 
import axios from 'axios';  
import { API_URL } from '../utils/api';
import {jwtDecode} from 'jwt-decode';
const Home = () => {

  const [flashcards, setFlashcards] = useState([]);
  const [user, setUser] = useState();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if(localStorage.getItem('token') === null) {
      window.location.href = '/signin'; 
    }
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(`${API_URL}/quiz`);
      setFlashcards(res?.data);
    } catch (err) {
      console.error(err);
    }
  }
  const getUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const id=decoded.id;
      const res = await axios.get(`${API_URL}/user/${id}`);
      setUser(res.data.name);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchFlashcards();
    getUser();
  }, []);
  return (
    <div className="home">
      <Header userType={user} />
      <div className="content">
        <FlashcardList 
        flashcards={flashcards}
        role="user"
        index={index}
        setindex={setIndex}
         />
      </div>

    </div>
  );
};

export default Home;
