const bcrypt = require('bcryptjs');
const {User} = require('../models');
const {UserInputError, AuthenticationError}  = require('appolo-server')
const jwt = require('jsonwebtoken');

module.exports = {

Query: {
  getUsers: async() => {
    // const users = [
    //   {
    //     id: 1,
    //     username: 'jerry',
    //     email: 'ash@gmail.com'
    //   },
    // ]
    try{
      const users = await User.findAll();
      return users;
    }
    catch(err){
    console.log(err);
    }
  },

  login: async(_, args) => {

    const {username, password} = args
    let errors = {}
    try{

      if(username.trim() === '')
        errors.username = 'username must not be empty'

      if(password === '')
        errors.password = 'password must not be empty'

        if(Object.keys((errors).length > 0){
          throw new UserInputError('bad input', {errors});
        }

      const user = await User.findOne({
        where: {username}
      });

      if(!user){
        errors.username = 'user not found'
      };

      const correctPassword = await bcrypt.compare(password, user.password)
      if(!correctPassword){
        errors.password = 'password is incorrect'
        throw new AuthenticationError('password is incorrect', {errors})
      }

      const token = jwt.sign(
        { username },
        'secret jibberish',
        {expiresIn: '1h'}
      );

      user.token = token;

      return user;

    } catch (err) {
      console.log(err);
      throw err;
    }
},
Mutation: {

  register: async() => {_, args) => {

    let {username, email, password, confirmPassword} = args;
    let error = {}
    try{

      // validate i/p data
      if(email.trim() === "")
      errors.email = 'Email must not be empty'

      if(username.trim() === "")
      errors.username = 'Username must not be empty'

      if(password.trim() === "")
      errors.password = 'Password must not be empty'

      if(confirmPassword.trim() === "")
      errors.confirmPassword = 'Repeat Password must not be empty'

      if(password != confirmPassword)
      errors.confirmPassword = 'Passwords must match'

      // check ig username, email exists and
      // const userByUsername = await User.findOne({
      // where: { username}});
      //
      // const userByEmail = await User.findOne({
      // where: { email}});
      //
      // if(userByUsername) errors.username = 'Username is taken'
      // if(userByEmail) errors.email = 'Email is taken'

      if(Object.keys(errors).length > 0){
        throw errors;
      }
      // hash password
      password =  await bcrypt.hash(password, 6);

      //create user
      const user = await User.create({
          username,
          email,
          password
        });

      return user.toJSON();
    }
    catch(err)
    {
    console.log(err);
    if(err.name == 'SequelizeError')
    else if (err.name == ')
    err.errors.forEach(
    throw new UserInputError('Bad input', {errors: err});
    }
  }
}

}
}
