import { faker } from '@faker-js/faker';


export const generateUser = () => {
    const products = []
    for (let i=0; i<5; i++){
        const product = generateProducts();
        products.push(product)
    }

    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    
    const username = `${first_name.toLowerCase()}${last_name.toLowerCase()}`;

    const roles = ['user', 'admin', 'premium'];
    const randomRoleIndex = faker.number.int({ min: 0, max: roles.length - 1 });
    const role = roles[randomRoleIndex];


    const user = {
        id: faker.database.mongodbObjectId(),
        first_name,
        last_name,
        username,
        email: faker.internet.email(),
        password:  faker.internet.password(),
        role,
        fromGithub: faker.datatype.boolean(),
        carts: products
    }
    return user
}


export const generateProducts = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.lorem.words(8),
        price: faker.commerce.price(),
        thumbnail: faker.commerce.department(),
        code: faker.string.uuid().substr(0, 8),
        stock: faker.number.int(100)
    }
    return product
}