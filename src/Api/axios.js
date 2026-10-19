import axios from "axios";
const axiosInstance=axios.create({
    // local host url
    // baseURL:"http://127.0.0.1:5001/clone-5461e/us-central1/api"
    // deployed version of amazon server on render.com
    baseURL:"https://amazon-api-deploy-hzja.onrender.com/"
})
export {axiosInstance}