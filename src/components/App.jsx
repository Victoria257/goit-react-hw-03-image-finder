import React, { Component } from 'react';
import axios from 'axios';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import css from 'components/App.module.css';

const API_KEY = '33139428-a4880fd896903b0937526f617';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    nameSearch: '',
    page: 1,
    total: 0,
    largeImage: '',
    showModal: false,
  };

  // async componentDidMount() {
  //   this.setState({ isLoading: true });
  //   const response = await axios.get(
  //     `https://pixabay.com/api/?q='beauty'&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
  //   );

  //   try {
  //     const images = response.data.hits;
  //     this.setState({ images });
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    const name = this.state.nameSearch;
    if (name !== prevState.nameSearch || this.state.page !== prevState.page) {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${name}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
      );

      try {
        const images = response.data.hits;
        if (response.data.total === 0) {
          this.setState({ error: 'error' });
        }
        const pageTotal = Math.ceil(response.data.total / 12);
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          total: pageTotal,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = event => {
    this.setState({
      images: [],
      isLoading: false,
      error: null,
      page: 1,
      total: 0,

      nameSearch: event,
    });
  };

  onLoadMoreBtn = () => {
    this.setState(prevState => {
      if (this.state.page < this.state.total) {
        return { page: prevState.page + 1 };
      } else {
        return { page: prevState.page };
      }
    });
  };

  openModal = largeImageURL => {
    this.setState(state => ({
      largeImage: largeImageURL,
      showModal: true,
    }));
  };

  onCloseModal = event => {
    if (event.target.name !== 'imageBig') {
      this.setState(state => ({
        showModal: false,
      }));
    }
  };

  onPressEsc = event => {
    if (event.code === 'Escape') {
      this.setState(state => ({
        showModal: false,
      }));
    }
  };

  render() {
    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.isLoading && <Loader />}
        {this.state.error && (
          <p>
            По цьому запиту нічого не знайдено. Введіть, будь ласка, інший
            запит.
          </p>
        )}
        <ImageGallery
          imageList={this.state.images}
          isLoading={this.state.isLoading}
          openModal={this.openModal}
        />

        {this.state.images.length > 0 && this.state.page < this.state.total && (
          <Button onLoadMoreBtn={this.onLoadMoreBtn} />
        )}
        {this.state.page === this.state.total && <p>This is last page</p>}

        {this.state.showModal && (
          <Modal
            largeImage={this.state.largeImage}
            onCloseModal={this.onCloseModal}
            onPressEsc={this.onPressEsc}
          />
        )}
      </div>
    );
  }
}
