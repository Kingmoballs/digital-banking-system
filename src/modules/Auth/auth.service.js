const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../users/user.model");
const { onboardFintech } = require("../../integrations/nibss/nibss.service");

const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const fintechResponse = await onboardFintech({
    name,
    email,
  });

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    fintechId: fintechResponse.fintechId,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    fintechId: user.fintechId,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

module.exports = {
  register,
  login,
};