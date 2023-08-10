import { ReactNode } from 'react';
import { ControlProps, IndicatorSeparatorProps, IndicatorsContainerProps, default as SelectComponent, SingleValueProps } from 'react-select'

export interface SelectProps {
    options: any[]
    icon?: ReactNode
    disabled?: boolean
}

const customStyles: any = {
    control: (provided: ControlProps,) => ({
        ...provided,
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '&:focus': {
            boxShadow: 'none',
        },
        width: '130px',
        color: '#fff',
        '& input ': {
            display: 'none'
        }
    }),
    singleValue: (provided: IndicatorsContainerProps) => ({
        ...provided,
        color: 'white',
        fontSize: '14px',
        fontWeight: '600' // Set the text color to white
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


const Select = ({ options, icon, disabled }: SelectProps) => {
    const CustomSingleValue: React.FC<SingleValueProps> = ({ children }) => (
        <div className='flex items-center gap-2'>
            {icon}
            {children}
        </div>
    );
    return <SelectComponent options={options}
        styles={customStyles}
        defaultValue={options[0]}
        components={{ SingleValue: CustomSingleValue }}
        isSearchable={false}
        isDisabled={disabled}
    />
}

export default Select