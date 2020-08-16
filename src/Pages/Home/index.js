import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <Link className={`${styles.homePage__link} ${styles.calendar}`} to="/calendar" title="Calendar" />
      <Link className={`${styles.homePage__link} ${styles.slider}`} to="/slider" title="Slider" />
    </div>
  );
};
export default Home;
