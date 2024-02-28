import axios from "axios";

const SendPostRequest = async (url, body) => {
   console.log("inpost request",process.env.REACT_APP_BACKEND_URL+url)
   try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+url, body, {
         withCredentials: true,
      });
      console.log(response)
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
