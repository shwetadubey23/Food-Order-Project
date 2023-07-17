const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');

const app = express();
app.use(express.json());
const port = 5000


mongoose.connect('mongodb+srv://Shwetadubey:QvtqJ8hdhmn0fhlT@cluster0.ymyddly.mongodb.net/OrderFood', 
{ useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected");
    const fetched_data = mongoose.connection.db.collection("food_items");
    const foodCategory = mongoose.connection.db.collection("foodCategory");

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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next()

});

app.use("/", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});