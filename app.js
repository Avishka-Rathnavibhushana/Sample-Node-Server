require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//All Routes
const routes = require('./routes/index');
app.use('/api', routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = HttpStatus.NOT_FOUND;
    err.log = "not found";
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
    if (err.status === 404) {
        const response = {
            err: 1,
            obj: {},
            msg: "Not found"
        }
        return res.json(response);
    } else {
        const response = {
            err: 1,
            obj: {},
            msg: "Exception occured"
        }
        return res.json(response);
    }
});

// // Login
// app.post("/login", async (req, res) => {

//     // Our login logic starts here
//     try {
//         // Get user input
//         const { email, password } = req.body;

//         // Validate user input
//         if (!(email && password)) {
//             res.status(400).send("All input is required");
//         }
//         // Validate if user exist in our database
//         const user = await User.findOne({ email });

//         if (user && (await bcrypt.compare(password, user.password))) {
//             // Create token
//             const token = jwt.sign(
//                 { user_id: user._id, email },
//                 process.env.TOKEN_KEY,
//                 {
//                     expiresIn: "2h",
//                 }
//             );

//             // save user token
//             user.token = token;

//             // user
//             res.status(200).json(user);
//         }
//         res.status(400).send("Invalid Credentials");
//     } catch (err) {
//         console.log(err);
//     }
//     // Our register logic ends here
// });

// const auth = require("./middleware/auth");

// app.post("/welcome", auth, (req, res) => {
//     res.status(200).send("Welcome 🙌 ");
// });

module.exports = app;