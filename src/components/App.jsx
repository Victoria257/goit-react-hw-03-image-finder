import React, { Component } from 'react';
import axios from 'axios';

import { Searchbar } from './Searchbar/Searchbar';

const API_KEY = '33139428-a4880fd896903b0937526f617';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    nameSearch: '',
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await axios.get(
      `https://pixabay.com/api/?q='beauty'&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    try {
      const images = response.data.hits;
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const name = this.state.nameSearch;
    if (name !== prevState.nameSearch) {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${name}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      try {
        const images = response.data.hits;
        this.setState({ images });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = event => {
    this.setState({ nameSearch: event });
  };

  render() {
    const imageList = this.state.images;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ul>
          {imageList.map(({ id, webformatURL, largeImageURL }) =>
            this.state.isLoading ? (
              <p>Loading...</p>
            ) : (
              <li key={id}>
                <img src={webformatURL} alt="imageName" />
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}
