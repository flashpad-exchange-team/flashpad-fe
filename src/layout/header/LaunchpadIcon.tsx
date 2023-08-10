interface LaunchPadIconProps {
  active?: boolean;
}
const LaunchPadIcon = ({ active }: LaunchPadIconProps) => {
  return active ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7395 11.6254L12.2268 15.2355C11.8941 15.5017 11.4145 15.4751 11.1132 15.1738L8.82694 12.8875C8.52567 12.5863 8.49911 12.1066 8.76527 11.7739L12.3754 7.26129C14.0262 5.1978 16.5255 3.99658 19.168 3.99658V3.99658C19.6298 3.99658 20.0042 4.37095 20.0042 4.83276V4.83276C20.0042 7.47532 18.803 9.97461 16.7395 11.6254Z"
        stroke="#FFAF1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.59688 12.4587L6.70262 11.8273C6.47266 11.7506 6.28727 11.578 6.19451 11.354C6.10175 11.1301 6.11073 10.8769 6.21914 10.6601L7.22921 8.63993C7.37086 8.35666 7.6604 8.17773 7.97711 8.17773H11.6412"
        stroke="#FFAF1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.541 15.4021L12.1726 17.297C12.2493 17.5269 12.422 17.7123 12.6459 17.8051C12.8699 17.8979 13.123 17.8889 13.3399 17.7805L15.36 16.7704C15.6433 16.6287 15.8222 16.3392 15.8222 16.0225V12.3584"
        stroke="#FFAF1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.60663 19.6114L3.99805 20.0033L4.38994 17.3947C4.51707 16.5484 5.18137 15.8841 6.02762 15.757V15.757C6.63911 15.6651 7.25791 15.8689 7.69514 16.3062C8.13237 16.7434 8.33615 17.3622 8.24429 17.9737V17.9737C8.11715 18.8199 7.45286 19.4842 6.60663 19.6114V19.6114Z"
        stroke="#FFAF1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6528 7.26807C20.5382 8.68739 21.0062 10.3272 21.0034 12C21.002 15.3174 19.1773 18.3654 16.2541 19.9337C13.3309 21.5019 9.78225 21.3365 7.01758 19.5032"
        stroke="#FFAF1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.49746 16.9822C2.15267 13.4581 2.58037 8.77643 5.52488 5.73561C8.4694 2.69479 13.1349 2.11669 16.7326 4.34689"
        stroke="#FFAF1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6174 11.6254L13.1048 15.2355C12.7721 15.5017 12.2924 15.4751 11.9912 15.1738L9.70487 12.8875C9.4036 12.5863 9.37704 12.1066 9.6432 11.7739L13.2533 7.26129C14.9041 5.1978 17.4034 3.99658 20.0459 3.99658V3.99658C20.5078 3.99658 20.8821 4.37095 20.8821 4.83276V4.83276C20.8821 7.47532 19.6809 9.97461 17.6174 11.6254Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.47579 12.4587L7.58153 11.8273C7.35156 11.7506 7.16618 11.578 7.07342 11.354C6.98065 11.1301 6.98964 10.8769 7.09805 10.6601L8.10812 8.63993C8.24977 8.35666 8.5393 8.17773 8.85602 8.17773H12.5201"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4199 15.4021L13.0515 17.297C13.1282 17.5269 13.3009 17.7123 13.5248 17.8051C13.7488 17.8979 14.002 17.8889 14.2188 17.7805L16.2389 16.7704C16.5222 16.6287 16.7011 16.3392 16.7011 16.0225V12.3584"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.48359 19.6114L4.875 20.0033L5.26689 17.3947C5.39402 16.5484 6.05833 15.8841 6.90458 15.757V15.757C7.51606 15.6651 8.13486 15.8689 8.57209 16.3062C9.00932 16.7434 9.21311 17.3622 9.12124 17.9737V17.9737C8.99411 18.8199 8.32981 19.4842 7.48359 19.6114V19.6114Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5317 7.26807C21.4171 8.68739 21.8851 10.3272 21.8823 12C21.8809 15.3174 20.0562 18.3654 17.133 19.9337C14.2098 21.5019 10.6612 21.3365 7.89648 19.5032"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.37539 16.9822C3.0306 13.4581 3.4583 8.77643 6.40281 5.73561C9.34733 2.69479 14.0128 2.11669 17.6105 4.34689"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LaunchPadIcon;
