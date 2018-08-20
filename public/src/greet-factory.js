module.exports = function() {


    var storedNamesList = {};
    var greet; // <----
    var named
    var allNamesList = []
  
  
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
    return;
  }
  
      if (isNaN(one) === true && language !== undefined) {
        named = name
        allNamesList.push(name)
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
        
      }
    
    };
  
var allNamesCounted = function(input){
  var countedList = 0
  for(var i = 0;i<allNamesList.length;i++){
    if(allNamesList[i] === input){
      countedList += 1
    }
  }
  return countedList
}

var currentName = function(){
  return named
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
      allNamesCounted,
      currentName,
      greetMe: greetMe,
      counter: counter,
      respond: respond,
      namesList: namesList
  
  
    };
  
  };