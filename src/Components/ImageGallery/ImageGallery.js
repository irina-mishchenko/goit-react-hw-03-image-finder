import { Component } from 'react';
import propTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './../Button/Button';
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
    const currentPage = this.state.page;

    if (prevValue !== nextValue) {
      this.setState({
        loader: true,
        images: [],
        page: 1,
      });
      this.fetchImages();
    }

    if (prevState.page !== currentPage) {
      if (currentPage === 1) {
        return;
      }
      this.setState({ loader: true });
      this.fetchImages(this.state.images);
    }
  }

  fetchImages = (prevImages = []) => {
    const nextValue = this.props.inputValue;
    const currentPage = this.state.page;
    fetch(
      `${baseUrl}?q=${nextValue}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(res => res.json())
      .then(images =>
        this.setState({ images: [...prevImages, ...images.hits] }),
      )
      .finally(() => this.setState({ loader: false }));
  };

  handleBtnClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const images = this.state.images;

    return (
      <div className={s.ImageGalleryContainer}>
        <ul className={s.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              littlePicture={image.webformatURL}
              largePicture={image.largeImageURL}
              name={image.tags}
              id={image.id}
            />
          ))}
        </ul>
        {this.state.loader && (
          <Loader
            type="Puff"
            color="#3f51b5"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        {images.length > 0 && <Button onClick={this.handleBtnClick} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  inputValue: propTypes.string.isRequired,
};

export default ImageGallery;
