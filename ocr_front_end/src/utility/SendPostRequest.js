import axios from "axios";

const SendPostRequest = async (url, body) => {
   try {
      const response = await axios.post(url, body, {
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

export default SendPostRequest;
