import './ImageList.css';
import ImageGaleryItem from '../ImageGalleryItem/ImageGalleryItem';


export default function ImageList({ items, onClick }) {
    return (
        <ul className="gallery">
            {items.map(item => (
                <ImageGaleryItem key={item.id}
                    imageURL={item.webformatURL}
                    imageTitle={item.tags}
                    imageUrlLarge={item.largeImageURL}
                    onClickItem={onClick}
                />
            ))}
                </ul>
    )
}



