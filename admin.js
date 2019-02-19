function addMeal(){
   var file    = document.querySelector('input[type=file]').files[0]; //sames as here
   var reader  = new FileReader();
  
   if (file) {
       reader.readAsDataURL(file); //reads the data as a URL
   } else {
       preview.src = "";
   }
   
}


$.getScript("index.js", function() { });