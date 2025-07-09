import axios from 'axios';

const API = axios.create({
  baseURL:'https://wisdom-generator.onrender.com/'
});

// 👇 This is your wrapper for /generate-wisdom/
export const getWisdom = async (question, tone) => {
  const response = await API.post('/generate-wisdom/', {
    question,
    tone,
  });
  return response.data.response; // Make sure your backend returns { "response": "..." }
};

export const getToneOptions = async () => {
  const response = await API.get('/tone-options/');
  return response.data;
};

export const analyzeEmotion = async (message) => {
  const response = await API.post('/analyze-emotion/', { message });
  return response.data;
};


export default API;
