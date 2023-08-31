import calculateHash from '../helpers/calculateHash';

onmessage = (e: MessageEvent) => {
    const file = e.data;
    calculateHash(file, postMessage);
};
