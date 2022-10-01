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
    
    async function fetchImages(currentName, currentPage) {
        setLoading(true);
        try {
            const result = await fetchRequest(currentName, currentPage);
            const items = result.hits;
            if (items.length === 0) {
                return toast.warn("Any images not found! Try again, please.");
            }
            if (currentPage === 1) {
                setImages(() => {
                    return {
                        images: [...items]
                    }
                });
            } else {
                setImages(({ images }) => {
                    return {
                        images: [...images, ...items]
                    }
                });
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { page } = this.state;
        const { searchName } = this.props;     
        if (page > prevState.page) {
            this.fetchImages(searchName, page);
            return;
        }
        if ((prevProps.searchName !== searchName) && page === prevState.page) {
            this.fetchImages(searchName, 1);
            this.setState({
                page: 1,
            })
            return;
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
        setPage(() => {
            return {
                page: page + 1
            }
        });
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
                {showModal && <Modal onClose={closeModal} content={urlLarge, title} />}
            </div>
        )
    }
