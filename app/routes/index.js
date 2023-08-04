const express = require('express');
const router = express.Router();

// routes
const registrationRoute = require('./registration.route');
const publicRoute = require('./public.route');
const userRoute = require('./user.route');
const businessUserRoute = require('./business.user.route');
const placesNameRoute = require('./places.names.route');
const CardsRoute = require('./cards.route');
const ticketsRoute = require('./tickets.route');

const routesIndex = [
    {
        path:'/public',
        route: publicRoute,
    },
    {
        path:'/auth',
        route: registrationRoute,
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
        route: ticketsRoute,
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