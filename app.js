const generateUniqueId = require('generate-unique-id');
const express = require("express");
const app = express();
const db = require("./database/connection");
const validate= require("./controller/register");
const authenticate=  require("./controller/authenticate");
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const dotenv= require('dotenv');
const cookie= require('cookie-parser');
const cookieParser = require('cookie-parser');
const update = require('./controller/update');

app.use(express.json());
dotenv.config();
app.use(cookieParser());

app.get("/", async (req, resp) => {
  try {
    const data = await db();
    const [result, field] = await data.query("SELECT * FROM logindata");
    resp.json({
      data: result,
    });
  } catch (err) {
    console.log(err);
    resp.send("error");
  }
});

app.post("/data",validate ,async (req, resp) => {
  try {
    const data = await db();
    const value = req.body;
     const pass= await bcrypt.hash(value.password, 8);
    const id = generateUniqueId();
    const [result, fields] = await data.query(
      "INSERT INTO logindata (id, name, password) VALUES (?, ?, ?)",
      [id, value.name, pass]
    );
    resp.send('data addeed');
  } catch (err) {
    if (err) {
      console.log(err);
      resp.send(err);
    }
  }
});
app.post("/login", authenticate, async (req, resp) => {
  try {
      const username = req.body.name;
      const token = jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: '1h' });

      console.log(token);
      
      return resp.cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000 
      }).send("Login successful");
  } catch (err) {
      console.log(err);
      resp.status(500).send("Internal Server Error");
  }
});
app.post('/update',authenticate,update, async(req,resp)=>
{
    resp.send('password changed')
})
app.post('/logout',async(req,resp)=>
{
  const {status} = req.body;
  const val= 'logout'
 
  if(status === val )
  {
    resp.clearCookie('token');
  }

})

app.listen(4500);
