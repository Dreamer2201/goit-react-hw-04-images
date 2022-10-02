import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ImageList from '../shared/ImageList/ImageList';
import fetchRequest from 'Fetch/FetchApi';
import { Dna } from  'react-loader-spinner'
import Modal from '../shared/Modal/Modal';
import Button from '../shared/Button/Button';

export default function ImageGallery({ searchName }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [urlLarge, setUrlLarge] = useState('');
    const [title, setTitle] = useState('');
    
    useEffect(() => {
        if (!searchName) {
            return;
        } 
        fetchImages(searchName, 1);
        setPage(1);
    }, [searchName]);

    useEffect(() => {
        fetchImages(searchName, page);
    }, [page]);
    
    async function fetchImages(currentName, currentPage) {
        setLoading(true);
        try {
            const result = await fetchRequest(currentName, currentPage);
            const items = result.hits;
            if (items.length === 0) {
                return toast.warn("Any images not found! Try again, please.");
            }
            if (currentPage === 1) {
                setImages([...items]);
            } else {
                setImages([...images, ...items]);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const openModal = (urlLarge, title) => {
        setShowModal(true);
        setUrlLarge(urlLarge);
        setTitle(title);
    }
    const closeModal = () => {
        setShowModal(false);
        setUrlLarge('');
        setTitle('');
    }
    const loadMore = () => {
        setPage(page + 1);
    }

    const isImages = Boolean(images.length);
        return (
            <div>              
                {error && <p className="notification">Try later, please.</p>}
                {images && <ImageList items={images} onClick={openModal} />}    
                {isImages && <Button text="Load more..." onClick={loadMore} />}
                {loading && <Dna
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper" />}
                {showModal && <Modal onClose={closeModal} urlModalImg={urlLarge} dscModalImg={title} />}
            </div>
        )
    }
