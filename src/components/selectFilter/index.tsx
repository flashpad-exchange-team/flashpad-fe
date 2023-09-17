import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import React, { useState, useEffect, useRef } from 'react';

interface SelectFilterProps {
  options: any[];
  onSelectFilter?: (selectedOption: string) => void;
  placeHolder?: string;
  icon?: any;
  disabled?: boolean;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  options,
  placeHolder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSeclectedOption] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when a click occurs outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setSeclectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="custom-select relative" ref={selectRef}>
      <div
        className={`select-header flex justify-between ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        <div>{placeHolder ? placeHolder : 'Sort'}</div>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </div>
      {isOpen && (
        <ul className="select-options absolute t-[50px] text-[14px] bg-[#000]">
          {options.map((option) => (
            <li
              className={`cursor-pointer hover:text-[#E6B300] my-3 ${
                selectedOption === option.value ? 'text-[#E6B300]' : ''
              }`}
              key={option}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectFilter;
