import React, { useCallback, useEffect, useState, useRef } from 'react';
import styles from './styles.module.scss';
import calculateHash from '../../helpers/calculateHash';
import CustomModal from '../../components/CustomModal/CustomModal';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import FileUploader from '../../components/FileUploader';
import ProgressBar from '../../components/ProgressBar';

const defaultFileObj = {
    size: 0,
    description: '',
    name: '',
    hash: '',
};

type FileDetails = {
    size: number;
    description: string;
    name: string;
    hash: string;
};

const MainScreen = () => {
    const workerRef = useRef<Worker>();
    const [progress, setProgress] = useState<number>(0);
    const [fileDescription, setFileDescription] = useState<string>('');
    const [hashString, setHashString] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [fileDetails, setFileDetails] = useState<FileDetails>(defaultFileObj);

    useEffect(() => {
        if (workerRef && hashString.length > 0) {
            workerRef.current?.terminate();
        }
    }, [hashString]);

    const initWorker = (file: File) => {
        workerRef.current = new Worker(
            new URL('../../workers/worker.ts', import.meta.url),
        );
        workerRef.current.onmessage = (e: MessageEvent) => {
            const data = e.data;
            const { progress, hash } = data;

            setProgress(progress);

            if (progress === 100 && !!workerRef.current && !!hash) {
                setHashString(hash);
            }
        };
        workerRef.current.postMessage(file);
    };

    const calculateProgress = (arg: { progress: number }) => {
        setProgress(arg.progress);
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length < 1) return;

        const file: File = acceptedFiles[0];
        const { size, name } = file;

        setFileDetails({ ...fileDetails, size, name } as FileDetails);

        if (!!window.Worker) {
            initWorker(file);
        } else {
            const hash = await calculateHash(file, calculateProgress);
            setHashString(hash);
        }
    }, []);

    const finishCalculation = () => {
        setFileDetails({
            ...fileDetails,
            description: fileDescription,
            hash: hashString,
        } as FileDetails);
        setShowModal(true);
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFileDescription(e.target.value);
    };

    const closeModal = () => {
        setProgress(0);
        setHashString('');
        setFileDescription('');
        setFileDetails(defaultFileObj);
        setShowModal(false);
    };

    return (
        <div className={styles.main}>
            <div className={styles['main__wrapper']}>
                <FileUploader onDrop={onDrop} />
                <div className={styles['main__form']}>
                    <Textarea
                        onChange={onDescriptionChange}
                        value={fileDescription}
                        placeholder="File Description (Max. length - 500 characters)"
                        maxlength={500}
                    />
                </div>
                <div className={styles['main__actions']}>
                    {progress > 0 && progress < 100 && (
                        <ProgressBar progress={progress} />
                    )}
                    {progress === 100 && (
                        <Button onClick={finishCalculation} title="Show hash" />
                    )}
                </div>
            </div>
            <CustomModal
                modalIsOpen={showModal}
                closeModal={closeModal}
                file={fileDetails}
            />
        </div>
    );
};

export default MainScreen;
