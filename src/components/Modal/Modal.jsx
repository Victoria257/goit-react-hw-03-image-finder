import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onPressEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onPressEsc);
  }

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.props.onCloseModal}>
        <div className={css.modal}>
          <img name="imageBig" src={this.props.largeImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
