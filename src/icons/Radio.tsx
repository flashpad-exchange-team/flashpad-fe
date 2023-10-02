const Radio = ({ active }: boolean | any) => {
  return active ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white" />
      <rect
        x="4.80078"
        y="4.80005"
        width="14.4"
        height="14.4"
        rx="7.2"
        fill="#FFAF1D"
      />
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="11"
        fill="#0F0F0F"
        stroke="#FFAF1D"
        strokeWidth="2"
      />
      <rect
        x="5.5"
        y="5.5"
        width="13"
        height="13"
        rx="6.5"
        fill="#FFAF1D"
        stroke="#FFAF1D"
      />
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#0075FF" />
    </svg>
  ) : (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.832031"
        y="0.5"
        width="23"
        height="23"
        rx="11.5"
        fill="white"
      />
      <rect
        x="5.13281"
        y="4.80005"
        width="14.4"
        height="14.4"
        rx="7.2"
        fill="#344054"
      />
      <rect
        x="1.33203"
        y="1"
        width="22"
        height="22"
        rx="11"
        fill="#0F0F0F"
        stroke="#344054"
        strokeWidth="2"
      />
      <rect
        x="5.83203"
        y="5.5"
        width="13"
        height="13"
        rx="6.5"
        fill="#344054"
        stroke="#344054"
      />
      <rect
        x="0.832031"
        y="0.5"
        width="23"
        height="23"
        rx="11.5"
        stroke="#0075FF"
      />
    </svg>
  );
};

export default Radio;
