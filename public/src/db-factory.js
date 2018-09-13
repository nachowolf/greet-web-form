module.exports = function (pool, factory) {
    async function list () {
        var listed = await pool.query('select * from users order by greeted desc');
        return listed
    };

    async function add () {
        let user = await factory.name()
try{
        let listed = await pool.query('select name from users where name = $1', [user]);

        if (user !== '' && listed.rowCount === 0) {
            await pool.query('INSERT INTO users (name, greeted) VALUES ($1, $2)', [user, 1]);
        } else if (listed !== [] && user !== '') {
            await pool.query('update users set greeted = greeted + 1 where name = ($1)', [user]);
        }
    }
    catch(error){
        console.error(error)
    }
    }
    async function deleteFromDb (users) {
        await pool.query('delete from users where name = $1', [users]);
        // await pool.query('update users set id = default');
        await pool.query('alter sequence users_id_seq restart 1');

        
    }

    async function reset () {
        await pool.query('TRUNCATE TABLE users RESTART IDENTITY;');
    }

    async function counter () {
        let count = await pool.query('select count(*) from users');
        // let counted = count.rows[0].count
        // console.log(counted);
        return count
    }

    async function greetedList(currentUser){
        let list = await pool.query('select * from users where name = ($1)', [currentUser]);
return list
    }

    return {
        greetedList,
        counter,
        list,
        add,
        deleteFromDb,
        reset

    };
};
