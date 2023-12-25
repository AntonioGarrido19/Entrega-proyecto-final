import supertest from "supertest";
import { expect } from "chai"
import { generateAuthToken } from '../src/middlewares/jwt.middleware.js'

const requester = supertest('http://localhost:8080');

describe('Products endpoints', () => {
    describe('GET /api/products', () => {
        it('should return all products', async () => {
            const response = await requester.get('/api/products');
            expect(response.status).to.equal(200);
            expect(response.headers['content-type']).to.include('json');

            // Assuming the response body is a JSON object, you can further assert its structure or content
            expect(response.body).to.be.an('object'); // Adjust this based on the actual response structure

        });
    });

    describe('POST /api/products',()=>{
        const productMock = {
            title: "Mate",
            description: "Cuero",
            price: 200,
            thumbnail: "none",
            code: "2joij2",
            stock: 5,
        };
        it('should create a product with all its properties', async () => {

            const mockUserData = {
                _id: '655665e4eb18fb8e11dbc378',
                firstName: 'Antonio',
                lastName: 'Garrido',
                username: 'antogarrido',
                email: 'anto.garrido@example.com',
                password: '$2b$10$hGZd2Z4nUEziUsjuQkNVmO0A31CA35mM7OIRPgrZGCNgxPKCNl1rC',
                role: 'admin',
                __v: 0,
              };
        
           // Generate a mock authentication token (replace with your token creation logic)
           const authToken = generateAuthToken(mockUserData);

           const response = await requester.post("/api/products")
               .set('Authorization', `Bearer ${authToken}`)
               .send(productMock);

           expect(response.statusCode).to.be.equal(200);
            
              // Ensure the response body has the expected properties
              expect(response.body).to.have.property('message', 'Product created');
              expect(response.body).to.have.property('product');
              expect(response.body.product).to.have.property('title', productMock.title);
        });
    })

    describe('Products endpoints', () => {
        describe('GET /api/products/:pid', () => {
            it('should return a product by its id', async () => {
                const response = await requester.get('/api/products/:pid');
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('message', 'Product found');
                expect(response.headers['content-type']).to.include('json');
    
                // Assuming the response body is a JSON object, you can further assert its structure or content
                expect(response.body).to.be.an('object'); // Adjust this based on the actual response structure
    
                // If using async code in the test, ensure Mocha knows about it
                // (either use `done` or return the Promise)
            });
        });
    })
});


//CARTS TESTS
describe('Carts endpoints', () => {
    describe('GET /api/carts', () => {
        it('should return all carts', async () => {
            const response = await requester.get('/api/carts');
            expect(response.status).to.equal(200);
            expect(response.headers['content-type']).to.include('json');
            // Assuming the response body is a JSON object, you can further assert its structure or content
            expect(response.body).to.be.an('object'); // Adjust this based on the actual response structure
        });
    });

    
    describe('POST /api/carts',()=>{
        const cartMock = {
            title: "Cart superTest",
            products: []
        };
        it('should create a cart with all its properties', async () => {

            const mockUserData = {
                _id: '655665e4eb18fb8e11dbc378',
                firstName: 'Antonio',
                lastName: 'Garrido',
                username: 'antogarrido',
                email: 'anto.garrido@example.com',
                password: '$2b$10$hGZd2Z4nUEziUsjuQkNVmO0A31CA35mM7OIRPgrZGCNgxPKCNl1rC',
                role: 'user',
                __v: 0,
              };
        
           // Generate a mock authentication token (replace with your token creation logic)
           const authToken = generateAuthToken(mockUserData);

           const response = await requester.post("/api/carts")
               .set('Authorization', `Bearer ${authToken}`)
               .send(cartMock);

           expect(response.statusCode).to.be.equal(200);
            
              // Ensure the response body has the expected properties
              expect(response.body).to.have.property('message', 'Cart created');
              expect(response.body).to.have.property('cart');
              expect(response.body.cart).to.have.property('title', cartMock.title);
        });
    })

    describe('DELETE /api/carts/:cid',()=>{
      
        it('should delete a cart with the cid', async () => {

            const mockUserData = {
                _id: '655665e4eb18fb8e11dbc378',
                firstName: 'Antonio',
                lastName: 'Garrido',
                username: 'antogarrido',
                email: 'anto.garrido@example.com',
                password: '$2b$10$hGZd2Z4nUEziUsjuQkNVmO0A31CA35mM7OIRPgrZGCNgxPKCNl1rC',
                role: 'user',
                __v: 0,
              };
        
           // Generate a mock authentication token (replace with your token creation logic)
           const authToken = generateAuthToken(mockUserData);

           const response = await requester.delete("/api/carts/:cid")
               .set('Authorization', `Bearer ${authToken}`)

           expect(response.statusCode).to.be.equal(200);
            
              // Ensure the response body has the expected properties
              expect(response.body).to.have.property('message', 'Cart Deleted');
        });
    })
})