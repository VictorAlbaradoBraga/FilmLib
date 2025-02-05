import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import "../styles/Header.css";
import img from "../assets/film_lib_icon.png";


const Header = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!search.trim()) return; // Evita busca vazia

        navigate(`/search?q=${search}`);
        setSearch(""); // Limpa o campo após buscar
    };

    return (
        <header className="header">
            <div className="home">
                <a href="/">
                    <img src={img} alt="Film Lib Icon" className="header-icon" />
                    Film Lib
                </a>
            </div>
            <nav className="nav">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Busque um filme"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit">
                        <BiSearchAlt2 />
                    </button>
                </form>
            </nav>
        </header>
    );
};

export default Header;
