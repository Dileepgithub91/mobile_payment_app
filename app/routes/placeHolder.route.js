const express = require('express');
const router = express.Router();
//const {getData,createData,updateData,deleteData} = require('../controllers/placeHolder.controller');
//const auth = require("../middleware/auth");
const { getData, createData, updateData, deleteData } = require('../controllers/placeHolder.controller');

router.get('/getUser/:id', getData);
// router.post('/createUser',auth("readOwn", "profile"),createData);
// router.put('/updateUser/:id',auth("readOwn", "profile"),updateData);
// router.delete('/deleteUser',auth("readOwn", "profile"), deleteData);

router.post('/createUser',createData);
router.put('/updateUser/:id',updateData);
router.delete('/deleteUser/:id',deleteData);

module.exports = router;



