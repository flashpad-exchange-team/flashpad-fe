const TelegramIcon = ({ xl }: any) => {
  return xl ? (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2620_38449)">
        <path
          d="M16.1953 25.302L15.5336 34.6087C16.4803 34.6087 16.8903 34.202 17.382 33.7136L21.8203 29.472L31.017 36.207C32.7037 37.147 33.892 36.652 34.347 34.6553L40.3837 6.36868L40.3853 6.36702C40.9203 3.87368 39.4837 2.89868 37.8403 3.51035L2.35697 17.0953C-0.0647039 18.0353 -0.0280373 19.3853 1.9453 19.997L11.017 22.8186L32.0887 9.63368C33.0803 8.97702 33.982 9.34035 33.2403 9.99702L16.1953 25.302Z"
          fill="#0A071E"
        />
      </g>
      <defs>
        <clipPath id="clip0_2620_38449">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hover-icon"
    >
      <path
        d="M9.41718 15.1809L9.02018 20.7649C9.58818 20.7649 9.83418 20.5209 10.1292 20.2279L12.7922 17.6829L18.3102 21.7239C19.3222 22.2879 20.0352 21.9909 20.3082 20.7929L23.9302 3.82092L23.9312 3.81992C24.2522 2.32392 23.3902 1.73892 22.4042 2.10592L1.11418 10.2569C-0.338822 10.8209 -0.316822 11.6309 0.867178 11.9979L6.31018 13.6909L18.9532 5.77992C19.5482 5.38592 20.0892 5.60392 19.6442 5.99792L9.41718 15.1809Z"
        fill="white"
      />
      <style jsx>
        {`
          .hover-icon path:hover {
            fill: #ffc700;
          }
        `}
      </style>
    </svg>
  );
};

export default TelegramIcon;
