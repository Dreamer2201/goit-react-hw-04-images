import { Component } from 'react';
import { toast } from 'react-toastify';
import ImageList from '../shared/ImageList/ImageList';
import fetchRequest from 'Fetch/FetchApi';
import { Dna } from  'react-loader-spinner'
import Modal from '../shared/Modal/Modal';
import Button from '../shared/Button/Button';

export default class ImageGallery extends Component {
    state = {
        images: [],
        loading: false,
        error: '',
        page: 1,
        showModal: false,
        contentModal: {
            urlLarge: '',
            title: '',
        }
    }
    async fetchImages(currentName, currentPage) {
        this.setState({
            loading: true,
        })
        try {
            const result = await fetchRequest(currentName, currentPage);
            const items = result.hits;
            if (items.length === 0) {
                return toast.warn("Any images not found! Try again, please.");
            }
            if (currentPage === 1) {
                this.setState(() => {
                    return {
                        images: [...items]
                    }
                });
            } else {
                this.setState(({ images }) => {
                    return {
                        images: [...images, ...items]
                    }
                });
            }
        } catch (error) {
            this.setState({
                error,
            })
        } finally {
            this.setState({
                loading: false,
            })
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

    openModal = (contentModal) => {
        this.setState({
            showModal: true,
            contentModal,
        });
    }
    closeModal = () => {
        this.setState({
            showModal: false,
            contentModal: {
                urlLarge: '',
                title: '',
            }
        });
    }
    loadMore = () => {
        this.setState(({ page }) => {
            return {
                page: page + 1
            }
        });
    }
    render() {
        const { loading, error, images, showModal } = this.state;
        const isImages = Boolean(images.length);
        return (
            <div>              
                {error && <p className="notification">Try later, please.</p>}
                {images && <ImageList items={this.state.images} onClick={this.openModal} />}    
                {isImages && <Button text="Load more..." onClick={this.loadMore} />}
                {loading && <Dna
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper" />}
                {showModal && <Modal onClose={this.closeModal} content={this.state.contentModal} />}
            </div>
        )
    }

}
