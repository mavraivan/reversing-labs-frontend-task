import formatBytes from './formatBytes';

describe('Test formatBytes method', () => {
    it('should return O Bytes', () => {
        expect(formatBytes(0)).toEqual('0 Bytes');
    });

    it('should return 10MB', () => {
        expect(formatBytes(1024 * 1024 * 10)).toEqual('10 MB');
    });

    it('should return 10GB', () => {
        expect(formatBytes(1024 * 1024 * 10000)).toEqual('10 GB');
    });

    it('should return with 2 decimals', () => {
        expect(formatBytes(1024 * 1024 * 100000, 2)).toEqual('97.66 GB');
    });

    it('should return with 0 decimals', () => {
        expect(formatBytes(1024 * 1024 * 10, -1)).toEqual('10 MB');
    });
});
