const useToken = () => {

    // Función para verificar si un token JWT ha expirado
    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return true; // No es un JWT válido

            // Decodifica la parte del "payload" (Base64)
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            
            if (!payload.exp) return false; // Si no tiene fecha de expiración, no expira localmente

            const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
            return payload.exp < currentTime; // Devuelve true si ya expiró
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return true; // Si falla la decodificación, asumimos que no es válido/expiró
        }
    }

    const getToken = async () => {
        const token = await localStorage.getItem('juegpBichoToken');
        // Si existe pero está expirado, lo limpiamos automáticamente
        if (token && isTokenExpired(token)) {
            await clearStorage();
            return null;
        }
        return token;
    }

    const setToken = async (token) => {
        await localStorage.setItem('juegpBichoToken', token)
    }

    const getCurrentUser = async() => {
        const user = await JSON.parse(localStorage.getItem('juegpBicho.user'))
        return user
    }

    // Nueva función para limpiar el localStorage en caso de expiración o logout
    const clearStorage = async () => {
        await localStorage.removeItem('juegpBichoToken');
        await localStorage.removeItem('juegpBicho.user');
        // Opcional: puedes limpiar más datos guardados en caché si lo deseas
        await localStorage.removeItem('usuarios');
        await localStorage.removeItem('bets');
        await localStorage.removeItem('grupos');
    }

    return { getToken, setToken, getCurrentUser, clearStorage, isTokenExpired } 
}

export { useToken }