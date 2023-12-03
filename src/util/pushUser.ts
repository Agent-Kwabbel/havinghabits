import type {User} from '../model/user';
import * as fs from 'fs/promises';
import * as path from "path";

async function pushUser(user: User): Promise<boolean> {
    try {
        const filePath = path.join(__dirname, '../data/users.json');
        const rawData = fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(await rawData);

        data.push(user);

        await fs.writeFile('../data/users.json', JSON.stringify(data, null, 2), 'utf-8');

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export default pushUser
