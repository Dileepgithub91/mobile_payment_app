const AccessControl = require('accesscontrol');


const allRights = {
    'create:any': ['*'],
    'read:any': ['*'],
    'update:any': ['*'],
    'delete:any': ['*']
}

let grantsObject = {
    admin:{
        // test:allRights,
        profile: allRights,
        Gift:allRights
    },
    user:{
        profile:{
            'read:own':['*','!password','!_id'],
            'update:own':['*','!password','!_id']
        },
        Gift:{
            'read:any':['*'],
        }
    }
}

const roles = new AccessControl(grantsObject);

module.exports = { roles }