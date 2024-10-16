import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import requestImages from '../../services/api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { Toaster } from 'react-hot-toast';
import { Image } from './App.types';

function App() {
  const [images, setImages] = useState<Image[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [modalImage, setModalImage] = useState<object>({});
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (query === null) return;

    const fetchImages = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await requestImages(query, page);
        console.log('data:', data);
        setImages(prevImages => [...prevImages, ...data.results]);

        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
        console.log(`MY ERROR =======> ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const onSearch = (searchTerm: string): void => {
    setError(null);
    setImages([]);
    setQuery(searchTerm);
    setPage(1);
  };

  const onLoadMore = () => setPage(prevPage => prevPage + 1);

  const handleOpenModal = (currentId: string) => {
    if (images === null) return;
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
