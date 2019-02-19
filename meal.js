
class User {
   constructor(weight, height,budget)
   {
   this.weight = weight;
   this.height = height;
   this.budget = budget;
   var bmi = (weight/(height/100))/(height/100);
   this.bmi = bmi;
   console.log(bmi);
   var type;
   switch(true){
         case bmi<18.5:
         type = "Underweight";
         break;
         case 18.5<=bmi && bmi<24.9:
         type = "Healthyweight";
         break;
         case 25<=bmi && bmi<29.9:
         type = "Overweight";
         break;
         case bmi>=30:
         type="Obese";
         break;
         default:
         type ="Not defined"
   }
   this.type = type;
   this.plan = generateMeal(budget,type);
   }
}

class Meal{
   constructor(title,picture,description)
   {
      this.title=title;
      this.picture=picture;
      this.description=description;
   }
}
class Plan{
   constructor(breakfast,lunch,snack1,dinner,snack2)
   {
      this.breakfast=breakfast;
      this.lunch=lunch;
      this.snack1=snack1;
      this.dinner=dinner;
      this.snack2=snack2;
   }
}

//For testing purposes some meals and plans are already created
var pbjSandwich = new Meal("PeanutButter Jelly Sandwich","pics/pbj.jpg","Peanut butter and jam sandwich, a classic!");
var chickenstew = new Meal("Chicken Stew", "pics/chickenstew.jpg","Combine chicken, mushrooms, onion, carrots and stock in a large saucepan over medium heat. Simmer until carrots are tender, about 10 minute, Stir in sage, basil, garlic salt, parsley, mixed vegetables, potatoes and celery and cook until heated through. Stir in flour to thicken sauce, then serve.")
var meatstew = new Meal("Beaf Stew", "pics/meatstew.jpg","In a large pot or dutch oven, cook beef in oil over medium heat until brown. Dissolve bouillon in water and pour into pot. Stir in rosemary, parsley and pepper. Bring to a boil, then reduce heat, cover and simmer 1 hour.Stir potatoes, carrots, celery, and onion into the pot. Dissolve cornstarch in 2 teaspoons cold water and stir into stew. Cover and simmer 1 hour more.")
var yogurt = new Meal("Blueberry Yogurt", "pics/yogurt.jpg","No secrets here, just add the blueberries to the yogurt!");

//Underweight
planUP = new Plan(pbjSandwich,chickenstew,yogurt,meatstew,pbjSandwich);
planUM= new Plan(pbjSandwich,chickenstew,yogurt,meatstew,pbjSandwich);
planUR= new Plan(pbjSandwich,chickenstew,yogurt,meatstew,pbjSandwich);
//Healthy
planHP= new Plan(yogurt,yogurt,yogurt,yogurt,yogurt);
planHM= new Plan(chickenstew,pbjSandwich,chickenstew,pbjSandwich,pbjSandwich);
planHR= new Plan(yogurt,chickenstew,pbjSandwich,pbjSandwich,chickenstew);
//Overweight
planOP= new Plan(yogurt,pbjSandwich,yogurt,pbjSandwich,yogurt);
planOM= new Plan(pbjSandwich,meatstew,pbjSandwich,meatstew,pbjSandwich);
planOR= new Plan(yogurt,pbjSandwich,yogurt,pbjSandwich,yogurt);
//Obese
planBP= new Plan(chickenstew,meatstew,pbjSandwich,meatstew,pbjSandwich);
planBM= new Plan(chickenstew,meatstew,pbjSandwich,meatstew,pbjSandwich);
planBR= new Plan(chickenstew,meatstew,pbjSandwich,meatstew,pbjSandwich);

