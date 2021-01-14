import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

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
    const { inputValue, page } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery inputValue={inputValue} page={page} />
        <Button onClick={this.handleBtnClick} />
      </div>
    );
  }
}

export default App;
