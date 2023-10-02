const Eligibility = ({ stroke }: any) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.25819 15.5355C3.30557 13.5829 3.30557 10.4171 5.25819 8.46447L9.21318 4.50947C11.1658 2.55685 14.3316 2.55685 16.2843 4.50947L20.2392 8.46447C22.1919 10.4171 22.1919 13.5829 20.2392 15.5355L16.2843 19.4905C14.3316 21.4431 11.1658 21.4431 9.21318 19.4905L5.25819 15.5355Z"
        stroke={stroke || '#FFAF1D'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2625 10.7065L12.1222 13.8469L10.2344 11.9651"
        stroke={stroke || '#FFAF1D'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Eligibility;
