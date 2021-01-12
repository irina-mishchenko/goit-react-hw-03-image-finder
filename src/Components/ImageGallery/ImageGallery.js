import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const baseUrl = 'https://pixabay.com/api/';
const key = '16370030-8b42ef581aeaa0cd943bdfd1a';

class ImageGallery extends Component {
  state = {
    images: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      fetch(
        `${baseUrl}?q=${this.props.inputValue}&page${this.props.page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(images => this.setState({ images: images.hits }));
    }

    if (prevProps.page !== this.props.page) {
      fetch(
        `${baseUrl}?q=${this.props.inputValue}&page${this.props.page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(images => this.setState({ images: images.hits, ...images }));
    }
  }

  render() {
    const images = this.state.images;

    return (
      <div>
        <ul className={s.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              littlePicture={image.webformatURL}
              name={image.tags}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ImageGallery;
