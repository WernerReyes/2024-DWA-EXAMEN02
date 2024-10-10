export const SEED_DATA = {
    roles: [
        { id: 1, name: 'ADMIN' },
        { id: 2, name: 'USER' }
    ],
    users: []
    

}

const ramdomIndex = (max) => Math.floor(Math.random() * max);

const generateUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            firstname: `User ${i + 1}`,
            lastname: `Lastname ${i + 1}`,
            email: `user${i + 1}@gmail.com`,
            password: `password${i + 1}`,
            phone: `123456789${i + 1}`,
            dni: `12345678${i + 1}`,
            roleId: SEED_DATA.roles[ramdomIndex(SEED_DATA.roles.length)].id
        });
    }
    return users;
};

SEED_DATA.users = generateUsers(10);
