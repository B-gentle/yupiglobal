const bcrypt = require("bcryptjs");

const users = [
    {
        name: 'Admin User',
        email: 'beetech@nrilimited.com',
        password: bcrypt.hashSync('123456', 10,),
        isAdmin: true
    },
    {
        name: 'Ogaga',
        email: 'info@gviherbal.com',
        password: bcrypt.hashSync('123456', 10,),
        isAdmin: true
    },
    {
        name: 'hymes',
        email: 'info@airenherbals.com',
        password: bcrypt.hashSync('123456', 10,),
        isAdmin: false  
    }
]

module.exports = users