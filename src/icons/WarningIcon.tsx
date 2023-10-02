const WarningIcon = ({ strokeColor }: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.0288 4.13919L21.6878 17.5432C22.5778 19.1012 21.4528 21.0402 19.6588 21.0402H4.34076C2.54576 21.0402 1.42076 19.1012 2.31176 17.5432L9.97076 4.13919C10.8678 2.56819 13.1318 2.56819 14.0288 4.13919Z"
        stroke={strokeColor || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13.1204V9.38037"
        stroke={strokeColor || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.999 16C11.9496 16.0002 11.9014 16.015 11.8604 16.0426C11.8194 16.0702 11.7875 16.1093 11.7687 16.155C11.75 16.2007 11.7452 16.251 11.7549 16.2994C11.7647 16.3478 11.7886 16.3923 11.8236 16.4271C11.8586 16.462 11.9031 16.4857 11.9516 16.4953C12.0001 16.5048 12.0503 16.4998 12.0959 16.4809C12.1415 16.4619 12.1805 16.4299 12.2079 16.3888C12.2354 16.3477 12.25 16.2994 12.25 16.25C12.2501 16.2171 12.2437 16.1844 12.2311 16.1539C12.2186 16.1235 12.2001 16.0958 12.1767 16.0726C12.1534 16.0493 12.1256 16.0309 12.0951 16.0185C12.0646 16.006 12.032 15.9997 11.999 16"
        stroke={strokeColor || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WarningIcon;
