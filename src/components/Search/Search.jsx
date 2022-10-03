import './Search.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Search({ onSubmit }) {
    const [searchName, setSearchName] = useState('');
   
    const hendleChangeInputSearch = (e) => {
        const { value } = e.target;
        setSearchName(value);
    }
    const hendleSubmitSearchForm = (e) => {
        e.preventDefault();
        if (searchName.trim() === '') {
            toast.warn("Enter your request, please!");
        }
        onSubmit(searchName);
         setSearchName('');
    }

        return (
        <header className="searchbar">
            <form className="form" onSubmit={hendleSubmitSearchForm}>                
                <input
                className="input"
                onChange={hendleChangeInputSearch}
                name="searchName"
                value={searchName}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>
            </form>
        </header>)
    }
