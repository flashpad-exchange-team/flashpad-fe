const Coin = ({ stroke }: any) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4693 5.33334C15.1527 3.68376 17.4582 2.66667 20.0013 2.66667C25.156 2.66667 29.3346 6.84535 29.3346 12C29.3346 14.5431 28.3175 16.8487 26.6679 18.5321M21.3346 20C21.3346 25.1547 17.156 29.3333 12.0013 29.3333C6.84664 29.3333 2.66797 25.1547 2.66797 20C2.66797 14.8453 6.84664 10.6667 12.0013 10.6667C17.156 10.6667 21.3346 14.8453 21.3346 20Z"
        stroke={stroke || 'white'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Coin;
