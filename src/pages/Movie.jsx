import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsPlayCircle } from "react-icons/bs";
import TrailerModal from '../components/TrailerModal.jsx'; // Importe o componente do modal
import "../styles/Movie.css";
import img_icon from "../assets/film_lib_icon.png";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
    setLoading(false); // Dados carregados, mudar o estado para false
  };

  const getTrailer = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
    if (trailer) setTrailerKey(trailer.key);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}&language=pt-BR`;
    getMovie(movieUrl);
    getTrailer(`${moviesURL}${id}/videos?${apiKey}`);
  }, [id]);

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']");
    if (link) {
      link.href = {img_icon}; // Substitua pelo caminho correto
    }
  }, []);

  // Funções para abrir e fechar o modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Componente de carregamento
  const LoadingSpinner = () => (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );

  return (
    loading ? (
      <LoadingSpinner />
    ) : (
      movie && (
        <div className="movie-container">
          <div className="movie-main">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-details">
              <h1>{movie.title} <span>({new Date(movie.release_date).getFullYear()})</span></h1>
              <p className="movie-subtitle">
                {movie.adult ? "18+" : "Livre"} • {movie.genres.map(g => g.name).join(", ")} • {movie.runtime} min
              </p>

              <div className="movie-actions">
                <div className="vote-circle">
                  <svg width="50" height="50">
                    <circle cx="25" cy="25" r="22" stroke="#3a3a5e" strokeWidth="4" fill="none" />
                    <circle
                      cx="25"
                      cy="25"
                      r="22"
                      stroke={movie.vote_average >= 7 ? "#76c7c0" : movie.vote_average >= 5 ? "#FFD700" : "#FF6347"}
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${Math.round(movie.vote_average * 10 * 1.38)}, 138`}
                      strokeDashoffset="0"
                    />
                  </svg>
                  <span>{Math.round(movie.vote_average * 10)}%</span>
                </div>

                {trailerKey && (
                  <button onClick={openModal} className="trailer-button">
                    <BsPlayCircle /> Ver Trailer
                  </button>
                )}
              </div>

              {/* 📌 Sinopse logo abaixo do vote-circle e trailer */}
              <div className="movie-synopsis">
                <h2>Sinopse</h2>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>

          {/* 📌 Container de informações adicionais */}
          <div className="movie-info">
            <h2>Informações Adicionais</h2>
            <div className="crew-info">
              <div>
                <h3>Diretor</h3>
                <p>{movie.credits?.crew.find(p => p.job === "Director")?.name || "Desconhecido"}</p>
              </div>
              <div>
                <h3>Roteirista</h3>
                <p>{movie.credits?.crew.find(p => p.job === "Writer")?.name || "Desconhecido"}</p>
              </div>
            </div>
            <div className="extra-info">
              <div>
                <h3><BsWallet2 /> Orçamento:</h3>
                <p>{formatCurrency(movie.budget)}</p>
              </div>
              <div>
                <h3><BsGraphUp /> Receita:</h3>
                <p>{formatCurrency(movie.revenue)}</p>
              </div>
              <div>
                <h3><BsHourglassSplit /> Duração:</h3>
                <p>{movie.runtime} minutos</p>
              </div>
            </div>
          </div>

          {/* Exibir Modal quando necessário */}
          {isModalOpen && <TrailerModal trailerKey={trailerKey} closeModal={closeModal} />}
        </div>
      )
    )
  );
};

export default Movie;
