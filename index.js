import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import mysql from "mysql";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_node",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});


const verifyUsername = (req, res, next)=>{
  const token = req.cookies.token;
  if(!token){
    return res.json({ Error: "Your not authenticated" });
  }else{
    jwt.verify(token, "jwt-secret-key", (err, decode)=>{
      if(err) {
        return res.json({Error: "not set token"})
      }else{
        req.name = decode.name;
        next()
      }
    })
  }
}
// get data
app.get('/',verifyUsername, (req, res)=>{
  return res.json({Status: "Success", name: req.name})
})




// hash
const salt = 10;
async function passwordHash(password2) {
  const hash = await bcrypt.hash(password2.toString(), salt);
  return hash;
}
async function comparePass(Userpass, Haspass) {
  const compare = await bcrypt.compare(Userpass.toString(), Haspass);
  return compare;
}


// register
app.post("/register", async (req, res) => {
  try {
    const { name, age, username, password } = req.body;
    const sql ="INSERT INTO user (`name`, `age`, `username`, `password`) VALUES (?,?,?,?)";
    const hash = await passwordHash(password);
    db.query(sql, [name, age, username, hash], (err, data) => {
      if (err) return res.json({ Error: "Failed Insert" });
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    return res.json(error);
  }
});


// login
app.post("/login", async (req, res) => {
  try {
    const {username, password } = req.body;
    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, [username], async (err, data) => {
      if (err) throw err;

      if (data.length > 0) {
        const passwordMatch = await comparePass(password, data[0].password );
        if (passwordMatch) {
          const name = data[0].name;
          const token = jwt.sign({ name }, "jwt-secret-key", {expiresIn: "1d"});
          res.cookie("token", token);
          return res.json({ Status: "Success" });
        } else {
          return res.json({ Error: "Password not matched" });
        }
      } else {
        return res.json({ Error: "No user exists" });
      }
    });
  } catch (error) {
    return res.json({ Error: "Login error in server" });
  }
});




// lgoout
app.get('/logout', (req, res) =>{
  res.clearCookie('token');
  return res.json({Status: "Sucess"})
})





// check toekn
const protectRoute = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.get('/check', protectRoute, (req, res) => {
  res.json({ message: 'Welcome to the dashboard' });
});

app.listen(port, () => {
  console.log(`Listening port ${port}`);
});
