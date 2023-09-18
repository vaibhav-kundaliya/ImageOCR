import axios from "axios";

const SendGetRequest = async (url) => {
   try {
      const response = await axios.get(url, {
         withCredentials: true,
      });
      return response;
   } catch (error) {
      if (error.response) {
         console.error("Error response:", error.response);
         throw error.response;
      } else {
         throw error;
      }
   }
};

export default SendGetRequest;
