const DownloadIcon = ({ stroke }: any) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 19H19M10 1V15M10 15L17 8M10 15L3 8"
        stroke={stroke || '#0A071E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownloadIcon;
