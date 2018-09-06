module.exports = function (factory, pool, stored) {
    function index (req, res) {
        res.render('home');
    }

    function greetAndCounter (req, res) {
        let user = req.params.user;
        stored.add(user);

        res.render('home', {

            greeted: factory.respond(),
            amount: factory.counter()
        });
    }
    async function submit (req, res) {
        let user = req.body.user;
        let lang = req.body.languageButton;
        factory.greetMe(user, lang);

        if (user === '') {
            res.render('home', {
                amount: factory.counter()
            });
        } else {
            res.redirect('/greetings/' + user);
        }
    }

    async function counterCurrent (req, res) {
        let currentUser = req.params.currentUser;

        let name = await pool.query('select name from users where name = 1$', [currentUser]);
        let greets = await pool.query('select greeted from users where name = 1$', [currentUser]);
        console.log(name);

        res.render('counted', {
            name,
            greets
        });
    }

    async function counterlist (req, res) {
        let list = stored.list();
        console.log(list);
        let greetedNames = list.rows;
        res.render('counter', {greetedNames});
    }

    async function counter (req, res) {
        res.redirect('/counter');
    }

    async function reset (req, res) {
        factory.reset();
        stored.reset();
        res.redirect('/');
    }

    async function deleter (req, res) {
        let users = req.params.currentUser;
        stored.deleteFromDb(users);

        res.redirect('/counter');
    }

    return {
        deleter,
        index,
        greetAndCounter,
        submit,
        counterCurrent,
        counterlist,
        counter,
        reset

    };
};
