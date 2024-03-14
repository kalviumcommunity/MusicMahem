const express = require("express")

const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const music = require("../model/Music.model")

getRouter.use(express.json());
postRouter.use(express.json());
putRouter.use(express.json());
deleteRouter.use(express.json());

getRouter.get('/getallusers', async (req, res) => {
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

getRouter.get('/getuser/:id', async (req, res) => {
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


postRouter.post('/adduser', async (req, res) => {
    try {
        const { ID,Singer,Song,Language,Created_By } = req.body;
        const newUser = await music.create({ ID,Singer,Song,Language,Created_By });
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});


putRouter.patch('/updateuser/:ID', async (req, res) => {
    try {
        const userId = req.params.ID;
        const { ID,Singer,Song,Language,Created_By } = req.body;

        const existingUser = await music.findOne({ID: userId });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await music.findOneAndUpdate(
            { ID: userId },
            { $set: { ID,Singer,Song,Language,Created_By } },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});



deleteRouter.delete('/deleteuser/:ID', async (req, res) => {
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