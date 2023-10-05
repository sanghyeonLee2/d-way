import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const accessToken = localStorage.getItem("access-token")
const instance = axios.create({
    baseURL: API_KEY,
    headers: {
        //"Cache-Control" : "no-cache", //서버 및 중간 캐시에 응답 결과를 캐시 X
        "Content-Type": "application/json", //HTTP 요청 또는 응답에서 JSON 형식으로 전송
        Authorization: `Bearer ${accessToken}`
    }
})
export default instance
