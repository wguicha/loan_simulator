import React from 'react';
import styles from './HeaderBar.module.css';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

interface HeaderBarProps {
    title: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.languageSwitcher}>
                <LanguageSwitcher />
            </div>
        </div>
    );
};

export default HeaderBar;