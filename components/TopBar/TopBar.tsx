import React from 'react';
import styles from './TopBar.module.css';

const TopBar: React.FC = () => {
    return (
        <div className={styles.topBar}>
            <p>Welcome to Loan Simulator</p>
        </div>
    );
};

export default TopBar;