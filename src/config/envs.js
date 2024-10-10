import 'dotenv/config';
import env from 'env-var';

export class Envs {
    static PORT = env.get('PORT').required().asPortNumber();
    static MYSQL_HOST = env.get('MYSQL_HOST').required().asString();
    static MYSQL_USERNAME = env.get('MYSQL_USERNAME').required().asString();
    static MYSQL_PASSWORD = env.get('MYSQL_PASSWORD').required().asString();
    static MYSQL_DATABASE = env.get('MYSQL_DATABASE').required().asString();
}