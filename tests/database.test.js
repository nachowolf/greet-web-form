const assert = require('assert');
const greetFactory = require('../public/src/greet-factory.js')
const pg = require("pg");
const dbFuncs = require('../public/src/db-factory.js');;
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/coder';
// 'postgresql://localhost:5432/my_products_test';

const pool = new Pool({
    connectionString
});

const factory = greetFactory();
const stored = dbFuncs(pool, factory);

describe('The greetings database web app', function () {
    beforeEach(async function () {
        await pool.query('delete from users')
    })
    it('should pass the db test', async function () {
        let factory = greetFactory();
        let stored = dbFuncs(pool, factory);
        await stored.add('nathri')
        let nameCount = await stored.counter()
        assert.equal(1, nameCount.rows[0].count)
    })


    it('should return 5 names in database', async function () {      
        let stored = dbFuncs(pool);
        
        await stored.add('nathri ')
        await stored.add('Thomas')
        await stored.add('bob')
        await stored.add('Timmy')
        await stored.add('Dylan')

        let nameCount = await stored.counter()
        assert.equal(5, nameCount.rows[0].count)
    })

    it('should reset database', async function () {
        let stored = dbFuncs(pool);
        await stored.add('nathri ')
        await stored.add('Thomas')
        await stored.add('bob')
        await stored.add('Timmy')
        await stored.add('Dylan')
        stored.reset()
        let nameCount = await stored.counter()
        assert.equal(0, nameCount.rows[0].count) 
    })


    it('should return 8 for times nathri has been', async function () {
        let stored = dbFuncs(pool);
        await stored.add('nathri')
        await stored.add('nathri')
        await stored.add('nathri')
        await stored.add('nathri')
        await stored.add('nathri')
        await stored.add('nathri')
        await stored.add('nathri')
        await stored.add('nathri')
        let greetlist = await stored.greetedList("Nathri")
        let greets = greetlist.rows[0]
        assert.equal("Nathri", await greets.name) 
        assert.equal(8, await greets.greeted) 
    })

    it('should return the 5 names in the list in descending numeracle order', async function () {
        let stored = dbFuncs(pool);
        await stored.add('nathri')
        await stored.add('nathri')
        await stored.add('nathri')
        await stored.add('nathri')
        await stored.add('nathri')
        await stored.add('nathri')

        await stored.add('Thomas')
        await stored.add('Thomas')
        await stored.add('Thomas')
        await stored.add('Thomas')

        await stored.add('bob')
        await stored.add('bob')
        await stored.add('bob')

        await stored.add('Timmy')
        await stored.add('Timmy')

        await stored.add('Dylan')
        let nameslist = await stored.list()
         names = nameslist

        names = nameslist.rows[0].name
        assert.equal("Nathri", names) 
        names = nameslist.rows[1].name
        assert.equal("Thomas", names) 
        names = nameslist.rows[2].name
        assert.equal("Bob", names) 
        names = nameslist.rows[3].name
        assert.equal("Timmy", names) 
        names = nameslist.rows[4].name
        assert.equal("Dylan", names) 
    })

    after(function () {
        pool.end()
    })
})