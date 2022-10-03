import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Search from '../components/Search/Search';
import ImageGallery from '../components/ImageGallery/ImageGallery';

export default function App() {
  const [searchName, setSearchName] = useState('');
 
  const handleSubmitSearchForm = searchName => {
    setSearchName(searchName);

  }

    return (
      <div className="App">
        <Search onSubmit={handleSubmitSearchForm} />
        <ImageGallery searchName={searchName} />
        <ToastContainer autoClose={4000} />
      </div>
  );
  }

