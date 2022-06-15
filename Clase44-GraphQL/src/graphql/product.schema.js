import { buildSchema } from 'graphql';

const ProductSchema = buildSchema(`
    input ProductInput {
    img: String,
    name: String,
    price: Float,
    stock: Float,
    description: String
  }
  type Product {
    img: String,
    name: String,
    price: Float,
    stock: Float,
    description: String
  }
  type Query {
    getProducts: [Product]
  }
  type Mutation {
    addProduct(product: ProductInput): Product
  }
`);

export default ProductSchema;
