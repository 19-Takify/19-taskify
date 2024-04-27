import axios from '@/apis/axios';
import React from 'react';
import { useEffect } from 'react';

function Card() {
  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axios.get('/cards?size=10&columnId=22433');
        console.log(response.data);
      } catch (error) {}
    };
    const getCardContent = async () => {
      try {
        const response = await axios.get('/cards/5583');
        console.log(response.data);
      } catch (error) {}
    };
    const getMembers = async () => {
      try {
        const response = await axios.get('/members?dashboardId=6679');
        console.log(response.data);
      } catch (error) {}
    };
    getCards();
    getCardContent();
    getMembers();
  }, []);
  return <div>fkfk</div>;
}

export default Card;
