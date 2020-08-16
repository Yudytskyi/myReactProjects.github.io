import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import {
  mdiPlay,
  mdiStop,
  mdiSkipNext,
  mdiSkipPrevious,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiCogOutline,
  mdiKeyboardReturn,
} from '@mdi/js';

import styles from './Carousel.module.scss';
import { moveOnDidMount, tick, clear, clickHandle } from './functions';
import Slide from '../Slide';
class Carousel extends Component {
  constructor(props) {
    super(props);
    const { slides, sliderStyles } = this.props;
    this.slides = slides;
    this.sliderStyles = sliderStyles;
    this.currentX = sliderStyles.currentPosition.left;
    this.currentY = sliderStyles.currentPosition.top;

    this.state = {
      isPlaying: false,
      speedPlaying: 5,
      speedValue: 0,
      maxSpeed: 10,
      isFullScreen: false,
      currentSlideNumber: 0,
      time: new Date(),
    };
    this.isFullScreen = false;
    this.timeoutId = null;
    this.isMove = false;
  }

  moveElement = e => {
    if (this.isMove && !this.isFullScreen) {
      const elementSlider = document.getElementById('slider');
      elementSlider.style.top = `${e.clientY - this.currentY}px`;
      elementSlider.style.left = `${e.clientX - this.currentX}px`;
    }
  };

  componentDidMount() {
    this.setState({ isPlaying: !this.state.isPlaying });
    moveOnDidMount.call(this, [this.setState]);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isPlaying, speedPlaying, maxSpeed } = this.state;
    clear.call(this, [this.setState]);
    if (isPlaying) {
      this.timeoutId = setTimeout(tick.bind(this, [this.setState]), (maxSpeed - speedPlaying) * 1000);
    }
  }

  eStop = e => {
    console.log('STOP');
    e.stopPropagation();
  };

  render() {
    const {
      sliderStyles: { isSlideContain },
    } = this.props;
    const bgSize = isSlideContain ? 'contain' : 'cover';
    const currentStyles = this.state.isFullScreen
      ? { ...this.sliderStyles, width: '100vw', height: '100vh' }
      : this.sliderStyles;

    return (
      <div
        className={styles.carousel}
        style={currentStyles}
        onDoubleClick={clickHandle.fullscreen.bind(this, [this.setState])}
        onMouseMove={this.moveElement}
      >
        <Slide slide={this.slides[this.state.currentSlideNumber]} bgSize={bgSize} />
        <div className={styles.buttonsBlock} onDoubleClick={e => e.stopPropagation()}>
          <Icon onClick={() => {}} path={mdiCogOutline} size={1} />
          <div className={styles.movesBlock}>
            <div className={styles.movesBlock__playControl}>
              <Icon
                onClick={clickHandle.prev.bind(this, [this.setState, this.eStop])}
                path={mdiSkipPrevious}
                size={1}
              />
              {this.state.isPlaying ? (
                <Icon onClick={clickHandle.stop.bind(this, [this.setState])} path={mdiStop} size={1} />
              ) : (
                <Icon onClick={clickHandle.play.bind(this, [this.setState])} path={mdiPlay} size={1} />
              )}
              <Icon onClick={clickHandle.next.bind(this, [this.setState])} path={mdiSkipNext} size={1} />
            </div>
            <input
              type="range"
              min="1"
              max={this.state.maxSpeed - 1}
              value={this.state.speedPlaying}
              onChange={e => {
                clickHandle.range.call(this, [this.setState, e.target.value]);
              }}
            />
          </div>
          {this.state.isFullScreen ? (
            <Icon onClick={clickHandle.fullscreen.bind(this, [this.setState])} path={mdiFullscreenExit} size={1} />
          ) : (
            <Icon onClick={clickHandle.fullscreen.bind(this, [this.setState])} path={mdiFullscreen} size={1} />
          )}
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      src: PropTypes.string,
    })
  ),
  sliderStyles: PropTypes.object,
};

Carousel.defaultProps = {
  sliderStyles: {
    width: '600px',
    height: '450px',
    backgroundColor: '#313131',
    isSlideContain: true,
    currentPosition: { top: 10, left: 10 },
  },
};

export default Carousel;
