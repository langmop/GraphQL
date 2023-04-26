import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
  Query: {
    user: async (_, { _id }, { userId }) => {
      if (_id) {
        const userData = await User.findById(_id);
        return {
          firstName: userData.firstName,
          lastName: userData.lastName,
          _id: userData._id,
        };
      }
      const userData = await User.findById(userId);
      return userData;
    },
    users: async () => {
      return await User.find({});
    },
    quotes: async () => {
      return await Quote.find({});
    },
    byQuotes: async (_, { by }) => {
      return await Quote.find({ by: by });
    },
  },
  User: {
    quotes: async (parent) => {
      return await Quote.find({ by: parent._id });
    },
  },

  Quote: {
    userName: async (parent) => {
      const userData = await User.findById(parent.by);

      const { firstName, lastName } = userData;

      return {
        firstName,
        lastName,
      };
    },
  },

  Mutation: {
    signupUser: async (_, { userInput }) => {
      const user = await User.findOne({ email: userInput.email });

      if (user) {
        throw new Error("User Already Exist");
      }

      const encryptedPassword = await bcrypt.hash(userInput.password, 12);

      const newUser = new User({
        ...userInput,
        password: encryptedPassword,
      });

      return await newUser.save();
    },
    signinUser: async (_, { userCredInput }) => {
      const { email, password } = userCredInput;

      const oldUser = await User.findOne({ email: email });

      if (!oldUser) {
        throw new Error("No user Found of such Email");
      }

      const isMatchedPassword = await bcrypt.compare(
        password,
        oldUser.password
      );

      if (!isMatchedPassword) {
        throw new Error("Invalid mail or password");
      }

      const token = jwt.sign({ userId: oldUser._id }, process.env.JWT_SECRET);

      return {
        token,
      };
    },
    addQuote: async (_, { name }, { userId }) => {
      if (userId) {
        const newQuote = new Quote({
          name,
          by: userId,
        });

        const quoteGenerated = await newQuote.save();

        if (!quoteGenerated) {
          throw new Error("Quote cannot be generated");
        }

        return "Quote is Generated Successfully";
      }

      return "Quote not made SuccessFully";
    },
  },
};

export default resolvers;
