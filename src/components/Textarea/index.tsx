import React from 'react';
import styles from './styles.module.scss';

type TextareaProps = {
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    value: string;
    placeholder: string;
    maxlength?: number;
};

const Textarea = ({
    onChange,
    value,
    placeholder,
    maxlength = 50,
}: TextareaProps) => {
    return (
        <textarea
            className={styles.textarea}
            name="fileDescription"
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            maxLength={maxlength}
            rows={5}
        />
    );
};

export default Textarea;
