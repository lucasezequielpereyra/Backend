import CartModel from "../models/cart.model";

export const findByUser = async (userId) => {
  return await CartModel.findOne({ user: userId });
};

export const findOneWithProduct = async (userId, productId) => {
  return await CartModel.findOne({ user: userId, products: productId });
};

export const findOneAndUpdate = async (userId, productId) => {
  return await CartModel.findOneAndUpdate(
    { user: userId },
    {
      $push: {
        products: productId,
      },
    },
    { new: true }
  );
};

export const findByIdAndDelete = async (cartId) => {
  return await CartModel.findByIdAndDelete({ _id: cartId });
};

export const newCart = async (userId, productId) => {
  const newCart = new CartModel({
    user: userId,
    products: productId,
  });

  return await newCart.save();
};
