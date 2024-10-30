import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './RateTypeSelector.module.css';

interface RateTypeSelectorProps {
    selectedRateType: string;
    onRateTypeChange: (rateType: string) => void;
}

const RateTypeSelector: React.FC<RateTypeSelectorProps> = ({ selectedRateType, onRateTypeChange }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.rateTypeSelector}>
            <label className={styles.radio}>
                <input
                    type="radio"
                    value="TEA"
                    checked={selectedRateType === 'TEA'}
                    onChange={(e) => onRateTypeChange(e.target.value)}
                />
                &nbsp;{t('TEA')}
            </label>
            <label className={styles.radio}>
                <input
                    type="radio"
                    value="TNA"
                    checked={selectedRateType === 'TNA'}
                    onChange={(e) => onRateTypeChange(e.target.value)}
                />
                &nbsp;{t('TNA')}
            </label>
            <label className={styles.radio}>
                <input
                    type="radio"
                    value="TM"
                    checked={selectedRateType === 'TM'}
                    onChange={(e) => onRateTypeChange(e.target.value)}
                />
                &nbsp;{t('TM')}
            </label>
        </div>
    );
};

export default RateTypeSelector;