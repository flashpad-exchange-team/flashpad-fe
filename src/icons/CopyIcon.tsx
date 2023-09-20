const CopyIcon = ({ stroke }: any) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66667 11.3333H3.33333C2.97971 11.3333 2.64057 11.1929 2.39052 10.9428C2.14048 10.6928 2 10.3536 2 10V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H10C10.3536 2 10.6928 2.14048 10.9428 2.39052C11.1929 2.64057 11.3333 2.97971 11.3333 3.33333V4.66667"
        stroke={stroke || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2637 4.66669H5.40366C4.99681 4.66669 4.66699 4.9965 4.66699 5.40335V13.2634C4.66699 13.6702 4.99681 14 5.40366 14H13.2637C13.6705 14 14.0003 13.6702 14.0003 13.2634V5.40335C14.0003 4.9965 13.6705 4.66669 13.2637 4.66669Z"
        stroke={stroke || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CopyIcon;
