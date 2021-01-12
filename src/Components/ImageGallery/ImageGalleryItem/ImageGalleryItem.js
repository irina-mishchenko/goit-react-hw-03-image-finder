import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ littlePicture, name }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img className={s.ImageGalleryItemImage} src={littlePicture} alt={name} />
    </li>
  );
};

export default ImageGalleryItem;
