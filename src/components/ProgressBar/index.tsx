import React from 'react';
import styles from './styles.module.scss';

type ProgressBarProps = {
    progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
    return (
        <div className={styles['progress-bar']}>
            <span style={{ width: `${progress}%` }}>{`${progress}%`}</span>
        </div>
    );
};

export default ProgressBar;
