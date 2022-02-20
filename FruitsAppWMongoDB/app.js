const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "There has to be a name for the fruit"]
  },
  rating: {
    type: Number,
    min: [1, "Rate between 1 and 10"],
    max: [10, "Rate between 1 and 10"]
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit ({
//   name: "Apple",
//   rating: 10,
//   review: "Nothing bad about Apple."
// });
//
// fruit.save();

// const kiwi = new Fruit( {
//   name: "Kiwi",
//   rating: 7,
//   review: "green fruit."
// })
//
// const orange = new Fruit({
//   name: "Orange",
//   rating: 6,
//   review: "Orange fruit."
// })
//
// const banana = new Fruit({
//   name: "Banana",
//   rating: 2,
//   review: "I don't like banana."
// })

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all fruits to fruitsDB");
//   }
// });
//
// Fruit.updateOne(({name: "Kiwi"}, {rating: 3}), function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated!");
//   }
// })
//
// setTimeout(function() {
//   Fruit.find(function(err, fruits){
//     if (err) {
//       console.log(err);
//     } else {
//       mongoose.connection.close();
//       for (const fruit of fruits) {
//         console.log(fruit.name + ", " + fruit.rating);
//       }
//     }
//   })
//
// }, 3000);


// mongoose.connect("mongodb://localhost:27017/peopleDB", {useNewUrlParser: true});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "There has to be a name for the person"]
  },
  age: Number,
  favoriteFruit: fruitSchema
});



const Person = mongoose.model("Person", personSchema);

// const apple = new Fruit({
//   name: "Apple",
//   rating: 10,
//   review: "Whatever"
// })
//
// apple.save();

const amy = new Person ({
  name: "Amy",
  age: 12,
  favoriteFruit: apple
});

amy.save()




// Fruit.remove( {} , function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted");
//   }
// });
