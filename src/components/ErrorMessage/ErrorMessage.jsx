import css from './ErrorMessage.module.css';
import PropTypes from 'prop-types';

const ErrorMessage = ({ errorMsg }) => {
  return (
    <div>
      <p className={css.error}>{errorMsg}. Please, try again later...</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  errMsg: PropTypes.string,
};

export default ErrorMessage;
