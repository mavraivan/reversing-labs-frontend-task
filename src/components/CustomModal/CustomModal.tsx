import React from 'react';
import Modal from 'react-modal';
import clsx from 'clsx';
import styles from './styles.module.scss';
import formatBytes from '../../helpers/formatBytes';
import Button from '../Button';

type File = { size: number; description: string; name: string; hash: string };

type CustomModalProps = {
    modalIsOpen: boolean;
    closeModal: () => void;
    file: File;
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 15,
        border: 0,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    },
};

const CustomModal = ({ modalIsOpen, closeModal, file }: CustomModalProps) => {
    const { name, size, description, hash } = file as File;

    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="View file"
        >
            <div className={styles['custom-modal']}>
                <div className={styles['custom-modal__header']}>
                    <p>{name}</p>
                    <p>({formatBytes(size)})</p>
                </div>
                <div className={styles['custom-modal__content']}>
                    {description.length > 0 && (
                        <div className={styles['custom-modal__content-item']}>
                            <label>Description</label>
                            <p>{description}</p>
                        </div>
                    )}
                    <div
                        className={clsx(
                            styles['custom-modal__content-item'],
                            styles['custom-modal__content-item--green'],
                        )}
                    >
                        <label>HASH</label>
                        <p>{hash}</p>
                    </div>
                </div>
                <div className={styles['custom-modal__actions']}>
                    <Button onClick={closeModal} title="Select new file" />
                </div>
            </div>
        </Modal>
    );
};

export default CustomModal;
