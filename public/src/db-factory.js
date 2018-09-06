module.exports = function (pool) {
    async function list () {
        await pool.query('select * from users order by greeted desc');
    };

    async function add (user) {
        console.log(user)
        let listed = await pool.query('select name from users where name = $1', [user]);

        // if (listed !== '' && user !== '') {
        //     var greetCount = await pool.query('select greeted from users where name = ($1)', [user]);
        //     var result = greetCount.rows[0];
        //     var counted = result.greeted;
        //     counted++;
        //     await pool.query('update users set greeted = $1 where name = $2', [counted++, user]);
        // }
        if (listed && user !== '') {
            await pool.query('insert into users (name, greeted) values ($1, $2)', [user, 1]);
        };
    }

    async function deleteFromDb (users) {
        await pool.query('delete from users where name = $1', [users]);
        await pool.query('alter users_id_seq restart 1');
    }

    async function reset () {
        await pool.query('TRUNCATE TABLE users RESTART IDENTITY;');
    }
    return {
        add,
        deleteFromDb,
        reset,
        list
    };
};
