import { formatDistance } from 'date-fns';
import { Tooltip } from 'react-tooltip';

const LockPositionIcon = ({ onClick, lockDays }: any) => {
  return (
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content={
        lockDays && lockDays > 0
          ? `Active lock until ${formatDistance(0, lockDays, {
              includeSeconds: true,
            })}`
          : 'No lock'
      }
    >
      <svg
        onClick={onClick}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.8418 7.68275V5.83609C6.8418 4.12609 8.12263 2.59359 9.83013 2.50442C11.651 2.40942 13.1576 3.85775 13.1576 5.65775V7.68275"
          stroke={lockDays && lockDays > 0 ? '#FFAF1D' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.8298 8.2535C15.9452 10.3688 15.9452 13.7985 13.8298 15.9138C11.7145 18.0292 8.28486 18.0292 6.16951 15.9138C4.05417 13.7985 4.05417 10.3688 6.16951 8.2535C8.28486 6.13816 11.7145 6.13816 13.8298 8.2535"
          stroke={lockDays && lockDays > 0 ? '#FFAF1D' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99967 13.75V11.625"
          stroke={lockDays && lockDays > 0 ? '#FFAF1D' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99752 10.3594C9.65252 10.3594 9.37252 10.6394 9.37502 10.9844C9.37502 11.3294 9.65502 11.6094 10 11.6094C10.345 11.6094 10.625 11.3294 10.625 10.9844C10.625 10.6394 10.345 10.3594 9.99752 10.3594"
          stroke={lockDays && lockDays > 0 ? '#FFAF1D' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default LockPositionIcon;
