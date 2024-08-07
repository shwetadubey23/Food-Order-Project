const {foodCategory} = require('../models/foodCategory')

let data = 
    [
        {
            "CategoryName": "Biryani/Rice"
        },
        {
            "CategoryName": "Starter"
        },
        {
            "CategoryName": "Pizza"
        }
    ]
    
const food_Category = async () => {
    // const userNameLowerCase = "superAdmin".toLocaleLowerCase();
    
    try {
        
        let res = await foodCategory.insertMany(data);
        console.log("res ", res);
    } catch (error) {
        console.log(error);
    }
}
(async () => {
    await food_Category();
})();