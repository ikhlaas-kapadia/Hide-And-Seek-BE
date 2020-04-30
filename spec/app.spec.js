process.env.NODE_ENV = 'test';
const { app } = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { generateToken } = require('../utils/auth-util');
const { seed, closeDB, openConnection } = require('../db/seeder.js');
let mockToken = generateToken('test');

describe('/api', () => {
  beforeEach(async () => {
    await seed();
  });
  after(async () => {
    await closeDB();
  });
  describe('/api/users/login', () => {
    it('POST - 200, logs in user and responds with a user object', () => {
      return request(app)
        .post('/api/users/login')
        .send({ user_name: 'miketest', password: 'test1234' })
        .expect(200)
        .then((res) => {
          expect(res.body.user).to.have.all.keys([
            'id',
            'user_name',
            'last_name',
            'first_name',
            'avatar',
            'token',
          ]);
        });
    });
    it('POST - 401, logs in user and responds with error if password is incorrect', () => {
      return request(app)
        .post('/api/users/login')
        .send({ user_name: 'miketest', password: 'test12345' })
        .expect(401);
    });
    it('POST - 401, logs in user and responds with error if user incorrect', () => {
      return request(app)
        .post('/api/users/login')
        .send({ user_name: 'ricky', password: 'test1234' })
        .expect(401);
    });
  });
  describe('/api/user/register', () => {
    it('POST - 201, creates new user and responds with a user object', () => {
      return request(app)
        .post('/api/users/register')
        .send({
          user_name: 'ricky100',
          first_name: 'Ricky',
          last_name: 'K',
          email: 'ricky100@gmail.com',
          password: 'test2345',
        })
        .expect(201)
        .then((res) => {
          expect(res.body.user).to.have.all.keys(['id', 'user_name']);
        });
    });
    it('POST - 401, duplicate user name', () => {
      return request(app)
        .post('/api/users/register')
        .send({
          user_name: 'miketest',
          first_name: 'Ricky',
          last_name: 'K',
          email: 'ricky100@gmail.com',
          password: 'test2345',
        })
        .expect(401);
    });
    it('POST - 401, duplicate email', () => {
      return request(app)
        .post('/api/users/register')
        .send({
          user_name: 'ricky15555',
          first_name: 'Ricky',
          last_name: 'K',
          email: 'jay@hotmail.co.uk',
          password: 'test2345',
        })
        .expect(401);
    });
  });
  describe('/api/results', () => {
    context('GET request', () => {
      it('it should return correct results for a user', () => {
        return request(app)
          .get('/api/results?user_id=5eaa9ed332a717312f9c7cbd')
          .set('Authorization', 'Bearer ' + mockToken)
          .expect(200)
          .then((res) => {
            expect(res.body.results.win_count).to.equal(3);
            expect(res.body.results.loss_count).to.equal(3);
            expect(res.body.results.game_count).to.equal(6);
            expect(res.body.results.wins).to.be.an('array');
            expect(res.body.results.losses).to.be.an('array');
          });
      });
      it('it should return no results for incorrect user id', () => {
        return request(app)
          .get('/api/results?user_id=5eaa9ed332a717312fdsds9c7cbd')
          .set('Authorization', 'Bearer ' + mockToken)
          .expect(200)
          .then((res) => {
            expect(res.body.results.win_count).to.equal(0);
            expect(res.body.results.loss_count).to.equal(0);
            expect(res.body.results.game_count).to.equal(0);
            expect(res.body.results.wins).to.be.an('array');
            expect(res.body.results.losses).to.be.an('array');
          });
      });
    });
    context('POST request', () => {
      it('it should add a new result to the results table', () => {
        return request(app)
          .post('/api/results')
          .set('Authorization', 'Bearer ' + mockToken)
          .send({
            room: 'testroom1',
            winner: {
              user_id: '5eaa9ed332a717312f9c7cbd',
              user_name: 'miketest',
            },
            losers: [
              { user_id: '5eaa9ed332a717312f9c7cbe', user_name: 'jaytest' },
              { user_id: '5eaa9ed332a717312f9c7cbf', user_name: 'bobtest' },
              { user_id: '5eaa9ed332a717312f9c7cc0', user_name: 'Hannes12' },
            ],
          })
          .expect(201)
          .then((res) => {
            expect(res.body.results.result_id).to.be.a('string');
            expect(res.body.results.room).to.be.a('string');
            expect(res.body.results.winner).to.be.an('object');
            expect(res.body.results.losers).to.be.an('array');
          });
      });
      it('it should return 400 if missing body info', () => {
        return request(app)
          .post('/api/results')
          .set('Authorization', 'Bearer ' + mockToken)
          .send({
            room: 'testroom1',
            losers: [
              { user_id: '5eaa9ed332a717312f9c7cbe', user_name: 'jaytest' },
              { user_id: '5eaa9ed332a717312f9c7cbf', user_name: 'bobtest' },
              { user_id: '5eaa9ed332a717312f9c7cc0', user_name: 'Hannes12' },
            ],
          })
          .expect(400);
      });
    });
  });
  describe('Test authorized routes', () => {
    it('/api/results', () => {
      return request(app)
        .post('/api/results')
        .send({
          room: 'testroom1',
          losers: [
            { user_id: '5eaa9ed332a717312f9c7cbe', user_name: 'jaytest' },
            { user_id: '5eaa9ed332a717312f9c7cbf', user_name: 'bobtest' },
            { user_id: '5eaa9ed332a717312f9c7cc0', user_name: 'Hannes12' },
          ],
        })
        .expect(401)
        .then((res) => {
          expect(res.body.msg).to.equal('Auth token is not supplied');
        });
    });
    it('/api/results', () => {
      return request(app)
        .get('/api/results?user_id=5eaa9ed332a717312f9c7cbd')
        .set('Authorization', 'Bearer ' + '121')
        .expect(401)
        .then((res) => {
          expect(res.body.msg).to.equal('Token is not valid');
        });
    });
    it('/api/users/profile', () => {
      return request(app)
        .patch('/api/users/profile')
        .set('Authorization', 'Bearer ' + '121')
        .expect(401)
        .then((res) => {
          expect(res.body.msg).to.equal('Token is not valid');
        });
    });
  });
});
