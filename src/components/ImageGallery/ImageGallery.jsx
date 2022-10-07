import { useState, useEffect, useRef } from 'react';
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

    const prevPage = usePrevious(page);
    const prevSearchName = usePrevious(searchName);
    console.log(prevPage);
    console.log(prevSearchName);
    console.log(page);
    console.log(searchName);
    
    useEffect(() => {

        const fetchImages = async (currentName, currentPage) => {
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
                    setImages(prev => [...prev, ...items]);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (!searchName) {
            setImages([]);
            return;
        }       
        if (page > prevPage) {
            console.log('loadmore');
            fetchImages(searchName, page);
            return;
        }
        if ((prevSearchName !== searchName) && page === prevPage) {
            fetchImages(searchName, 1);
            resetPage();
            return;
        }
        
    }, [searchName, page, prevPage, prevSearchName]);

   
    const resetPage = () => {
        setPage(1);
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
        console.log("load more worked");
        setPage((prev) => prev + 1);
    }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
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

