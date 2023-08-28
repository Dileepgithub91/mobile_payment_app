const express = require("express");
const router = express.Router();

// routes
const registrationRoute = require("./registration.route");
const publicRoute = require("./public.route");
const userRoute = require("./user.route");
const businessUserRoute = require("./business.user.route");
const placesNameRoute = require("./places.names.route");
const CardsRoute = require("./cards.route");
const ticketsRoute = require("./tickets.route");
const orderRoute = require("./order.route");
const walletRoute = require("./wallet.routes");
const providerRoute = require("./provider.route");
const marginRoute = require("./margin.route");
const taxSetting = require("./tax.setting.route");

const routesIndex = [
  {
    path: "/public",
    route: publicRoute,
  },
  {
    path: "/auth",
    route: registrationRoute,
  },
  {
    path: "/world",
    route: placesNameRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/business",
    route: businessUserRoute,
  },
  {
    path: "/ticket",
    route: ticketsRoute,
  },
  {
    path: "/cards",
    route: CardsRoute,
  },
  {
    path: "/wallet",
    route: walletRoute,
  },
  {
    path: "/orders",
    route: orderRoute,
  },
  {
    path: "/providers",
    route: providerRoute,
  },
  {
    path: "/margin",
    route: marginRoute,
  },
  {
    path: "/tax",
    route: taxSetting,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
