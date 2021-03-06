/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
  
  describe("Rutas types", () => {
    describe("GET /types", () => {
      it("is expected 200  replay", () => agent.get("/types").expect(200));
    });
  });
  
  describe("GET /pokemons/details/:id", () => {
    it("is expected 200 replay", () => agent.get("/pokemons/details/1").expect(200));
  });
});
