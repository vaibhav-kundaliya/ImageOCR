import axios from "axios";

const SendGetRequest = async (url) => {
   try {
      const response = await axios.get(process.env.REACT_APP_BACKEND_URL+url, {
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

export default SendGetRequest;
