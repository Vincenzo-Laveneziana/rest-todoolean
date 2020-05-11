$(document).ready(function (){
  console.log("js -- jquery is ready");

  //handlebars
  var source = $("#handlebars-template").html();
  var template = Handlebars.compile(source);
  

  //Referenze
  
  var input = $("#new-todo");
  var btn = $("#new-todo-btn");
  var listTodo = $(".list-todo");
  var urlApi = "http://157.230.17.132:3008/todos";


  printAllTodo(urlApi, listTodo, template);


  btn.click(() =>{
    addTodo(input, urlApi, listTodo, template);
  })

 /*  listTodo.on('click',".remove", function()({
    var idremove = $(this).data("id");
    console.log(idremove);
    
    
    deleteTodo(idremove,urlApi, listTodo, template);
    
  }) */

  listTodo.on("click","remove", function(){
    console.log(idremove);
    
    
    deleteTodo($(this),urlApi, listTodo, template);
  })

});


/* 
  Function
*/


//aggiungi una nuova Todo (Crud)
function addTodo(input, urlApi, listTodo, template){
  
  var todoValue = input.val().trim();

  var settings = {
    url: urlApi,
    method: "POST",
    data : {
      text: todoValue
    }
  }
  
  $.ajax(settings)
  .done(() =>{
    printAllTodo(urlApi, listTodo, template)
  })
  .fail(error =>{
    console.log("Si è verificato un errore " + error.status);
  })
  
}



//printa tutte le todo presente nell'api (cRud)
function printAllTodo(urlApi, listTodo, template){
  listTodo.html("");

  var settings = {
    url: urlApi,
    method: "GET"
  }

  $.ajax(settings)
    .done(dati => {

      dati.forEach(dati => {

        var context = {
          todo: dati.text,
          id: dati.id
        }
    
        listTodo.append(template(context))
      })
       listTodo.on('click',".remove", () =>{
      var idremove = $(this).data("id");
      console.log(idremove);
      
      
      deleteTodo(idremove,urlApi, listTodo, template);

      })
    })
    .fail(error =>{
      console.log("Si è verificato un errore " + error.status);
    })
}

//eleminina todo seguente (cruD)
function deleteTodo(self, urlApi, listTodo, template){
  var idremove = self.data("id");

  
  var settings = {
    url: urlApi + "/" + idremove,
    method: "DELETE"
  }

  $.ajax(settings)
  .done(() =>{
    printAllTodo(urlApi, listTodo, template);
  })
  .fail(error =>{
    console.log("Si è verificato un errore " + error.status);
  })
}

