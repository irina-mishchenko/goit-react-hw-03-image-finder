import { Component } from 'react';
import propTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import Modal from './../../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    id: null,
  };

  toggleModal = imageId => {
    this.setState(state => ({
      showModal: !state.showModal,
      id: imageId,
    }));
  };

  render() {
    return (
      <>
        <li className={s.ImageGalleryItem}>
          <img
            className={s.ImageGalleryItemImage}
            src={this.props.littlePicture}
            alt={this.props.name}
            onClick={this.toggleModal}
          />
        </li>
        {this.state.showModal && (
          <Modal
            src={this.props.largePicture}
            alt={this.props.name}
            onClose={this.toggleModal}
          />
        )}{' '}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  littlePicture: propTypes.string.isRequired,
  largePicture: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  showModal: propTypes.func.isRequired,
  id: propTypes.number.isRequired,
};

export default ImageGalleryItem;
