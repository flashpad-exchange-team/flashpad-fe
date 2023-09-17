import { ReactNode } from 'react';
import {
  ControlProps,
  IndicatorSeparatorProps,
  IndicatorsContainerProps,
  default as SelectComponent,
  SingleValueProps,
} from 'react-select';

export interface SelectProps {
  options: any[];
  icon?: ReactNode;
  value?: any;
  disabled?: boolean;
  placeHolder?: string;
  onChange?: (value: any) => void;
}

const customStyles: any = {
  control: (provided: ControlProps) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    '&:focus': {
      boxShadow: 'none',
    },
    width: '100%',
    color: '#fff',
    '& input ': {
      display: 'none',
    },
    cursor: 'pointer',
  }),
  singleValue: (provided: IndicatorsContainerProps) => ({
    ...provided,
    color: 'white',
    fontSize: '14px',
    fontWeight: '600', // Set the text color to white
  }),
  dropdownIndicator: (provided: IndicatorsContainerProps) => ({
    ...provided,
    padding: 0,
    color: 'white',
    '&:hover': {
      svg: {
        fill: 'white', // Set the hover color of the icon
      },
    },
  }),
  indicatorSeparator: (provided: IndicatorSeparatorProps) => ({
    ...provided,
    display: 'none', // Hide the separator between the arrow icon and the value
  }),
  input: (provided: IndicatorSeparatorProps) => ({
    ...provided,
    display: 'none', // Hide the input element
  }),
};

const Select = ({
  options,
  icon,
  value,
  disabled,
  placeHolder,
  onChange,
}: SelectProps) => {
  const CustomSingleValue: React.FC<SingleValueProps> = ({ children }) => (
    <div className="flex items-center gap-2">
      {icon}
      {children}
    </div>
  );
  return (
    <div className="w-full">
      <SelectComponent
        options={options}
        styles={customStyles}
        // defaultValue={options?.length && options[0]}
        value={value}
        components={{ SingleValue: CustomSingleValue }}
        isSearchable={false}
        isDisabled={disabled}
        placeholder={placeHolder}
        onChange={onChange}
      />
    </div>
  );
};
export default Select;
