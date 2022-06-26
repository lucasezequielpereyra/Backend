import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    products: [
      {
        ref: "Product",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Cart", cartSchema);
