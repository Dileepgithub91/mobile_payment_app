const express = require('express');
const router = express.Router();

// routes
const registerRoute = require('./register.route');
const publicRoute = require('./public.route');
const userRoute = require('./user.route');
const customerRoute = require('./customer.route');

const routesIndex = [
    {
        path:'/public',
        route: publicRoute,
    },
    {
        path:'/auth',
        route: registerRoute,
    },
    {
        path:'/user',
        route: userRoute,
    },
    {
        path:'/customer',
        route: customerRoute,
    }
] 

routesIndex.forEach((route)=>{
    router.use(route.path,route.route)
})



module.exports = router