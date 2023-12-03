import untypedUsers from '../data/users.json'
import type {User} from '../model/user';
import RegistrationStatus from "../model/registrationStatus";
import * as bcrypt from 'bcrypt'
import pushUser from './pushUser'

const SALT_ROUNDS = 10;
const users: User[] = untypedUsers

function isPasswordValid(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    return password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasDigit &&
        hasSpecialChar;
}

function isUsernameValid(username: string): boolean {
    const minLength = 3;
    const maxLength = 20;
    const allowedCharacters = /^[a-zA-Z0-9_-]+$/;

    return username.length >= minLength &&
        username.length <= maxLength &&
        allowedCharacters.test(username);
}

async function register(username: string, password: string): Promise<RegistrationStatus> {
    try {
        if (!isPasswordValid(password)) {
            return RegistrationStatus.InvalidPassword;
        } else if (!isUsernameValid(username)) {
            return RegistrationStatus.InvalidUsername;
        }

        for (const user of users) {
            if (user.username.toLowerCase() === username.toLowerCase()) {
                return RegistrationStatus.UsernameExists;
            }
        }


        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user: User = {
            username: username,
            passwordHash: hashedPassword,
            salt: salt,
            encryptedEncryptionKey: null
        };

        if (await pushUser(user)) {
            return RegistrationStatus.Success;
        } else {
            return RegistrationStatus.UserNotCreated;
        }
    } catch (e) {
        console.error(e)
        return RegistrationStatus.OtherError
    }
}

export default register