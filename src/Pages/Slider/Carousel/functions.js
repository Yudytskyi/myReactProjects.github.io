export function moveOnDidMount() {
  const elem = document.getElementById('slider');
  elem.onmousedown = e => {
    if (!this.isMove) {
      this.currentX = e.clientX;
      this.currentY = e.clientY;
    }
    this.isMove = true;
  };
  elem.onmouseup = e => {
    this.isMove = false;
  };
}

export function tick() {
  this.setState(state => {
    const { time } = state;
    const newDate = new Date(time.getTime());
    newDate.setSeconds(newDate.getSeconds() + 1);
    clickHandle.next.call(this, [this.setState]);
    return {
      time: newDate,
    };
  });
}

export function clear() {
  if (this.timeoutId) {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }
}

export const clickHandle = {
  prev: function () {
    this.eStop();
    this.setState({
      currentSlideNumber: (this.state.currentSlideNumber - 1 + this.slides.length) % this.slides.length,
    });
  },

  play: function () {
    this.setState({ isPlaying: !this.state.isPlaying });
  },
  stop: function () {
    this.setState({ isPlaying: false });
  },
  range: function (props) {
    const rangeValue = props[1];
    if (this.state.speedPlaying !== rangeValue) {
      this.setState({ speedPlaying: rangeValue });
    }
  },
  next: function () {
    this.setState({ currentSlideNumber: (this.state.currentSlideNumber + 1) % this.slides.length });
  },
  fullscreen: function () {
    this.setState({ isFullScreen: !this.state.isFullScreen });
    document.getElementById('slider').style = { top: '0px', left: '0px' };
  },
};
