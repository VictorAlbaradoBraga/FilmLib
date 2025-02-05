import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../styles/MovieCard.css";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
    const [searchParams] = useSearchParams();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const query = searchParams.get("q");

    const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
    
        // Filtra os filmes que têm pelo menos uma imagem, título, data de lançamento e sinopse válida
        const filteredMoviesSearch = data.results.filter(movie =>
            movie.poster_path && movie.title && movie.release_date && movie.overview
        );
    
        // Ordena os filmes por popularidade (do mais popular para o menos popular)
        const sortedMovies = filteredMoviesSearch.sort((a, b) => {
            return b.vote_average - a.vote_average;
        });
        setMovies(sortedMovies);
        setLoading(false); // Dados carregados, mudar o estado para false
    };

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
        getSearchedMovies(searchWithQueryURL);
    }, [query]);

    // Componente de carregamento (spinner)
    const LoadingSpinner = () => (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Carregando...</p>
        </div>
    );

    return (
        <div className="container">
            <h2 className="title">
                Resultados para: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container">
                {loading ? (
                    <LoadingSpinner /> // Exibe o spinner enquanto os dados estão carregando
                ) : (
                    movies.length === 0 ? (
                        <p>Nenhum filme encontrado.</p>
                    ) : (
                        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                    )
                )}
            </div>
        </div>
    );
};

export default Search;
