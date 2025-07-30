export interface EncryptionAdapter {
    hash(value: string): string;

    compare(value: string, encrypted: string): boolean;
}