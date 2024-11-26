const connection = require("../database/connection");
const bcrypt = require('bcrypt');

const authenticate = async (req, resp, next) => {
    const name = req.body.name;
    const pass = req.body.password;

    if (!name) {
        return resp.send('Please provide the username');
    }

    else if (!pass) {
        return resp.send('Please provide the password');
    }
    else {
        try {
          
            const data = await connection();
            const [result, field] = await data.query('SELECT password FROM logindata WHERE name = ?', [name]);

           
            if (result.length === 0) {
                return resp.send('Username not found');
            }

            const [{ password }] = result;

            
            const isMatch = await bcrypt.compare(pass, password);

      
            if (isMatch) {
               // return resp.send("Match successful");
                next();
          
            } else {
                return resp.send("Match not successful");
            }
        } catch (error) {
            
            console.error(error);
            return resp.status(500).send('Internal server error');
        }
    }

};

module.exports = authenticate;
