import { TInputValue } from '@ts/common';
import React, { useRef } from 'react';
import Select, { OptionTypeBase } from 'react-select';
import { colors } from 'styles/baseStyles';

type TProp = {
  placeholder?: string;
  isDisabled?: boolean;
  onChange: (selected: OptionTypeBase) => void;
  options: OptionTypeBase[];
  selectedValue: TInputValue;
};

const SelectBox = ({ isDisabled = false, onChange, options, placeholder = '', selectedValue }: TProp): JSX.Element => {
  const ref = useRef();
  return (
    <Select
      isDisabled={isDisabled}
      placeholder={placeholder}
      isSearchable={false}
      styles={{
        control: styles => {
          return {
            ...styles,
            border: 'none',
            boxShadow: 'none',
            width: 'auto',
            display: 'flex',
            cursor: 'pointer',
            background: 'transparent',
          };
        },
        indicatorSeparator: styles => ({
          ...styles,
          display: 'none',
        }),
        valueContainer: styles => ({
          ...styles,
          display: 'flex',
          justifyContent: 'center',
          position: 'static',
          alignItems: 'center',
          lineHeight: 'auto',
          width: '20px',
          padding: '0',
          margin: '0',
          marginRight: '4px',
          flex: 'none',
        }),
        singleValue: styles => ({
          ...styles,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0',
          padding: '0',
          color: `${colors.white}`,
          fontWeight: 'normal',
        }),
        dropdownIndicator: (styles, state) => ({
          ...styles,
          transition: 'all .2s ease',
          padding: '0',
          margin: '0',
          transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          color: `${colors.grayDark}`,
          ':hover': {
            ...styles[':hover'],
            color: `${colors.grayDark}`,
          },
        }),
        menuList: styles => ({
          ...styles,
          margin: '0',
          padding: '0',
        }),
        menu: styles => ({
          ...styles,
          marginTop: '2px',
          padding: '0',
        }),
        option: (styles, state) => {
          return {
            ...styles,
            backgroundColor: 'transparent',
            color: state.isDisabled ? '#ebecf0' : `${colors.black}`,
            pointerEvents: state.isDisabled ? 'none' : 'auto',
            textAlign: 'center',
            cursor: 'pointer',
            ':hover': {
              ...styles[':hover'],
              background: `${colors.black}`,
              color: `${colors.white}`,
              borderRadius: '0',
            },
            ':active': {
              ...styles[':active'],
              background: `${colors.black}`,
              borderRadius: '0',
            },
            ':first-of-type:hover': {
              ...styles[':hover'],
              borderRadius: '3px 3px 0 0',
            },
            ':first-of-type:active': {
              ...styles[':active'],
              borderRadius: '3px 3px 0 0',
            },
            ':last-of-type:hover': {
              ...styles[':hover'],
              borderRadius: '0 0 3px 3px',
            },
            ':last-of-type:active': {
              ...styles[':active'],
              borderRadius: '0 0 3px 3px',
            },
          };
        },
      }}
      value={options.find(option => `${option.value}` === `${selectedValue}`) || options[0]}
      onChange={val => onChange(val)}
      options={options}
      id={`${ref}`}
      instanceId={`${ref}`}
      inputId={`${ref}`}
    />
  );
};

export default SelectBox;
