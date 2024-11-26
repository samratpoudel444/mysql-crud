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

    }
    catch(err)
    {
        console.log(err);
    }

    // const verify= bcrypt.compare()
    // try{
    //     const data= await connection();
    //     const[result, field]= await data.query(`update logindata set password =? where name= ?`,[newpassword , name]);

    // }
    // catch(err)
    // {
    //     console.log(err);
    // }
}
module.exports= update;