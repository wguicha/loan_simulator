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
    tooltip?: string;
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
    tooltip = '',
    children
}) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id} className={styles.label}>
                {label}
                {tooltip && <span className={styles.tooltip}>{tooltip}</span>}
            </label>
            {children} {/* Render children here */}
            <div className={styles.inputWithChildren}>
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
        </div>
    );
};

export default InputField;