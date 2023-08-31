import React from 'react';
import styles from './styles.module.scss';

type ButtonProps = {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    title: string;
};

const Button = ({ onClick, title }: ButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {title}
        </button>
    );
};

export default Button;
