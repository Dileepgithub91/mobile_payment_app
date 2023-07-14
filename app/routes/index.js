const express = require('express');
const router = express.Router();

// routes
const registerRoute = require('./register.route');
const userRoute = require('./user.route');

const routesIndex = [
    {
        path:'/auth',
        route: registerRoute,
    },
    {
        path:'/user',
        route: userRoute,
    }
] 

routesIndex.forEach((route)=>{
    router.use(route.path,route.route)
})



module.exports = router