interface User {
    username: string
    passwordHash: string
    salt: string
    encryptedEncryptionKey: string | null
}

export type { User };