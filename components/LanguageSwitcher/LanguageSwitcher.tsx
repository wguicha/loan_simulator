import React from 'react';
import styles from './languageSwitcher.module.css';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={styles.languageSwitcher}>
            <img
                src="/flags/us.png"
                alt="English"
                className={styles.flag}
                onClick={() => changeLanguage('en')}
            />
            <img
                src="/flags/es.png"
                alt="Español"
                className={styles.flag}
                onClick={() => changeLanguage('es')}
            />
            <img
                src="/flags/pt.png"
                alt="Portuguese"
                className={styles.flag}
                onClick={() => changeLanguage('pt')}
            />

        </div>
    )
};

export default LanguageSwitcher;
