import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TopBar.module.css';

const TopBar: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.topBar}>
            <p className={styles.text}>{t('dareToBeFinanciallyDifferent')}</p>
        </div>
    );
};

export default TopBar;