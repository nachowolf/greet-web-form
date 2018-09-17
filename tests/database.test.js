const assert = require('assert');
const GreetFactory = require('../src/greet-factory.js')
const pg = require("pg");
const DbFuncs = require('../src/db-factory.js');;
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/codex';


const pool = new Pool({
    connectionString
});

const factory = GreetFactory();
const stored = DbFuncs(pool, factory);

describe('The greetings database web app', function () {
    beforeEach(async function () {
        await pool.query('delete from users');
    });

    it('should pass the db test', async function () {
        let factory = GreetFactory();
        let stored = DbFuncs(pool, factory);
        factory.greetMe("Nathri", "English")
        await stored.add('nathri');
        let nameCount = await stored.counter();
        assert.equal(1, nameCount.rows[0].count);
    })


    it('should return 5 names in database', async function () {      
        let stored = DbFuncs(pool);

        await stored.add('Nathri ');
        await stored.add('Thomas');
        await stored.add('Bob');
        await stored.add('Timmy');
        await stored.add('Dylan');



        let nameCount = await stored.counter()
        assert.equal(5, nameCount.rows[0].count);
    })

    it('should reset database', async function () {
        let stored = DbFuncs(pool);
        let factory = GreetFactory();
        await stored.add('Nathri ')
        await stored.add('Thomas')
        await stored.add('Bob')
        await stored.add('Timmy')
        await stored.add('Dylan')
        stored.reset();
        let nameCount = await stored.counter();
        assert.equal(0, nameCount.rows[0].count);
    })


    it('should return 8 for times nathri', async function () {
        let stored = DbFuncs(pool);
        await stored.add('Nathri')
        await stored.add('Nathri')
        await stored.add('Nathri')
        await stored.add('Nathri')
        await stored.add('Nathri')
        await stored.add('Nathri')
        await stored.add('Nathri')
        await stored.add('Nathri')
        let greetlist = await stored.greetedList("Nathri");
        let greets = greetlist.rows;

        let user = await greets.map(lister=> lister.name)
        let greeted = await greets.map(lister=> lister.greeted)

        assert.equal("Nathri", await user);
        assert.equal(8, await greeted);



    })

    

    it('should return 5 for times nathri has been', async function () {
        let stored = DbFuncs(pool);
        let factory = GreetFactory();
        await stored.add('Nathri')
        await stored.add('Thomas')
        await stored.add('Bob')
        await stored.add('Timmy')
        await stored.add('Dylan')

        let userslist = await stored.list()
        let allUsers = await userslist.rows
        let users = await allUsers.map(lister=> lister.name)
        
        assert.deepEqual(['Nathri', 'Thomas', 'Bob', 'Timmy', 'Dylan'], await users)
      
    })

 

it('should return the 5 names in the list in descending numeracle order', async function () {
    let stored = DbFuncs(pool);

    await stored.add('Nathri')
    await stored.add('Nathri')
    await stored.add('Nathri')
    await stored.add('Nathri')
    await stored.add('Nathri')
    await stored.add('Nathri')

    await stored.add('Thomas');
    await stored.add('Thomas');
    await stored.add('Thomas');
    await stored.add('Thomas');

    await stored.add('Bob');
    await stored.add('Bob');
    await stored.add('Bob');

    await stored.add('Timmy');
    await stored.add('Timmy');

    await stored.add('Dylan');
   

     let userslist = await stored.list()
     let allUsers = await userslist.rows
     let users = await allUsers.map(lister=> lister.name)
     
     assert.deepEqual(['Nathri', 'Thomas', 'Bob', 'Timmy', 'Dylan'], await users) 
})

   
after(function () {
    pool.end()
})
})