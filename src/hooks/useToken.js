
const useToken = () => {

    const getToken = async () => {
        return await localStorage.getItem('juegpBichoToken')
    }

    const setToken = async (token) => {
        await localStorage.setItem('juegpBichoToken', token)
    }

    const getCurrentUser = async() => {
        const user=  await  JSON.parse(localStorage.getItem('juegpBicho.user'))
        return user
    }

    return { getToken, setToken, getCurrentUser } 

}

export { useToken }