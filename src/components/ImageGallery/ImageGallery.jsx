import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
export const ImageGallery = ({ imageList, isLoading, openModal }) => {
  return (
    <ul className={css.gallery}>
      {imageList.map(({ id, webformatURL, largeImageURL }) =>
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            openModal={openModal}
          />
        )
      )}
    </ul>
  );
};
