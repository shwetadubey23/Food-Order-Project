const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
const cors = require('cors')

const app = express();
app.use(express.json());
const port = 5000

// CORS configuration
const corsOptions = {
  origin: 'https://food-order-project-navy.vercel.app:5000', // Update with your frontend domain
  // origin: 'http://localhost:5000', // Update with your frontend domain
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Use cors with options


mongoose.connect('mongodb+srv://shwetadubey:QvtqJ8hdhmn0fhlT@cluster0.hp6py6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/OrderFood', 
{ useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected");
    const fetched_data = mongoose.connection.db.collection("food_items");
    const foodCategory = mongoose.connection.db.collection("foodCategory");
// console.log('fetched_data', fetched_data);
// console.log('foodCategory', foodCategory);

    return Promise.all([
      fetched_data.find({}).toArray(),
      foodCategory.find({}).toArray()
    ]);
  })
  .then(([data, categoryData]) => {
    global.food_items = data;
    global.foodCategory = categoryData;
    // console.log(data);
    // console.log(categoryData);
  })
  .catch((error) => {
    console.log(error);
  });



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://food-order-project-navy.vercel.app/");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

app.use("/api", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
