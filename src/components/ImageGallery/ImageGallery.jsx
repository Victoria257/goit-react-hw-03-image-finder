export const ImageGallery = ({ imageList, isLoading, openModal }) => {
  return (
    <ul>
      {imageList.map(({ id, webformatURL, largeImageURL }) =>
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <li key={id} onClick={() => openModal(largeImageURL)}>
            <img src={webformatURL} alt="imageName" />
          </li>
        )
      )}
    </ul>
  );
};
