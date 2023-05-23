import style from './Title.module.scss';
import { PropTypes } from 'prop-types';
const Title = ({ title }) => {
  return (
    <>
      <h1 className={style['heading']}>{title ? title.toUpperCase() : ''}</h1>
    </>
  );
};
Title.propTypes = {
  title: PropTypes.string,
};
export default Title;
