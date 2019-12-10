const User =  require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;

    User.findOne({login: login})
        .then(user => {
            if (user) {
                res.send('Користувач з таким логіном вже існує')
                Promise.reject('Користувач з таким логіном вже існує');
            } else return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            const user = new User({
                login: login,
                password: hashedPassword,
                isAdmin: isAdmin
            });
            return user.save();
        })
        .then(result => {
            console.log('User ' + result + ' was saved successfully')
            res.send('Користувача створено')
        })
        .catch(err => console.log(err));
};

exports.login = (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;
    let loadedUser;
    User.findOne({login: login})
        .then(user => {
            if (!user) res.send('Користувача з такими даними не знайдено');

            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) res.send('Ви ввели неправильний пароль, спробуйте ще раз');

            const token = jwt.sign({
                login: loadedUser.email,
                userId: loadedUser._id.toString()
            }, 'obviouslynotasamsungsupportsecret', { expiresIn: '1h' });

            res.status(200).send({
                token: token, 
                userId: loadedUser._id.toString(),
                isAdmin: loadedUser.isAdmin,
                login: loadedUser.login
            });
        })
        .catch(err => res.send(err));


};