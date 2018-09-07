module.exports = function (pool) {
    async function list () {
        await pool.query('select * from users order by greeted desc');
    };

    async function add (user) {
        console.log(user);
        let listed = await pool.query('select name from users where name = $1', [user]);
        let listy = listed.rows;
console.log(listy);
        if (listed === [] && user !== '') {
            await pool.query('INSERT INTO users (name, greeted) VALUES ($1, $2)', [user, 1]);
        } else if (listed !== [] && user !== '') {
            await pool.query('update users set greeted = greeted + 1 where name = ($1)', [user]);
        }
    }
    async function deleteFromDb (users) {
        await pool.query('delete from users where name = $1', [users]);
        await pool.query('alter sequence users_id_seq restart 1');
    }

    async function reset () {
        await pool.query('TRUNCATE TABLE users RESTART IDENTITY;');
    }
    return {
        list,
        add,
        deleteFromDb,
        reset

    };
};
