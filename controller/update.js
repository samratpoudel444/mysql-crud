const connection = require("../database/connection");
const bcrypt= require('bcrypt');

const update= async(req, resp, next)=>
{
    const name= req.body.name;
    const npassword= req.body.newpassword;
    const newpassword= await bcrypt.hash(npassword, 8);
    
    const data= await connection();
    try{
        const[result, field]= await data.query('UPDATE logindata SET password = ? WHERE name = ?' , [newpassword , name ]);
        console.log('password updated');
        next();
    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports= update;