import css from './LoadMoreBtn.module.css';
import PropTypes from 'prop-types';

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <div className={css.btnContainer}>
      <button type="button" onClick={onLoadMore} className={css.moreBtn}>
        Load more
      </button>
    </div>
  );
};

LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
