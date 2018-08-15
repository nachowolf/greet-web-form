module.exports = function() {


    var storedNamesList = {};
    var list =[]
    var greet; // <----
    var userGreets = 0
  
  
    var greetMe = function(name, language) {
      var one = name.trim().toUpperCase();
      
      
  
      for (var i=0; i<name.length;i++){
       
         if (isNaN(name[i]) === false){
            
          greet = "Your name cannot contain any numbers";
          
          return;
        }
      }
  
  if (one === ""){
    greet = "Insert a Name";
    return;
  }
  
  else if (one !== "" && language === undefined){
    greet = "Select a Language";
    console.log(greet)
    return;
  }
  
      if (isNaN(one) === true && language !== undefined) {
        if (storedNamesList[one] === undefined) {
          storedNamesList[one] = 0;
        }
  
        if (language == "English") {
          greet = "Hello, " + name;
        }
  
        else if (language == "Japanese") {
          greet = "Kon'nichiwa, " + name;
        }
  
        else if (language == "Italian") {
          greet = "Ciao, " + name;
        }
        
        list.push({
            'name': name, 
            'greeted': 0,           
            'date': new Date()
      
          })

      }
  
    };
  
    var usersGreeted = function(user) {
    
        if (user == " " || user == undefined) {
          return user
        } else {
           list(incre => incre.greeted += 1)
          return list.filter(listNames => listNames.name === user)
    
        };
      }

    var greetsBank = function(){
        return userGreets;
    }

    var respond = function() {
      return greet;
    };
  
    var namesList = function() {
      return storedNamesList;
    };
  
    var counter = function() {
      return Object.keys(storedNamesList).length;
    };
    return {
        greetsBank,
        usersGreeted,
      greetMe: greetMe,
      counter: counter,
      respond: respond,
      namesList: namesList
  
  
    };
  
  };