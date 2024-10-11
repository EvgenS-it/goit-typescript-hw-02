import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard.jsx';

const ImageGallery = ({ images, handleOpenModal }) => {
  return (
    <ul className={css.galeryList}>
      {Array.isArray(images) &&
        images.map(image => {
          return (
            <li
              key={image.id}
              onClick={() => handleOpenModal(image.id)}
              className={css.cardItem}
            >
              <ImageCard
                alt={image.alt_description}
                urls={image.urls}
                id={image.id}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
