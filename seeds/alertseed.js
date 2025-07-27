const mongoose = require("mongoose");
const Alerts = require("../models/alerts");
const problems = require("./alert"); // Assuming this is your data file
mongoose
  .connect('mongodb://localhost:27017/SmartIndiaHackathon')
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  await Alerts.deleteMany({}); // Clear the collection first

  // Assuming 'problems' contains an array of 25 alerts with 'name', 'mail', and 'seviyarity'
  for (let i = 0; i < problems.length; i++) {
    const x = new Alerts({
      name: problems[i].name,         // Use actual data for name
      mail: problems[i].mail,         // Use actual data for mail
      seviyarity: problems[i].seviyarity // Use the array of severities
    });
    await x.save(); // Save each alert to the database
  }
};

seedDB().then(() => {
  mongoose.connection.close(); // Close the connection when done
});
