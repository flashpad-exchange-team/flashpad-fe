interface AnalyticsIconProps {
  active?: boolean;
}
const AnalyticsIcon = ({ active }: AnalyticsIconProps) => {
  return active ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.76121C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7363 6.95991 21.2388 8.17317C21.7413 9.38643 22 10.6868 22 12M12 2V12M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5229 22 12M12 2C17.5228 2 22 6.47716 22 12M22 12L12 12M22 12C22 13.5781 21.6265 15.1338 20.9101 16.5399C20.1936 17.946 19.1546 19.1626 17.8779 20.0902L12 12"
        stroke="#FFAF1D"
        strokeWidth="2"
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
        d="M12.8789 2C14.1921 2 15.4925 2.25866 16.7057 2.76121C17.919 3.26375 19.0214 4.00035 19.95 4.92893C20.8786 5.85752 21.6152 6.95991 22.1177 8.17317C22.6203 9.38643 22.8789 10.6868 22.8789 12M12.8789 2V12M12.8789 2C7.35606 2 2.87891 6.47715 2.87891 12C2.87891 17.5228 7.35606 22 12.8789 22C18.4018 22 22.8789 17.5229 22.8789 12M12.8789 2C18.4018 2 22.8789 6.47716 22.8789 12M22.8789 12L12.8789 12M22.8789 12C22.8789 13.5781 22.5054 15.1338 21.789 16.5399C21.0725 17.946 20.0335 19.1626 18.7568 20.0902L12.8789 12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AnalyticsIcon;