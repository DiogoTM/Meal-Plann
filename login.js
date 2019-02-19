  class regUser{
       constructor(username,fname,lname,email,password,user)
       {
           this.username=username;
           this.fname=fname;
           this.lname=lname;
           this.email=email;
           this.password = password;
           this.user=user;          
       }
   }
   
   function generateRegUser()
   { 
       var user;     
       user = new User(0,0,0);     
        var newRegUser = new regUser(document.getElementById("userName").value,document.getElementById("fName").value,
        document.getElementById("lName").value,document.getElementById("email").value, document.getElementById("password1").value,user);    
        return newRegUser; 
   }
   
   function saveUser()
   {
    user = generateRegUser();        
    console.log(user);
    if (verifyAccount(document.getElementById("userName").value) == 1) {
                
            if (document.getElementById("password1").value === document.getElementById("password2").value) {
            localStorage.setItem(user.username,JSON.stringify(user));         
            alert("Account registered succesfully!");
            setCookieSession(user);     
            }
            else {
                alert("Please verify the password entered.");
            }
        }
        else {
            alert("Account already exists, enter a new user name");
        }
   }
   //Function removed to give place to saveUser, which saves to local storage instead of Cookies.
   /*function SetCookies() {     
   
    user = generateRegUser();        
    if (verifyAccount(document.getElementById("userName").value) == 1) {
                
            if (document.getElementById("password1").value === document.getElementById("password2").value) {
            Cookies.set(user.username, user);
         
            setCookieSession();     
            }
            else {
                alert("Please verify the password entered.");
            }
        }
        else {
            alert("Account already exists, enter a new user name");
        }
    }*/

    //Save to cookies the current user logged in
    function setCookieSession(logUser){
    
        Cookies.set('loggedRegUser', logUser.username);   
        Cookies.set('loggedUser', logUser.user); 
        window.open("index.html"); 
    }
 
    //returns the logged user 
    function getUser()
    {
        var currUser = JSON.parse(Cookies.get('loggedUser'));
        var retrieve = localStorage.getItem(currUser);
        return retrieve;
    }
    //returns a user, given it's username
    function getUser(username)
    {
        var retrieve = localStorage.getItem(username);
        return retrieve;
    }

    //verify validity of account before accepting to register
    function verifyAccount(abcd) {
        var arr = document.cookie.split('$');
        for (var i = 1; i < arr.length; i++) {
            var sarr = arr[i].split('=');
            if (sarr[0] == "userName" && sarr[1] == abcd) {
                return 0;
            };
        }
        return 1;
    }

    //Check if login is valid
    function CheckLogin() {
        var a = document.getElementById("userName").value;
        var b = document.getElementById("password").value;
        console.log(localStorage);
        var chkUser, chkPswd;
        var retrievedUser = localStorage.getItem(a);
        console.log(retrievedUser);        
        var currUser = JSON.parse(retrievedUser);  
        console.log(currUser);   
       
        if(currUser != null){
        
            console.log(1);
            chkUser = a;
            chkPswd = b;
            
            if (chkUser === currUser.username && chkPswd === currUser.password) {     
                console.log(2);  
                alert("Welcome back!");
                setCookieSession(currUser);

                window.open("index.html");
            }
        }  
        else {
            alert("Something is wrong, please try again");
        }
    }
    $.getScript("meal.js", function() { });