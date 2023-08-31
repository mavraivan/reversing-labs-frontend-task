import React from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './styles.module.scss';

type FileUploaderProps = {
    onDrop: (acceptedFiles: File[]) => Promise<void>;
};

const maxSize = 1024 * 1024 * 10000; //10GB

const FileUploader = ({ onDrop }: FileUploaderProps) => {
    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        multiple: false,
        maxSize,
    });

    const errorMessages =
        fileRejections.length > 0 &&
        fileRejections[0].errors.map((e) => (
            <div key={e.code} className={styles['file-uploader__error']}>
                {e.message}
            </div>
        ));

    return (
        <div className={styles['file-uploader__wrapper']}>
            <div className={styles['file-uploader']}>
                <div
                    {...getRootProps()}
                    className={styles['file-uploader__action']}
                >
                    <input {...getInputProps()} />
                    <p className={styles['file-uploader__text']}>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                </div>
            </div>
            {fileRejections.length > 0 && (
                <div className={styles['file-uploader__errors']}>
                    {errorMessages}
                </div>
            )}
        </div>
    );
};

export default FileUploader;
