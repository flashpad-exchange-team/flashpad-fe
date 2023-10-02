import { Tooltip } from 'react-tooltip';

const AddToPositionIcon = ({ onClick, message }: any) => {
  return (
    <div data-tooltip-id="my-tooltip" data-tooltip-content={message || null}>
      <svg
        onClick={onClick}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 17.5H17.5M10 2.5V14.1667M10 14.1667L15.8333 8.33333M10 14.1667L4.16667 8.33333"
          stroke="#FFAF1D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default AddToPositionIcon;
