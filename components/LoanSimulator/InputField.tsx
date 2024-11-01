import React from 'react';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import styles from './LoanSimulator.module.css';

interface InputFieldProps {
    id: string;
    label: string;
    value: string;
    onValueChange: (values: NumberFormatValues) => void;
    placeholder?: string;
    thousandSeparator?: boolean;
    prefix?: string;
    suffix?: string;
    decimalScale?: number;
    fixedDecimalScale?: boolean;
    tooltip?: string;
    children?: React.ReactNode;
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
    tooltip,
    children
}) => {
    return (
        <div className={styles.inputField}>
            <label htmlFor={id} className={styles.label}>
                {label}
                {tooltip && <span className={styles.tooltip}>{tooltip}</span>}
            </label>
            <NumericFormat
                id={id}
                value={value}
                onValueChange={onValueChange}
                placeholder={placeholder}
                thousandSeparator={thousandSeparator}
                prefix={prefix}
                suffix={suffix}
                decimalScale={decimalScale}
                fixedDecimalScale={fixedDecimalScale}
                className={styles.input}
            />
            {children}
        </div>
    );
};

export default InputField;