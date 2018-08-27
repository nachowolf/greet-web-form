module.exports = function (factory) {
    function index (req, res) {
        res.render('home');
    }

    function greetAndCounter (req, res) {
        res.render('home', {

            greeted: factory.respond(),
            amount: factory.counter()
        });
    }
    function submit (req, res) {
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

    function counterCurrent (req, res) {
        let currentUser = req.params.currentUser;

        res.render('counter', {
            currentUser,
            greetedCounter: factory.allNamesCounted(currentUser)

        });
    }

    function counter (req, res) {
        let name = factory.currentName();
        console.log(name);
        res.redirect('/counter/' + name);
    }
    function reset (req, res) {
        factory.reset();
        res.redirect('/');
    }

    return {
        index,
        greetAndCounter,
        submit,
        counterCurrent,
        counter,
        reset

    };
};
