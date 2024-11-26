const { createConnection } = require('mysql2/promise');



async function connection()
{
    return createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'project',
    })
}

module.exports= connection;