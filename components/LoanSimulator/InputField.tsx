import React from 'react';
import { NumericFormat } from 'react-number-format';
import styles from './LoanSimulator.module.css';

interface InputFieldProps {
    id: string;
    label: string;
    value: string;
    onValueChange: (values: any) => void;
    placeholder?: string;
    thousandSeparator?: boolean;
    prefix?: string;
    suffix?: string;
    decimalScale?: number;
    fixedDecimalScale?: boolean;
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
    fixedDecimalScale = false
}) => {
    return (
        <div>
            <label htmlFor={id} className={styles.label}>{label}:</label>
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