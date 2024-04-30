const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const userModel = require("./usermodel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("create");
});


app.get("/about", (req, res) => {
  res.render("index");
});



app.get("/profile/:username", (req, res) => {
  let val = Math.random();
  res.send(`hello ${req.params.username} \n and your like is ${val}`);
});

app.get("/task", (req, res) => {
  res.render("task");
});

//creat a route which create a file which stote in files folder
app.post("/create", (req, res) => {
    const title = req.body.input1.trim().replace(/\s+/g, '_'); // Remove spaces from title and replace them with underscores
    const description = req.body.task_area;

    try {
        fs.writeFileSync(`./files/${title}.txt`, description);
        console.log("File created successfully");
    } catch (err) {
        console.error("Error creating file:", err);
        return res.status(500).send("Error creating file");
    }
    res.send("Data received successfully");
});

//crud operation 
app.post('/make', async (req,res)=>{
   let user = await userModel.create({
    name : req.body.name,
    username : req.body.username,
    email : req.body.email
   })
  // res.send(user);
   res.send(user);
})
app.get('/read', async (req,res)=>{
  
  let allUser = await userModel.find({name : "vishal"});
  res.send(allUser);
})
app.get('/update',async (req,res)=>{
    let updatedUser = await userModel.findOneAndUpdate({email : "harshv2806@gmail.com"} ,{username : "harshNaidu_2806"} ,{new : true});
    res.send(updatedUser);
})
app.get('/delete',async (req,res)=>{
  let deleteUser = await userModel.findOneAndDelete({name : "bobo"});
  res.send(deleteUser);
})

app.listen(4000, () => {
  console.log(`app is running on ${4000}`);
});
