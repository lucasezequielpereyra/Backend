import UserModel from "../models/user.model";

export const newUser = async (user, avatar) => {
  const newUser = new UserModel({
    email: user.email,
    password: await UserModel.encryptPassword(user.password),
    name: user.name,
    address: user.address,
    age: user.age,
    phone: user.phone,
    avatar: avatar,
  });

  return await newUser.save();
};

export const findOneByEmail = async (email) => {
  return await UserModel.findOne({ email: email });
};

export const findOneById = async (id) => {
  return await UserModel.findById(id);
};

export const comparePassword = async (password, userPassword) => {
  return await UserModel.comparePassword(password, userPassword);
};
