import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import styles from './CalendarDate.module.scss';

function CalendarDate(props) {
  const {
    selectedDate,
    isShow,
    isShow: { year, month, week, calendarDate },
    setIsShow,
  } = props;
  return (
    <div className={styles.calendarDate}>
      <p
        className={styles.calendarDate__title}
        onDoubleClick={() => {
          setIsShow({ ...isShow, week: !week });
        }}
      >
        {format(selectedDate, 'EEEE')}
      </p>
      <p
        className={styles.calendarDate__content}
        onDoubleClick={() => {
          if (year || month || week) {
            setIsShow({ ...isShow, calendarDate: !calendarDate });
          }
        }}
      >
        {format(selectedDate, 'd')}
      </p>
      <p
        className={styles.calendarDate__subtitle}
        onDoubleClick={() => {
          setIsShow({ ...isShow, month: !month });
        }}
      >
        {format(selectedDate, 'MMMM YYY')}
      </p>
    </div>
  );
}

CalendarDate.propTypes = {
  date: PropTypes.instanceOf(Date),
};

CalendarDate.defaultProps = {
  date: new Date(),
};

export default CalendarDate;
