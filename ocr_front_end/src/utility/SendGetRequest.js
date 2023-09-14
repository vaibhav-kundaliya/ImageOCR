import axios from "axios"

const SendGetRequest = async (url) => {
        const response = await axios.get(url, { withCredentials: true })
        return response
   
}

export default SendGetRequest