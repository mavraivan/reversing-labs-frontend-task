import CryptoJS from 'crypto-js';

const calculateHash = async (
    file: File,
    method: (arg: { progress: number; hash?: string }) => void,
) => {
    const CHUNK_SIZE = 1024 * 1024 * 10;
    const shaObj = CryptoJS.algo.SHA256.create();
    let offset = 0;

    while (offset < file.size) {
        const chunk = file.slice(offset, offset + CHUNK_SIZE);
        const chunkBuffer: ArrayBuffer = await chunk.arrayBuffer();
        const wordArray = CryptoJS.lib.WordArray.create(
            chunkBuffer as unknown as number[],
        );
        shaObj.update(wordArray);

        const progress = Math.round((offset / file.size) * 100);

        method({ progress });

        offset += CHUNK_SIZE;
    }

    const hash = shaObj.finalize();
    const hashString = hash.toString();

    method({ progress: 100, hash: hashString });

    return hashString;
};

export default calculateHash;
