const db = require("../models");

//Create Main Model
const Counteries = db.Country;
const States = db.State;
const Cities = db.City;

const getCounteries = async () => {
  try {
    let counteries = await Counteries.findAll({
        attributes:['id','name', 'iso3','numeric_code','iso2','phonecode']
    });
    return counteries;
  } catch (error) {
    throw error;
  }
};
const getStates= async (counteryId) => {
  try {
    let states = await States.findAll({
        where:{
            country_id:parseInt(counteryId)
        },
        attributes:['id','name', 'country_id','country_code','iso2',]
    });
    return states;
  } catch (error) {
    throw error;
  }
};
const getCities= async (counteryId,stateId) => {
  try {
    let cities = await Cities.findAll({
        where:{
            country_id:parseInt(counteryId),
            state_id:parseInt(stateId)
        },
        attributes:['id','name', 'state_id','state_code','country_id','country_code']
    });
    return cities;
  } catch (error) {
    throw error;
  }
};


module.exports = {
    getCounteries,
    getStates,
    getCities
}