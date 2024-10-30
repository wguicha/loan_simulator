import React from 'react';
import { NumericFormat } from 'react-number-format';
import styles from './LoanSimulator.module.css';

interface InputFieldProps {

    id: string;

    label: string;

    value: string;

    onValueChange: (values: any) => void;

    placeholder: string;

    decimalScale?: number;

    suffix?: string;

    prefix?: string;

    fixedDecimalScale?: boolean;

    tooltip?: string;

    thousandSeparator?: boolean;

    children?: React.ReactNode; // Add this line to include children property

}
const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    value,
    onValueChange,
    placeholder = '',
    thousandSeparator = false,
    prefix = '',
    suffix = '',
    decimalScale,
    fixedDecimalScale = false,
    tooltip = '' // Nueva propiedad para el texto explicativo
}) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id} className={styles.label}>
                {label}
                {tooltip && <span className={styles.tooltip}>{tooltip}</span>}
            </label>
            <NumericFormat
                id={id}
                value={value}
                onValueChange={onValueChange}
                className={styles.input}
                placeholder={placeholder}
                thousandSeparator={thousandSeparator}
                prefix={prefix}
                suffix={suffix}
                decimalScale={decimalScale}
                fixedDecimalScale={fixedDecimalScale}
            />
        </div>
    );
};

export default InputField;