import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ imageList, isLoading, openModal }) => {
  return (
    <ul>
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
