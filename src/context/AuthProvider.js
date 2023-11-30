import { createContext, useContext, useEffect, useState } from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`

const AuthContext = createContext({})

// we need to create a provider fun
export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: "false", msg: "" });
    const [query, setQuery] = useState("titanic")

    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if (data.Response === "True") {
                setIsLoading(false);
                setIsError({
                    show: false,
                    msg: "",
                })
                setMovie(data.Search);
            } else {
                setIsError({
                    show: true,
                    msg: data.Error,
                })

            }
        } catch (error) {

        }
    }
    useEffect(() => {
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 1000)

        return () => clearTimeout(timerOut)

    }, [query])

    const [auth, setAuth] = useState({ name: "Jor" })

    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoading, isError, movie, query, setQuery }}>
            {children}
        </AuthContext.Provider>
    )
}

// global custom hooks
export const useGlobalContext = () => {
    return (
        useContext(AuthContext)
    )
}

export default AuthContext