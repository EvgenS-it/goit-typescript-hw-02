// import css from './ImageModal.module.css';
import Modal from 'react-modal';

const ImageModal = ({ handleModal, img }) => {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      backgroundColor: 'transparent',
      border: 0,
    },
  };

  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={true}
      style={customStyles}
      onRequestClose={() => handleModal()}
    >
      <img src={img.urls.regular} alt={img.alt_description} />
    </Modal>
  );
};

export default ImageModal;
