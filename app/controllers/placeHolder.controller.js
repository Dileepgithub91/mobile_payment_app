const axios = require("axios");
const Validator = require("../validations/placeHolder.validate");
//const { response } = require("../helpers");
//const {responseMessages,responseFlags} = require("../core/constants");
const catchAsyncError=require('../middleware/catch.async.error');
//const logger = require("../logger");
const ErrorHandler = require("../helpers/error.handler");
const client=require("../helpers/client");

//GET request

exports.getData = catchAsyncError(async (req, res, next)=> {
    const idVal = req.params.id;
let url = `https://jsonplaceholder.typicode.com/todos/${idVal}`;
        // const response = await client.get(url);
        // return true
        const response = await  client.get(url, {
            params: { id: idVal }
          });
      
          res.send(response.data);
        } )





// exports.getData = catchAsyncError(async (req, res, next)=> {
//   const idVal = req.params.id;
//   const getUrl = `https://jsonplaceholder.typicode.com/todos/${idVal}`;

  
//     const response = await axios.get(getUrl, {
//       params: { id: idVal }
//     });

//     res.send(response.data);
//   } )


// POST request

exports.createData = catchAsyncError(async (req, res, next) => {
    const idVal = req.params.id; 
    const postUrl = `https://jsonplaceholder.typicode.com/posts/${idVal}`;
  const postData = {
    id:1,
    userId: "001",
    title: 'Our Title Kumar',
    completed: true
  };
    const response = await axios.post(postUrl, postData);
    res.send(response.data);
   
 
});

// PUT request
exports.updateData = catchAsyncError(async (req, res, next) => {
  const idVal = req.params.id; 
  const putUrl = `https://jsonplaceholder.typicode.com/posts/${idVal}`;
  const putData = {
    id: 1,
    userId: "002",
    title: 'Our Title Dileep',
    completed: true
  };
    const response = await axios.put(putUrl, putData);
    res.send(response.data);
   
});

  

// DELETE request
exports.deleteData = catchAsyncError(async (req, res, next) => {
    const idVal = req.params.id;
  const deleteUrl =  `https://jsonplaceholder.typicode.com/posts/${idVal}`;
    const response = await axios.delete(deleteUrl);
    res.send("Data Deleted Successfully");
  
});





