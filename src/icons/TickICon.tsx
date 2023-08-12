const TickIcon = ({ size }: { size?: string }) => {
  return (
    <svg
      width={size || '16'}
      height={size || '16'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.50917 15.5355C2.55655 13.5829 2.55655 10.4171 4.50917 8.46447L8.46416 4.50947C10.4168 2.55685 13.5826 2.55685 15.5352 4.50947L19.4902 8.46447C21.4428 10.4171 21.4428 13.5829 19.4902 15.5355L15.5352 19.4905C13.5826 21.4431 10.4168 21.4431 8.46416 19.4905L4.50917 15.5355Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5125 10.7065L11.3722 13.8469L9.48438 11.9651"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TickIcon;
