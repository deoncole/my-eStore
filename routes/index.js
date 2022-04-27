const router = require('express').Router();
const apiRoutes = require('./api');

// main route to append to all of the routes that are called
router.use('/api', apiRoutes);

// error message for when the wrong route is executed
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;