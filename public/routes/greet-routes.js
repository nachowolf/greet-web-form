module.exports = function (factory, pool) {
    function index (req, res) {
        res.render('home');
    }

    function greetAndCounter (req, res) {
        res.render('home', {

            greeted: factory.respond(),
            amount: factory.counter()
        });
    }
    async function submit (req, res) {
        let user = req.body.user;
        let lang = req.body.languageButton;
        factory.greetMe(user, lang);
        var listed = await pool.query('select name from users where name = $1', [user]);

        if (listed === '' && user !== '') {
            await pool.query('insert into users (name, greeted) values ($1, $2)', [user, 1]);
        };
        else if (listed !== '' && user !== '') {
            var greetCount = await pool.query('select greeted from users where name = $1', [user]
            ,greetCount += 1
            await pool.query('update users set greeted = $1 where name = $2',[greetCount, user])
        }

        if (user === '') {
            res.render('home', {
                amount: factory.counter()
            });
        } else {
            res.redirect('/greetings/' + user);
        }
    }

    // async function counterCurrent (req, res) {
    //     let currentUser = req.params.currentUser;
    //     let results = await pool.query('select * from greet_list');
    //     let name = results.rows;

    //     res.render('counter', {
    //         name,
    //         currentUser,
    //         greetedCounter: factory.allNamesCounted(currentUser)

    //     });
    // }

    async function counterlist (req, res) {
        let list = await pool.query('select * from users order by greeted desc');
        let greetedNames = list.rows;
        res.render('counter', {greetedNames});
    }

    function counter (req, res) {
   
        res.redirect('/counter');
    }

    function reset (req, res) {
        factory.reset();
        res.redirect('/');
    }

    return {
        index,
        greetAndCounter,
        submit,
        // counterCurrent,
        counterlist,
        counter,
        reset

    };
};