import css from './ImageCard.module.css';
import PropTypes from 'prop-types';

const ImageCard = ({ alt, urls }) => {
  const { imgContainer, img } = css;
  return (
    <div className={imgContainer}>
      <img src={urls.small} alt={alt} className={img} />
    </div>
  );
};

ImageCard.propTypes = {
  alt: PropTypes.string.isRequired,
  urls: PropTypes.object.isRequired,
};

export default ImageCard;
