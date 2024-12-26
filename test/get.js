const axios = require("axios");

const testCompatibility = async () => {
  const baseURL = 'http://localhost:3000/api/v1/compatibility';
  const userId1 = 'user1'; 
  const userId2 = 'user3'; 

  try {
    const response = await axios.get(`${baseURL}/${userId1}/${userId2}`);
    console.log('Compatibility Score:', response.data);
  } catch (error) {
    console.error('Error occurred:', error.response ? error.response.data : error.message);
  }
};

testCompatibility();
