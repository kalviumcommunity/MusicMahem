const express = require("express")
const joi=require('joi')
const jwt=require('jsonwebtoken')
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const music = require("../model/Music.model")

getRouter.use(express.json());
postRouter.use(express.json());
putRouter.use(express.json());
deleteRouter.use(express.json());

const schema = joi.object({
    ID:joi.number().required(),
    Singer:joi.string().required(),
    Song:joi.string().required(),
    Language:joi.string().required(),
    Created_By:joi.string()
})

const authenticateToken = (req, res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
      if(err) return res.sendStatus(403)
      next()
    })
  }

getRouter.get('/getallusers',authenticateToken, async (req, res) => {
    try {
        const users = await music.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

getRouter.get('/getuser/:id',authenticateToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await music.findById(userId);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});


postRouter.post('/adduser',authenticateToken, async (req, res) => {
    const {error,value}=schema.validate(req.body,{abortEarly:false})
    try {
        if(!error){
        const { ID,Singer,Song,Language,Created_By } = req.body;
        const newUser = await music.create({ ID,Singer,Song,Language,Created_By });
        res.status(201).json(newUser);
    } else{
        return(res.status(400).send({message:`Bad request,error:${error}`}))
    }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

putRouter.patch('/updateuser/:id',authenticateToken, async (req, res) => {
    const {error,value}=schema.validate(req.body,{abortEarly:false})
    try {
        if(!error){
        const {id} = req.params;
        const filter ={"ID":id}
        let { ID,Singer,Song,Language,Created_By } = req.body;
        const details = await music.findOneAndUpdate(filter,{ ID,Singer,Song,Language,Created_By });
        res.status(200).json(details);
        }else{
            return(res.status(400).send({message:`error:${error}`}))
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
});

deleteRouter.delete('/deleteuser/:ID',authenticateToken, async (req, res) => {
    try {
        const userId = req.params.ID;
        const deletedUser = await music.findOneAndDelete({ID:userId});
        res.status(200).json("deleted user");
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

module.exports = {getRouter, postRouter, deleteRouter, putRouter};