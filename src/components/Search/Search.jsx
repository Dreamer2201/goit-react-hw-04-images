import './Search.css';
import { Component } from 'react';
import { toast } from 'react-toastify';


export default class Search extends Component {
    state = {
        searchName: '',
    };

    hendleChangeInputSearch = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }
    hendleSubmitSearchForm = (e) => {
        e.preventDefault();
        if (this.state.searchName.trim() === '') {
            toast.warn("Enter your request, please!");
        }
        this.props.onSubmit(this.state.searchName);
        this.setState({
            searchName: '',
        })
    }

    render() {
        return (
        <header className="searchbar">
            <form className="form" onSubmit={this.hendleSubmitSearchForm}>                
                <input
                className="input"
                onChange={this.hendleChangeInputSearch}
                name="searchName"
                value={this.state.searchName}
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
    
    
}