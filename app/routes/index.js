const express = require('express');
const router = express.Router();

// routes
const registerRoute = require('./register.route');
const publicRoute = require('./public.route');
const userRoute = require('./user.route');
const customerRoute = require('./customer.route');
const pinePerksRoute = require('./giftcard.pineperks.route');
const qwikcilverRoute = require('./giftcard.qwikcilver.route');

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
    },
    {
        path:'/pineperks',
        route: pinePerksRoute,
    },
    {
        path:'/qwikcilver',
        route: qwikcilverRoute,
    }
] 

routesIndex.forEach((route)=>{
    router.use(route.path,route.route)
})



module.exports = router