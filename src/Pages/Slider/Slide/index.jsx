import React from 'react';
import PropTypes from 'prop-types';

import styles from './Slide.module.scss';
import dummy from './img/dummy.jpg';

function Slide(props) {
  const {
    slide: { src, title, description },
    bgSize,
  } = props;

  const bgStyles = {
    backgroundPosition: 'center',
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: bgSize,
  };

  return (
    <figure className={styles.imageWrapper}>
      <div className={styles.image} style={bgStyles}></div>
      <div className={styles.figcaption}>
        <h3 className={styles.figcaption__title}>{title}</h3>
        <p className={styles.figcaption__description}>{description}</p>
      </div>
    </figure>
  );
}

Slide.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

Slide.defaultProps = {
  src: dummy,
  title: 'Slide',
  bgSize: 'cover',
};

export default Slide;
