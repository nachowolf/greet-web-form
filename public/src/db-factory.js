module.exports = function (pool, factory) {
    async function list () {
        await pool.query('select * from users order by greeted desc');
    };

    async function add () {
        let user = factory.name();
        let listed = await pool.query('select name from users where name = $1', [user]);

        if (user !== '' && listed.rowCount === 0) {
            await pool.query('INSERT INTO users (name, greeted) VALUES ($1, $2)', [user, 1]);
        } else if (listed !== [] && user !== '') {
            await pool.query('update users set greeted = greeted + 1 where name = ($1)', [user]);
        }
    }
    async function deleteFromDb (users) {
        await pool.query('delete from users where name = $1', [users]);
        await pool.query('update users set id = default');
        await pool.query('alter sequence users_id_seq restart 1');

        
    }

    async function reset () {
        await pool.query('TRUNCATE TABLE users RESTART IDENTITY;');
    }

    async function counter () {
        let count = await pool.query('select count(*) from users');
        let counted = count.rows;
        console.log(counted);
        return counted
    }

    return {
        counter,
        list,
        add,
        deleteFromDb,
        reset

    };
};
