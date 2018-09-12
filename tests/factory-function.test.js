const assert = require('assert');
const greetFactory = require('../public/src/greet-factory.js')


const factory = greetFactory();


describe("Greetings Web Form", function () {
    it("should ask for name if no name is entered", function () {
        factory.greetMe("")
        assert.equal("Insert a Name", factory.respond())
    })

    it("should not accept Na3 beacuse it contains a number", function () {
        factory.greetMe("Na3")
        assert.equal("Your name cannot contain any numbers", factory.respond())
    })

    it("should ask for a language if language is not selected", function () {
        factory.greetMe("Nathri")
        assert.equal("Select a Language", factory.respond())
    })

    it("should greet Nathri in English", function () {
        factory.greetMe("Nathri", "English")
        assert.equal("Hello, Nathri", factory.respond())
    })

    it("should greet Thomas in Japanese", function () {
        factory.greetMe("Thomas", "Japanese")
        assert.equal("Kon'nichiwa, Thomas", factory.respond())
    })

    it("should greet Edward in Italian", function () {
        factory.greetMe("Edward", "Italian")
        assert.equal("Ciao, Edward", factory.respond())
    })
})


