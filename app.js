const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require('./routes/itemRoutes');
const morgan = require('morgan');

const app = express();

app.use(express.json())
app.use(morgan('dev'));
app.use("/items", itemRoutes);

// 404 HANDLER
app.use((req,res,next)=> {
    throw new ExpressError("Resource not found", 404);
});

// GENERAL HANDLER
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        error: err.message,
    })
})

// app.listen(3000, () => {
//     console.log("SHOPPING CART ON PORT 3000")
//   })

module.exports = app;