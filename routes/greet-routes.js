module.exports = function (factory, pool, stored) {
    async function index (req, res) {
        let counter = await stored.counter()
        let counted = await counter.rows[0].count
        console.log(counted);
        res.render('home', {
            greeted: factory.respond(),
            counted
        });
    }


    async function submit (req, res) {
        let user = req.body.user;
        let lang = req.body.languageButton;
        factory.greetMe(user, lang);

        await stored.add(user);
        await stored.counter();
        res.redirect('/');
    }

    async function counterCurrent (req, res) {
        let currentUser = req.params.currentUser;
        console.log(currentUser)

        let listedName = await stored.greetedList(currentUser)

        let disp = listedName.rows;
        console.log(disp);
        res.render('counted', {
            disp

        });
    }

    async function counterlist (req, res) {
        let list = await stored.list()

        let greetedNames = list.rows;
        console.log(greetedNames);
        res.render('counter', {
            greetedNames
        });
    }

    function counter (req, res) {
        res.redirect('/counter');
    }

    async function reset (req, res) {
        factory.reset();
        await stored.reset();
        res.redirect('/');
    }

    async function deleter (req, res) {
        let users = req.params.currentUser;
        await stored.deleteFromDb(users);

        res.redirect('/counter');
    }

    return {
        deleter,
        index,
        // greetAndCounter,
        submit,
        counterCurrent,
        counterlist,
        counter,
        reset

    };
};
