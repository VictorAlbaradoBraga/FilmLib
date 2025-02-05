import { useState, useEffect } from "react"; 
import MovieCard from "../components/MovieCard";

// URL da API
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carregamento

    const getTopRatedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setTopMovies(data.results);
        setLoading(false); // Dados carregados, mudar o estado para false
    };

    useEffect(() => {
        const topRatedUrl = `${moviesURL}top_rated?${apiKey}&language=pt-BR`;

        getTopRatedMovies(topRatedUrl);

    }, []);

    // Componente de carregamento (spinner)
    const LoadingSpinner = () => (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Carregando...</p>
        </div>
    );

    return (
        <div className="container">
            <h2>Filmes Populares</h2>
            <div className="movies-container">
                {loading ? (
                    <LoadingSpinner /> // Exibe o spinner enquanto os dados estão carregando
                ) : (
                    topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                )}
            </div>
        </div>
    );
};

export default Home;
