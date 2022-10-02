import './ImageGalleryItem.css';

export default function ImageGaleryItem({ imageURL, imageTitle, imageUrlLarge, onClickItem }) {
    return  <li className="gallery-item" onClick={() => {onClickItem(imageUrlLarge, imageTitle)}}>
                <img src={imageURL} alt={imageTitle} />
            </li>
}
