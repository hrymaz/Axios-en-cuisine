const API = axios.create({
    baseURL: "https://dummyjson.com/",
    timeout: 5000
});

window.API = API;