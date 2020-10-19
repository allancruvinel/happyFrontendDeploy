import axios from 'axios'

const api = axios.create({
    baseURL: 'https://happy-deploy-allancruvinel.herokuapp.com',
})

export default api;