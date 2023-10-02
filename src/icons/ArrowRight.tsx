const ArrowRight = ({ fill }: any) => {
  return fill ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
    >
      <path
        d="M1.5 6H13.5"
        stroke="#0C111D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 1.5L13.5 6L9.5 10.5"
        stroke="#0C111D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.66797 12H17.668"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.668 7.5L17.668 12L13.668 16.5"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowRight;
