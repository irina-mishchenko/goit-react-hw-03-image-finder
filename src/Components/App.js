import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    inputValue: '',
    page: 1,
  };

  handleFormSubmit = searchValue => {
    this.setState({ inputValue: searchValue });
  };

  handleBtnClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          inputValue={this.state.inputValue}
          images={this.state.images}
          page={this.state.page}
        />
        <Button onClick={this.handleBtnClick} />
      </div>
    );
  }
}

export default App;