//Save preset plans to data.storage
function savePreSetPlans()
{
localStorage.setItem("planUP"+1,JSON.stringify(planUP));      
localStorage.setItem("planUM"+1,JSON.stringify(planUM));     
localStorage.setItem("planUR"+1,JSON.stringify(planUR));     
localStorage.setItem("planHP"+1,JSON.stringify(planHP));     
localStorage.setItem("planHM"+1,JSON.stringify(planHM));     
localStorage.setItem("planHR"+1,JSON.stringify(planHR));     
localStorage.setItem("planOP"+1,JSON.stringify(planOP));     
localStorage.setItem("planOM"+1,JSON.stringify(planOM));     
localStorage.setItem("planOR"+1,JSON.stringify(planOR));     
localStorage.setItem("planBP"+1,JSON.stringify(planBP));     
localStorage.setItem("planBM"+1,JSON.stringify(planBM));     
localStorage.setItem("planBR"+1,JSON.stringify(planBR));    
} 
//Create an array of the plans according to the plan type given
function createArrayPlans(plantype)
{
   var arr = [];    
   for (var i = 0; i < localStorage.length; i++)
   {
          if (localStorage.key(i).substring(0,6) == plantype) {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
   }
   return arr;
  }   

//Randomly selects a plan from the one's on the local storage
function selectPlan(plantype)
{
   var arrPlans = createArrayPlans(plantype);
   console.log("arrplans:"+arrPlans)
   return arrPlans[Math.floor(Math.random()*arrPlans.length)];   
}
//Generate a user without need of login
function generateUser()
{
   newUser = new User(document.getElementById("weight").value,document.getElementById("height").value,document.getElementById("budget").value);   
   Cookies.set('loggedUser', newUser);   
   window.open("meal.html"); 
   console.log(newUser);   
}
//Retrieves the information from the user on the page, be it a registered user or a not registered one
function getLoggedUser()
{
   var currUser;
   if(Cookies.get('loggedUser')==null)
   {
      return null;
   }
   else{
      currUser = JSON.parse(Cookies.get('loggedUser'));
   }   
   return currUser;
}

function generateMeal(budget, type)
{  
   
   //Function to determinate which kind of meal will be sent to customer, in this implementation it is not following any medical suggestions and is based on BMI calculation only (Body mass index)
      switch(true)
   {
      case(budget>200):      
      console.log("Rich");
               if(type == "Underweight")
               {
                  //Meal should be high in calories                  
                  return selectPlan("planUR");
               }
               else if(type == "Healthyweight")
               {
                  //Meal should be normal in calories
                  return selectPlan("planHR");
               }
               else if(type == "Overweight")
               {
                  //Meal should be low in calories
                  return selectPlan("planOR");
               }
               else if(type == "Obese")
               {
                  //Meal should be lower in calories
                  return selectPlan("planBR"); }
               break;

      case(100<budget && budget<=200):      
      console.log("medium");
               if(type == "Underweight")
               {
                  //Meal should be high in calories
                  return selectPlan("planUM");
               }
               else if(type == "Healthyweight")
               {
                  //Meal should be normal in calories
                  return selectPlan("planHM");
               }
               else if(type == "Overweight")
               {
                  //Meal should be low in calories
                  return selectPlan("planOM");
               }
               else if(type == "Obese")
               {
                  //Meal should be lower in calories
                  return selectPlan("planBM"); }
               break;
      case(budget<=100):      
      console.log("Poor");
               if(type == "Underweight")
               {
                  //Meal should be high in calories
                  return selectPlan("planUP");
               }
               else if(type == "Healthyweight")
               {
                  //Meal should be normal in calories
                  return selectPlan("planHP");
               }
               else if(type == "Overweight")
               {
                  //Meal should be low in calories
                  return selectPlan("planOP");
               }
               else if(type == "Obese")
               {
                  //Meal should be lower in calories
                  return selectPlan("planBP"); }
               break;
   }
}

function displayMeal()
{
  
   plan = getLoggedUser().plan;
   console.log(plan);
      //populating breakfast info
      document.getElementById("breakfast").src = plan.breakfast.picture;      
      document.getElementById("title_breakfast").innerHTML = plan.breakfast.title;      
      document.getElementById("desc_breakfast").innerHTML = plan.breakfast.description;

      
      //populating lunch info
      document.getElementById("lunch").src = plan.lunch.picture;      
      document.getElementById("title_lunch").innerHTML = plan.lunch.title;      
      document.getElementById("desc_lunch").innerHTML = plan.lunch.description;

      
      //populating snack1 info
      document.getElementById("snack1").src = plan.snack1.picture;      
      document.getElementById("title_snack1").innerHTML = plan.snack1.title;      
      document.getElementById("desc_snack1").innerHTML = plan.snack1.description;

      
      //populating dinner info
      document.getElementById("dinner").src = plan.dinner.picture;      
      document.getElementById("title_dinner").innerHTML = plan.dinner.title;      
      document.getElementById("desc_dinner").innerHTML = plan.dinner.description;

      
      //populating snack2 info
      document.getElementById("snack2").src = plan.snack2.picture;      
      document.getElementById("title_snack2").innerHTML = plan.snack2.title;      
      document.getElementById("desc_snack2").innerHTML = plan.snack2.description;
}

//Save meal if user is registered
function saveMeal()
{
   if(Cookies.get("loggedRegUser") != null)
   {
      var currUser = JSON.parse(getUser(Cookies.get("loggedRegUser")));      
      currUser.user = getLoggedUser();
      console.log(currUser);
      localStorage.setItem(currUser.username,JSON.stringify(currUser)); 
      alert("Meal saved successfully!");        

   }
   else{
      alert("You are not logged in to save your meal, please log in first!");
   }

}

//JQuery to call functions from login.js
$.getScript("login.js", function() { });