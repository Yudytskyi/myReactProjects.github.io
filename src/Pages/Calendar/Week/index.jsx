import React from 'react';
import PropTypes from 'prop-types';
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

import { week, week__title, content } from './Week.module.scss';

function Week(props) {
  const {
    date,
    currentDate,
    setSelectedDate,
    classNameStr,
    isShow,
    isShow: { month, calendarDate },
    setIsShow,
  } = props;

  const daysOfInterval = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: endOfWeek(currentDate),
  });

  return (
    <div className={week}>
      <p
        onDoubleClick={() => {
          setIsShow({ ...isShow, month: !month });
        }}
        className={week__title}
      >
        {format(date, 'MMMM Y')}
      </p>
      <div className={content}>
        {daysOfInterval.map(dey => {
          return (
            <p
              key={format(dey, 'YYY-MMM-d')}
              className={classNameStr(dey)}
              onClick={e => {
                e.stopPropagation();
                setSelectedDate(dey);
              }}
              onDoubleClick={() => {
                setIsShow({ ...isShow, calendarDate: !calendarDate });
              }}
            >
              {format(dey, 'd EEEE')}
            </p>
          );
        })}
      </div>
    </div>
  );
}

Week.propTypes = {
  date: PropTypes.instanceOf(Date),
  currentDate: PropTypes.instanceOf(Date),
};

Week.defaultProps = {
  date: new Date(),
  currentDate: new Date(),
};

export default Week;
