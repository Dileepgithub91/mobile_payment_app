const express = require('express');
const router = express.Router();

// routes
const registerRoute = require('./register.route');
const publicRoute = require('./public.route');
const userRoute = require('./user.route');
const customerRoute = require('./customer.route');
const pinePerksRoute = require('./giftcard.pineperks.route');
const qwikcilverRoute = require('./giftcard.qwikcilver.route');
const worldRoute = require('./world.route');
const giftCardsRoute = require('./gift.cards.route');
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
        route: worldRoute,
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
        path:'/ticket',
        route: ticketRoute,
    },
    {
        path:'/giftcards',
        route: giftCardsRoute,
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