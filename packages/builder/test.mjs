import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

console.log(fs.existsSync(path.resolve(process.cwd(), '.env')));

const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), '.env')));
console.log(env);
console.log(process.env);
