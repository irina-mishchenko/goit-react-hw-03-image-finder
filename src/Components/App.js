import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    inputValue: '',
  };

  handleFormSubmit = searchValue => {
    this.setState({ inputValue: searchValue });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery inputValue={inputValue} />
      </div>
    );
  }
}

export default App;
