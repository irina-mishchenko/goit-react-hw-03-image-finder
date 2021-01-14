import { Component } from 'react';
import propTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

const baseUrl = 'https://pixabay.com/api/';
const key = '16370030-8b42ef581aeaa0cd943bdfd1a';

class ImageGallery extends Component {
  state = {
    images: [],
    loader: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.inputValue;
    const nextValue = this.props.inputValue;
    const currentPage = this.props.page;

    if (prevValue !== nextValue) {
      this.setState({ loader: true });
      fetch(
        `${baseUrl}?q=${nextValue}&page${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(images => this.setState({ images: images.hits }))
        .finally(() => this.setState({ loader: false }));
    }

    if (prevProps.page !== currentPage) {
      this.setState({ loader: true });
      fetch(
        `${baseUrl}?q=${nextValue}&page${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(images =>
          this.setState({ images: [...this.state.images, ...images.hits] }),
        );
    }
  }

  render() {
    const images = this.state.images;

    return (
      <div>
        {this.state.loader && (
          <Loader
            type="Puff"
            color="#3f51b5"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        <ul className={s.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              littlePicture={image.webformatURL}
              largePicture={image.largeImageURL}
              name={image.tags}
              showModal={this.toggleModal}
              id={image.id}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  inputValue: propTypes.string.isRequired,
  page: propTypes.number.isRequired,
};

export default ImageGallery;
