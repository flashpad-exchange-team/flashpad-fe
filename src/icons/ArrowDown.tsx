const ArrowDown = ({ stroke }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g transform="rotate(180, 12, 12)">
        <path
          d="M16 14L12 10L8 14"
          stroke={stroke || '#FFAF1D'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ArrowDown;
