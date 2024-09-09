const { User } = require('../models');

const resolvers = {
  Query: {
    user: async (_, { email }) => {
      return User.findOne({ username: email });
    },
  },
  /** the mutations use input for more precise input requirements
   *  see typeDefs.js for the input definitions
   */
  Mutation: {
    /** user model specifies username and email but they were used intermixed
     *  in the starter code. Instead of removing one or the other from the model,
     *  will henceforth have the same value. For all other purposes the email is 
     *  used instead of the username (i.e. in the ui, input definition, etc)
     */
    userCreate: async (_, { input }) => {
      let { email, password } = input;
      return User.create({ username: email, email, password });
    },
    /**add a book to the user saved books array */
    userSaveBook: async (_, {email, input }) => {
      let {bookId, title, description, image, link, authors } = input;
      console.log(input)

      return User.findOneAndUpdate(
        {
          email: email,
        },
        {
          //this adds duplicate unless _id:false is added to the model definition
          $addToSet: {
            savedBooks: { bookId, title, description, image, link, authors },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    /**delete a saved book from the user saved books array */
    userDeleteBook: async (_, { input }) => {
      let { email, bookId } = input;
      return User.findOneAndUpdate(
        {
          email: email,
        },
        {
          $pull: { savedBooks: bookId },
        },
        {
          new: true,
        }
      );
    },
    /*login a user
    */
    userLogin: async (_, { input }) => {
      let { email, password } = input;
      const user = await User.findOne({ email: email });
      if (!user) throw 'Authentication failed';
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw 'Authentication Failed';
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
