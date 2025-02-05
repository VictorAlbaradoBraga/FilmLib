import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MovieCard.css";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    const percentage = Math.round(movie.vote_average * 10);

    const getCircleColor = () => {
        if (percentage >= 70) return "#4caf50"; // Verde
        if (percentage >= 50) return "#ffcc00"; // Amarelo
        return "#f44336"; // Vermelho
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            <img src={imageUrl + movie.poster_path} alt={movie.title} />
            
            <div className="movie-info">
                <div className="rating-circle">
                    <svg width="38" height="38">
                        <circle cx="19" cy="19" r="16" stroke="#333" strokeWidth="4" fill="none"/>
                        <circle 
                            cx="19" cy="19" r="16"
                            stroke={getCircleColor()}
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="100"
                            strokeDashoffset={100 - (100 * percentage) / 100}
                        />
                    </svg>
                    <span className="rating-text">{percentage}%</span>
                </div>
                
                <h2>{movie.title}</h2>
            </div>
        </div>
    );
};

export default MovieCard;
