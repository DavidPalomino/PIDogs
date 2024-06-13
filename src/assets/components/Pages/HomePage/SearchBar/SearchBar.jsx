import { useState } from 'react';
import style from './SearchBar.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Para React Router v6

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    const goToForm = () => {
        navigate('/create-dog'); 
      };
    

    return (
        <form className={style.SearchBar} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Buscar razas..."
                value={searchTerm}
                onChange={handleInputChange}
                className={style.SearchInput}
            />
            <button className={style.SearchButton} onClick={goToForm}>Create a Dog</button>
        </form>
    );
};

export default SearchBar;
