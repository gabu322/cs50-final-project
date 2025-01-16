'use client';

import { useState, useEffect, } from 'react';

const sizeConfig = {
   sm: {
      base: 'h-8 text-sm',
      inputMargin: 'm-1.5',
      labelSelected: '-top-1.5 text-xs',
      labelUnselected: 'top-1.5 text-sm',
      underText: 'bottom-[-15px] text-xs',
      underTextMargin: 'mb-3',
   },
   md: {
      base: 'h-10 text-base',
      inputMargin: 'm-2',
      labelSelected: '-top-2 text-xs',
      labelUnselected: 'top-2 text-base',
      underText: 'bottom-[-16px] text-xs',
      underTextMargin: 'mb-3.5',
   },
   lg: {
      base: 'h-12 text-xl',
      inputMargin: 'm-3',
      labelSelected: '-top-3 text-base',
      labelUnselected: 'top-2.5 text-xl pl-1',
      underText: 'bottom-[-19px] text-sm',
      underTextMargin: 'mb-4',
   },
   xl: {
      base: 'h-14 text-2xl',
      inputMargin: 'm-4',
      labelSelected: '-top-3.5 text-lg',
      labelUnselected: 'top-3.5 text-2xl pl-1',
      underText: 'bottom-[-22px] text-base',
      underTextMargin: 'mb-5',
   },
};

export default function Select({
   id,
   className = '',
   name,
   label,
   options,
   onChange,
   size = 'md',
   initialValue,
   searchable = true,
   showOptionValue = false,
   rounded,
   required,
   disabled,
}) {
   const [value, setValue] = useState('');
   const [isFocused, setIsFocused] = useState(false);
   const [infoColor, setInfoColor] = useState({ outline: '#d1d5db', text: '#9ca3af' });
   const sizes = sizeConfig[size];

   useEffect(() => {
      if (isFocused && infoColor.outline != '#fca5a5') setInfoColor({ outline: '#3b82f6', text: '#3b82f6' });
   }, [isFocused]);

   useEffect(() => {
      if (initialValue == '') {
         handleErase();
      } else if (initialValue) {
         const selectedOption = options.find((option) => option.value === initialValue);
         setValue(selectedOption ? selectedOption.text : '');
      }
   }, [initialValue]);

   const handleOptionClick = (option) => {
      if (option.disabled) return;

      handleInputChange({
         target: {
            id: option.value,
            option: true,
            value: option.text,
         },
      });

      setTimeout(() => setIsFocused(false), 0);
      setInfoColor({ outline: '#d1d5db', text: '#9ca3af' });
   };

   const handleInputChange = (e) => {
      setValue(e.target.value);

      if (onChange) {
         onChange({
            target: {
               name,
               value: e.target.option ? e.target.id : null,
            },
         });
      }
   };

   const handleErase = () => {
      setValue('');
      if (onChange) onChange({ target: { name, value: null } });
      setIsFocused(false);
   };

   return <div
      className={`relative outline outline-offset-[-1px] ${rounded ? "rounded-full" : "rounded"} ${className} ${sizes.base} ${isFocused ? 'outline-2' : 'outline-1'} hover:outline-2 ${disabled ? 'bg-gray-100' : 'bg-white'}`}
      onMouseLeave={() => {
         setIsFocused(false);
         setInfoColor({ outline: '#d1d5db', text: '#9ca3af' });
      }}
      onClick={() => setIsFocused(true)}
      style={{ outlineColor: infoColor.outline }}
   >
      <input
         id={id || name}
         name={name}
         className={`outline-none w-full ${sizes.inputMargin}`}
         type="text"
         value={value}
         onChange={handleInputChange}
         onInvalid={() => setInfoColor({ outline: '#fca5a5', text: '#f87171' })}
         autoComplete="off"
         disabled={disabled}
         required={required}
         readOnly={!searchable}
      />

      {label && <label
         htmlFor={id || name}
         className={`absolute transition-all rounded whitespace-nowrap font-medium left-2 z-2 ${isFocused || value
            ? `${sizes.labelSelected} px-1 cursor-default`
            : `${sizes.labelUnselected} cursor-text`
            } ${disabled ? 'bg-gray-200' : 'bg-white'}`}
         style={{ color: infoColor.text }}
      >
         {label}
         {required && '*'}
      </label>}

      {isFocused && <div
         className={`absolute top-full left-0 w-full bg-white border border-gray-300 max-h-60 overflow-y-auto transition-all z-10 ${rounded ? "rounded-2xl" : "rounded"} ${isFocused ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
         {options
            .filter((option) => option.text.toLowerCase().includes((value || '').toLowerCase()))
            .map((option) => <div
               key={option.value || option.text}
               className={`p-2 transition cursor-pointer ${option.disabled ? 'opacity-60 bg-gray-100' : 'hover:bg-gray-200'
                  }`}
               onClick={() => handleOptionClick(option)}
            >
               {showOptionValue && `${option.value} - `}
               {option.text}
            </div>
            )}
      </div>}

      {/* Clear Button */}
      <div className="absolute right-1 top-1 p-2 bg-white z-2 rounded-full" onClick={handleErase}>
         <svg
            className="w-4 h-4"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path d="M21 3L12 12L3 3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
               d="M3 21L12 12L21 21"
               stroke="black"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      </div>
   </div>;
}
