import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = '33139428-a4880fd896903b0937526f617';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    const response = await axios.get(
      `https://pixabay.com/api/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    this.setState({ isLoading: true });

    try {
      const images = response.data.hits;
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const imageList = this.state.images;
    return (
      <div>
        <div>
          <input></input>
        </div>
        <ul>
          {imageList.map(({ id, webformatURL, largeImageURL }) => (
            <li key={id}>
              <img src={webformatURL} alt="imageName" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
