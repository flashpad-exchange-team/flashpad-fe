const ChartLine = ({ isInButton }: any) => {
  return isInButton ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_720_15809)">
        <path
          d="M3.33301 10.593L6.71367 7.21233C6.77553 7.15036 6.849 7.1012 6.92988 7.06766C7.01076 7.03412 7.09745 7.01686 7.18501 7.01686C7.27256 7.01686 7.35926 7.03412 7.44014 7.06766C7.52101 7.1012 7.59448 7.15036 7.65634 7.21233L9.08367 8.63966C9.14553 8.70162 9.219 8.75078 9.29988 8.78432C9.38076 8.81786 9.46745 8.83513 9.55501 8.83513C9.64256 8.83513 9.72926 8.81786 9.81014 8.78432C9.89101 8.75078 9.96448 8.70162 10.0263 8.63966L13.9997 4.66699"
          stroke="#0C111D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.2217 4.66699H13.9997V6.44499"
          stroke="#0C111D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.9999 13.9528H1.2832V2.14746"
          stroke="#0C111D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_720_15809">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_457_9427)">
        <path
          d="M6.66797 21.1853L13.4293 14.424C13.553 14.3001 13.7 14.2018 13.8617 14.1347C14.0235 14.0676 14.1969 14.0331 14.372 14.0331C14.5471 14.0331 14.7205 14.0676 14.8822 14.1347C15.044 14.2018 15.1909 14.3001 15.3146 14.424L18.1693 17.2787C18.293 17.4026 18.44 17.5009 18.6017 17.568C18.7635 17.6351 18.9369 17.6696 19.112 17.6696C19.2871 17.6696 19.4605 17.6351 19.6222 17.568C19.784 17.5009 19.9309 17.4026 20.0546 17.2787L28.0013 9.33333"
          stroke="#FFAF1D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.4453 9.33333H28.0013V12.8893"
          stroke="#FFAF1D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.9997 27.9053H2.56641V4.29466"
          stroke="#FFAF1D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_457_9427">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChartLine;
