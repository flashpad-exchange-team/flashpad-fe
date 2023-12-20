import { Tooltip } from 'react-tooltip';

const BoostPositionIcon = ({ onClick, active, amount }: any) => {
  return (
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content={
        active ? `Boosted ${amount} xFlash` : `No active boost`
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
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.9483 9.68841L10.1877 12.6968C9.91048 12.9186 9.51079 12.8965 9.25973 12.6454L7.35448 10.7402C7.10342 10.4891 7.08129 10.0894 7.30309 9.81218L10.3115 6.05165C11.6872 4.33207 13.7699 3.33105 15.972 3.33105V3.33105C16.3569 3.33105 16.6689 3.64303 16.6689 4.02787V4.02787C16.6689 6.23001 15.6678 8.31274 13.9483 9.68841Z"
          stroke={active ? '#FFAF1D' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.16439 10.3829L5.58584 9.85672C5.39421 9.79285 5.23972 9.64895 5.16242 9.46233C5.08511 9.2757 5.0926 9.06472 5.18294 8.88404L6.02467 7.20059C6.14271 6.96453 6.38399 6.81543 6.64792 6.81543H9.70133"
          stroke={active ? '#FFAF1D' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.61719 12.8352L10.1435 14.4143C10.2074 14.606 10.3513 14.7604 10.5379 14.8377C10.7246 14.915 10.9355 14.9076 11.1162 14.8172L12.7997 13.9755C13.0357 13.8574 13.1848 13.6162 13.1848 13.3522V10.2988"
          stroke={active ? '#FFAF1D' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.5039 16.3433L3.33008 16.6699L3.65666 14.4961C3.76259 13.7908 4.31618 13.2373 5.02139 13.1313V13.1313C5.53097 13.0548 6.04663 13.2246 6.41099 13.589C6.77535 13.9533 6.94517 14.469 6.86861 14.9786V14.9786C6.76267 15.6838 6.20909 16.2374 5.5039 16.3433V16.3433Z"
          stroke={active ? '#FFAF1D' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.377 6.05664C17.1148 7.23941 17.5049 8.60594 17.5025 9.99995C17.5013 12.7644 15.9808 15.3044 13.5447 16.6113C11.1087 17.9182 8.15155 17.7804 5.84766 16.2526"
          stroke={active ? '#FFAF1D' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.74723 14.1521C1.79324 11.2154 2.14965 7.31402 4.60342 4.78C7.05718 2.24598 10.9451 1.76424 13.9431 3.62274"
          stroke={active ? '#FFAF1D' : '#fff'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default BoostPositionIcon;
