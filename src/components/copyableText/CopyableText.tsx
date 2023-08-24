import CopyIcon from '@/icons/CopyIcon';
import TickIcon from '@/icons/TickICon';
import { useEffect, useState } from 'react';
import customToast from '../notification/customToast';

export interface CopyableTextProps {
  text: string;
}
const CopyableText = ({ text }: CopyableTextProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500); // Reset the copied state after 1.5 seconds
  };
  useEffect(() => {
    if (isCopied)
      customToast({
        message: 'Copied ',
        type: 'success',
      });
  }, [isCopied]);
  return (
    <div className="flex gap-2">
      <span>{text}</span>
      <button onClick={handleCopyClick}>
        {isCopied ? <TickIcon /> : <CopyIcon />}
      </button>
    </div>
  );
};

export default CopyableText;
