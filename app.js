const path = require('path');
const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const user = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("68dfe954ea7d83521fae34b9")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://harshit:Harshit123@cluster0.gtwe7ao.mongodb.net/')
  .then(res => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          userName: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        })
        user.save()
      }
    })

    app.listen(3000, () => console.log("Server is running"))
  })
  .catch(err => {
    console.log(err)
  })