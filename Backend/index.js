const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const HOST = "192.168.54.63";
const { ConnectMongoDB } = require("./connection");
const { CheckforAuthCookie } = require("./middlewares/auth");
const router = require("./routes/user");
const itemRouter = require("./routes/items");
// const MapRouter = require("./routes/map");

app.listen(PORT, () => console.log(`Server Running on PORT:${PORT}`));
ConnectMongoDB("mongodb+srv://gurnoor8520:teradaddy420@cluster0.sffmssb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/foodie/")
  .then(() => console.log("MongoDB Connected Successfully."))
  .catch((err) => console.log("Error Connecting MongoDB", err));


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(CheckforAuthCookie("token"));
app.use(express.json());
app.use(cors());

// app.use("/api/geocode/",MapRouter)
app.use("/api/add-new/",itemRouter)
app.use("/api", router);
app.get("/test",(req,res)=>{
  return res.send("testing");
})