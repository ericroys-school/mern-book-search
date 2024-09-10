const { User } = require('../models');
const { signToken } = require('../utils/auth');

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
      // console.log(input);
      let { email, password } = input;
      let user = await User.create({ username: email, email, password });
      let token = signToken(user);
      return { user, token };
    },
    /**add a book to the user saved books array */
    userSaveBook: async (_, { input }, context) => {
      let { bookId, title, description, image, link, authors } = input;

      if (context.user) {
        return await User.findOneAndUpdate(
          {
            email: context.user.email,
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
      }
      throw 'Not authenticated';
    },
    /**delete a saved book from the user saved books array */
    userDeleteBook: async (_, { email, bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {
            email: email,
          },
          {
            $pull: { savedBooks: { bookId: bookId } },
          },
          {
            new: true,
          }
        );
      }
      throw 'Not authenticated';
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
