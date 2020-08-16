import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isSameMonth, isSameDay } from 'date-fns';

import styles from './Calendar.module.scss';
import '../Calendar/common/_commonStyles.scss';

import Year from './Year';
import Month from './Month';
import Week from './Week';
import CalendarDate from './CalendarDate';

const Calendar = props => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isShow, setIsShow] = useState({
    year: false,
    month: true,
    week: false,
    calendarDate: true,
  });
  const { year, month, week, calendarDate } = isShow;

  const { currentDate } = props;

  const classNameStr = dey => {
    return classNames('item', {
      [styles.currentDate]: isSameDay(dey, currentDate),
      [styles.otherMonth]: !isSameMonth(dey, currentDate),
      [styles.selectedDate]: isSameDay(dey, selectedDate),
    });
  };

  const commonProps = {
    classNameStr: classNameStr,
    date: currentDate,
    currentDate: currentDate,
    setSelectedDate: setSelectedDate,
    selectedDate: selectedDate,
    setIsShow: setIsShow,
    isShow: isShow,
  };

  return (
    <article className={styles.contentContainer}>
      <a className="returnLink" href="/">
        ←
      </a>
      {calendarDate && <CalendarDate {...commonProps} />}
      {month && <Month {...commonProps} />}
      {week && <Week {...commonProps} />}
      {year && <Year {...commonProps} />}
    </article>
  );
};

Calendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
};

Calendar.defaultProps = {
  currentDate: new Date(),
};

export default Calendar;
