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

        if ( && user !== '') {
            await pool.query('insert into users (name, greeted) values ($1, $2)', [user, 1]);
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
        let list = await pool.query('select * from users');
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