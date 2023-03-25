const mongoose = require('mongoose');

const lightbulbDB = "lightbulbDBnew";

mongoose.connect(`mongodb://localhost/${lightbulbDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(() => console.log("Established Connection to DB"))
    .catch(err => console.log("Something went wrong with config", err));