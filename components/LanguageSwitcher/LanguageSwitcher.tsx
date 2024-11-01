import React from 'react';
import Image from 'next/image';
import styles from './languageSwitcher.module.css';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const currentLanguage = i18n.language;

    return (
        <div className={styles.languageSwitcher}>
            <Image
                src="/flags/us.png"
                alt="English"
                width={24}
                height={24}
                className={`${styles.flag} ${currentLanguage === 'en' ? styles.selected : ''}`}
                onClick={() => changeLanguage('en')}
            />
            <Image
                src="/flags/es.png"
                alt="Español"
                width={24}
                height={24}
                className={`${styles.flag} ${currentLanguage === 'es' ? styles.selected : ''}`}
                onClick={() => changeLanguage('es')}
            />
            <Image
                src="/flags/pt.png"
                alt="Portuguese"
                width={24}
                height={24}
                className={`${styles.flag} ${currentLanguage === 'pt' ? styles.selected : ''}`}
                onClick={() => changeLanguage('pt')}
            />
        </div>
    );
};

export default LanguageSwitcher;