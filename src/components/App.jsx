import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar.jsx';
import requestImages from '../services/api.js';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Loader from './Loader/Loader.jsx';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn.jsx';
import ImageModal from './ImageModal/ImageModal.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (query === null) return;

    const fetchImages = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await requestImages(query, page);
        setImages(prevImages => [...prevImages, ...data.results]);

        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const onSearch = searchTerm => {
    setError(null);
    setImages([]);
    setQuery(searchTerm);
    setPage(1);
  };

  const onLoadMore = () => setPage(prevPage => prevPage + 1);

  const handleOpenModal = currentId => {
    const [currentImg] = images.filter(({ id }) => id === currentId);
    setModalImage(currentImg);
    setOpenModal(!openModal);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />
      {error !== null && <ErrorMessage errorMsg={error} />}
      {!isLoading && Array.isArray(images) && images.length === 0 ? (
        <p>
          No results for your query &quot;{query}&quot;. Please, try another
          keyword.
        </p>
      ) : (
        <ImageGallery images={images} handleOpenModal={handleOpenModal} />
      )}
      {isLoading && <Loader />}

      {Array.isArray(images) && images.length !== 0 && page < totalPages && (
        <LoadMoreBtn onLoadMore={onLoadMore} />
      )}
      {openModal && <ImageModal handleModal={setOpenModal} img={modalImage} />}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
