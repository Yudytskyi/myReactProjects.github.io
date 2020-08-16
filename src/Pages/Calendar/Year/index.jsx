import React from 'react';
import PropTypes from 'prop-types';
import { startOfYear, endOfYear, eachMonthOfInterval, eachQuarterOfInterval, addMonths } from 'date-fns';

import styles from './Year.module.scss';

import Month from '../Month';

function Year(props) {
  const { currentDate } = props;

  const quarterOfYear = eachQuarterOfInterval({
    start: startOfYear(currentDate),
    end: endOfYear(currentDate),
  });

  const monthOfQuarter = date => {
    return eachMonthOfInterval({ start: date, end: addMonths(date, 2) });
  };

  return (
    <div className={styles.year}>
      {quarterOfYear.map(firstDayOfQuarter => {
        return (
          <div className={styles.quarter}>
            {monthOfQuarter(firstDayOfQuarter).map(dey => {
              return <Month {...props} currentDate={dey} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

Year.propTypes = {
  date: PropTypes.instanceOf(Date),
  currentDate: PropTypes.instanceOf(Date),
};

Year.defaultProps = {
  date: new Date(),
  currentDate: new Date(),
};

export default Year;
