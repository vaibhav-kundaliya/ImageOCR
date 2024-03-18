import axios from "axios";

const SendPostRequest = async (url, body) => {
   try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+url, body, {
         withCredentials: true,
      });
      return response;
   } catch (error) {
      if (error.response) {
         throw error.response;
      } else {
         throw error;
      }
   }
};

export default SendPostRequest;
