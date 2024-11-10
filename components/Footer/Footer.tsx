import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.footer}>
            <p>
                {t('contact')}: <a href="https://github.com/wguicha" target="_blank" rel="noopener noreferrer" className={styles.link}>wguicha</a> | {t('phone')}: +351 910 068 562
            </p>
        </div>
    );
};

export default Footer;