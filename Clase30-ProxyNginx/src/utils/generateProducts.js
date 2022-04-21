import { faker } from '@faker-js/faker';

function generateProducts() {
  return {
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    image: faker.image.abstract(),
  };
}

export default generateProducts;
