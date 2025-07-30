import { EncryptionAdapter } from "./encryption-adapter.interface";
import { hashSync, compareSync } from 'bcrypt';

export class EncryptionBcryptAdapter implements EncryptionAdapter {
    hash(value: string): string {
        return hashSync(value, 10);
    }

    compare(value: string, encrypted: string) {
        return compareSync(value, encrypted);
    }
}