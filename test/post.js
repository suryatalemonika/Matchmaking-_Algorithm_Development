const axios = require("axios");

const userId = "user1"; 

axios
  .post(`http://localhost:3000/api/v1/match/${userId}`)
  .then((response) => {
    console.log("Generated Matches:");
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error generating matches:", error.response?.data || error.message);
  });

