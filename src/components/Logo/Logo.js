import { AppConstants } from '../../constants/app-constants';
import highLighter from '../../utils/logoHighLighter';
import styles from './Logo.module.scss';
import PropTypes from 'prop-types';

/**
 * @description function to return a logo component
 * @version 1.0.0
 * @author [Abdul Adhil]
 * @param { src, alt }
 * @returns Logo
 */
const Logo = ({ src, alt }) => {
  const [normalText, highLightedText] = highLighter(AppConstants.LOGO.LABEL);
  return (
    <div className={styles[`logo`]}>
      <img src={src} alt={alt} />

      <h1>
        <span>{normalText}</span>
        <span className={styles['highLightedText']}>{highLightedText}</span>
      </h1>
    </div>
  );
};

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
export default Logo;
