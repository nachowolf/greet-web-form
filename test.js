const assert = require('assert');
const greetFactory = require('./public/src/greet-factory.js')

const factory = greetFactory()

describe("Greetings Web Form", function(){
    it("should ask for name if no name is entered", function(){
        factory.greetMe("")
        assert.equal("Insert a Name", factory.respond())
    })

    it("should not accept Na3 beacuse it contains a number", function(){
        factory.greetMe("Na3")
        assert.equal("Your name cannot contain any numbers", factory.respond())
    })

    it("should ask for a language if language is not selected", function(){
        factory.greetMe("Nathri")
        assert.equal("Select a Language", factory.respond())
    })

    it("should greet nathri in English", function(){
        factory.greetMe("nathri", "English")
        assert.equal("Hello, nathri", factory.respond())
    })

    it("should greet thomas in Japanese", function(){
        factory.greetMe("thomas", "Japanese")
        assert.equal("Kon'nichiwa, thomas", factory.respond())
    })

    it("should greet edward in Italian", function(){
        factory.greetMe("edward", "Italian")
        assert.equal("Ciao, edward", factory.respond())
    })
    
    it("should return 3 for names greeted", function(){
        
        assert.equal(3, factory.counter())
    })
})