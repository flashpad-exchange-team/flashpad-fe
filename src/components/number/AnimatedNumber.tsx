import React from 'react';
import CountUp from 'react-countup';

const getDecimalPlaces = (number: any): number => {
  if (Math.floor(number) === number) return 0;
  return number.toString().split('.')[1]?.length || 0;
};

const AnimatedNumber: React.FC<{ value: any }> = ({ value }) => {
  const decimalPlaces = getDecimalPlaces(value);

  return (
    <CountUp
      start={0}
      end={value as any}
      decimals={decimalPlaces}
      duration={0.44}
      className="mr-1"
    />
  );
};

export default AnimatedNumber;
