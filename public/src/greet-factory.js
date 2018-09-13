module.exports = function () {
    // var storedNamesList = {};
    var greet; // <----
    var currentName;
    var allNamesList = [];

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
           
            // // allNamesList.push(name);
            // if (storedNamesList[one] === undefined) {
            //     storedNamesList[one] = 0;
                currentName = one;
            // }

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

    var allNamesCounted = function (input) {
        var countedList = 0;
        for (var i = 0; i < allNamesList.length; i++) {
            if (allNamesList[i] === input) {
                countedList += 1;
            }
        }
        return countedList;
    };

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

    var namesList = function () {
        return storedNamesList;
    };

    // var counter = function () {
    //     return Object.keys(storedNamesList).length;
    // };
    return {
        reset,
        allNamesCounted,
        name,
        greetMe: greetMe,
        // counter: counter,
        respond: respond,
        namesList: namesList

    };
};
