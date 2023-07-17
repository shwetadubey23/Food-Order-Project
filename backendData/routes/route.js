const express = require('express');
const { createValidation, loginValidation, updateValidation } = require('../midllewaer/validation');
const { createUser, login } = require('../controller/userController')
const router = express.Router()


router.post('/user', createValidation, createUser);

router.post('/login', loginValidation, login);

router.post('/foodData', (req, res) => {
    try {
        // console.log(global.food_items);
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
});


module.exports = router