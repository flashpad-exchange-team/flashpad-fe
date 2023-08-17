const ProgressBar = ({ active }: any) => {
  return active ? (
    <svg
      width="372"
      height="24"
      viewBox="0 0 372 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_377_38314)">
        <rect y="6" width="12" height="12" rx="6" fill="white" />
        <rect
          x="0.5"
          y="6.5"
          width="11"
          height="11"
          rx="5.5"
          stroke="#FFAF1D"
        />
      </g>
      <rect x="12" y="11" width="168" height="2" fill="#FFAF1D" />
      <g clip-path="url(#clip1_377_38314)">
        <rect x="180" y="6" width="12" height="12" rx="6" fill="white" />
        <rect
          x="180.5"
          y="6.5"
          width="11"
          height="11"
          rx="5.5"
          stroke="#FFAF1D"
        />
      </g>
      <rect x="192" y="11" width="168" height="2" fill="#FFAF1D" />
      <g clip-path="url(#clip2_377_38314)">
        <rect x="360" y="6" width="12" height="12" rx="6" fill="white" />
        <rect
          x="360.5"
          y="6.5"
          width="11"
          height="11"
          rx="5.5"
          stroke="#FFAF1D"
        />
      </g>
      <defs>
        <clipPath id="clip0_377_38314">
          <rect y="6" width="12" height="12" rx="6" fill="white" />
        </clipPath>
        <clipPath id="clip1_377_38314">
          <rect x="180" y="6" width="12" height="12" rx="6" fill="white" />
        </clipPath>
        <clipPath id="clip2_377_38314">
          <rect x="360" y="6" width="12" height="12" rx="6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width="372"
      height="24"
      viewBox="0 0 372 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_457_16889)">
        <rect y="6" width="12" height="12" rx="6" fill="white" />
        <rect
          x="0.5"
          y="6.5"
          width="11"
          height="11"
          rx="5.5"
          stroke="#FFAF1D"
        />
      </g>
      <rect
        width="168"
        height="2"
        transform="matrix(1 0 0 -1 12 13)"
        fill="white"
      />
      <g clip-path="url(#clip1_457_16889)">
        <rect x="180" y="6" width="12" height="12" rx="6" fill="white" />
        <rect
          x="180.5"
          y="6.5"
          width="11"
          height="11"
          rx="5.5"
          stroke="#EAECF0"
        />
      </g>
      <rect
        width="168"
        height="2"
        transform="matrix(1 0 0 -1 192 13)"
        fill="white"
      />
      <g clip-path="url(#clip2_457_16889)">
        <rect x="360" y="6" width="12" height="12" rx="6" fill="white" />
        <rect
          x="360.5"
          y="6.5"
          width="11"
          height="11"
          rx="5.5"
          stroke="#EAECF0"
        />
      </g>
      <defs>
        <clipPath id="clip0_457_16889">
          <rect y="6" width="12" height="12" rx="6" fill="white" />
        </clipPath>
        <clipPath id="clip1_457_16889">
          <rect x="180" y="6" width="12" height="12" rx="6" fill="white" />
        </clipPath>
        <clipPath id="clip2_457_16889">
          <rect x="360" y="6" width="12" height="12" rx="6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ProgressBar;
