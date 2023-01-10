import axios from "./axios";

const login = credentials => {
    return axios.post('/users/login', {user: credentials})
}
const register = credentials => {
    return axios.post('/users', {user: credentials})
}

const getCurrentUser = () => {
    return axios.get('/user')
}

const updateCurrentUser = currentUserInput => {
    return axios
        .put('/user', {user: currentUserInput})
        .then(response => response.data.user)
}

export default {
    register,
    login,
    getCurrentUser,
    updateCurrentUser
}
