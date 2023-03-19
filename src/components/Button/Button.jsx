import css from './Button.module.css';

export const Button = ({ onLoadMoreBtn }) => {
  return (
    <button className={css.button} type="button" onClick={onLoadMoreBtn}>
      Load more
    </button>
  );
};
