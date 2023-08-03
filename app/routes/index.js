const express = require('express');
const router = express.Router();

// routes
const registerRoute = require('./register.route');
const publicRoute = require('./public.route');
const userRoute = require('./user.route');
const businessUserRoute = require('./business.user.route');
const placesNameRoute = require('./places.names.route');
const CardsRoute = require('./cards.route');
const ticketRoute = require('./ticket.management.route');

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
        path:'/world',
        route: placesNameRoute,
    },
    {
        path:'/user',
        route: userRoute,
    },
    {
        path:'/business',
        route: businessUserRoute,
    },
    {
        path:'/ticket',
        route: ticketRoute,
    },
    {
        path:'/cards',
        route: CardsRoute,
    }
] 

routesIndex.forEach((route)=>{
    router.use(route.path,route.route)
})



module.exports = router