import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({
  id,
  largeImageURL,
  webformatURL,
  openModal,
}) => {
  return (
    <li className={css.item} key={id} onClick={() => openModal(largeImageURL)}>
      <img src={webformatURL} alt="imageName" />
    </li>
  );
};
