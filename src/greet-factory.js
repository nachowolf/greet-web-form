module.exports = function () {

    var greet; // <----
    var currentName;

    var greetMe = function (name, language) {
        var one = name.trim().charAt(0).toUpperCase() + name.slice(1)

        for (var i = 0; i < name.length; i++) {
            if (isNaN(name[i]) === false) {
                greet = 'Your name cannot contain any numbers';

                return;
            }
        }

        if (one === '') {
            greet = 'Insert a Name';
            return;
        } else if (one !== '' && language === undefined) {
            greet = 'Select a Language';
            return;
        }

        if (isNaN(one) === true && language !== undefined) {
           
                currentName = one;


            if (language === 'English') {
                greet = 'Hello, ' + one;
            } else if (language === 'Japanese') {
                greet = "Kon'nichiwa, " + one;
            } else if (language === 'Italian') {
                greet = 'Ciao, ' + one;
            }
        }
        else {
            listed = false;
        }
    };

    
    var deleter = function() {
    currentName = undefined
}

    var reset = function () {
        storedNamesList = {};
        greet = undefined;
        listed = false;
        currentName = undefined
    };

    var name = function () {
        return currentName;
    };

    var respond = function () {
        return greet;
    };


    return {
        reset,
        name,
        greetMe,
        respond,
        deleter

    };
};
