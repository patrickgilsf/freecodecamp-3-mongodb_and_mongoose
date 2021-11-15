require("dotenv").config();

//"Install and Set Up Mongoose"
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

//"Create a Model"
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: { type: [String] }
});

let Person = mongoose.model("Person", personSchema);

//"Create and Save a Record of a Model"
const createAndSavePerson = done => {
    var vincentVega = new Person({name: "Vincent Vega", age: 39, favoriteFoods: ["Ham Sandwich", "Cocaine"]});
  
    vincentVega.save((err, data) => {
      if (err) return console.error(err);
      done(null, data)
    });
};

//"Create Many Records with model.create()"
var arrayOfPeople = [
  {name: "Tucan Sam", age: 46, favoriteFoods: ["Fruit Loops"]},
  {name: "Pepe LePiuex", age: 44, favoriteFoods: ["Honey"]},
  {name: "Will Smith", age: 51, favoriteFoods: ["Lasagna"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, People) => {
    if (err) return console.log(err);
    done(null, People);
  });
};

//"Use model.find() to Search Your Database"
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

//"Use model.findOne() to Return a Single Matching Document from Your Database"
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound) => {
    if (err) return console.log(err);
    done(null, foodFound);
  });
};

//"Use model.findById() to Search Your Database By _id"
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

//"Perform Classic Updates by Running Find, Edit, then Save"
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    if (err) return console.log(err);
    data.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

//"Perform New Updates on a Document Using model.findOneAndUpdate()"
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOne({name: personName}, (err, person) => {
    person.age = 20;
    if (err) return console.log(err);
    done(null, person);
  });
};
//The answer did this one slightly differently, [looks like I didn't use the function they wanted]:
/*
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};
*/

//"Delete One Document Using model.findByIdAndRemove"
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

//"Delete Many Documents with model.remove()"
const removeManyPeople = done => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedPerson) => {
    if (err) return console.log(err);
    done(null, removedPerson);
  });
};

//"Chain Search Query Helpers to Narrow Search Results"
//note: spent 20 minutes because my key was {favoriteFood}, when it should have been {favoriteFoods}. alas....
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : foodToSearch}) 
        .sort({name: 'asc'})
        .limit(2)
        .select({age: 0})
        .exec((err, data) => {
          if (err) done(err);
          done(null, data);
        })
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
