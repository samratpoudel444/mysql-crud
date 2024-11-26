
const validate= (req, resp, next)=>
 {
     const regex= '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;'
//     const password= req.body.password;
const username= req.body.name;
const password= req.body.password;
    if(!username)
    {  
        console.log('please enter the valid username');
        resp.send('please enter the valid username');
    }
    else if(username)
    {   try{
        regex.match(username);
    }
        catch(err)
        {
        console.log('please enter the valid username');
        resp.send('please enter the valid username');
        }
    }
    else if(!password)
    {
        console.log('please enter your password');
        resp.send('please enter the password');
    }
    
    
    next();
}
module.exports= validate