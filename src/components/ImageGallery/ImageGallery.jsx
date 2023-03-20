import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
export const ImageGallery = ({ imageList, openModal }) => {
  return (
    <ul className={css.gallery}>
      {imageList.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          id={id}
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};
