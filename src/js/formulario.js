//import {UsuarisList} from "./classes/usuaris-list-class";
import {Board} from "./classes/boards-class";
import {ListaBoards} from "./classes/boards-list-class"

let anyadir = new ListaBoards()
let listaboards = new ListaBoards()

export function CrearFormularioHTML()
{
    var html = `

        <label>Title</label><input id='title' type="text"><br><br>
        <label>Description</label><br><textarea id='description' type="text"></textarea><br><br>
        <label>Incidencia</label>
        <select id="incidencia" name="carlist" form="carform">
            <option value="1">Opcion1</option>
            <option value="2">Opcion2</option>
            <option value="3">Opcion3</option>
            <option value="4">Opcion4</option>
        </select><br><br>
        <button class='btn btn-primary' id='guardar'>Guardar</button>
        <h1 class='TituloResult'>MOSTRAR RESULTADOS</h1>
        <table id="tabla" class="tareas">
        
        
    <tr>
        <td>id</td>
        <td>title</td>
        <td>description</td>
        <td>author_id</td>
        <td>ticket_id</td>
        <td>created</td>
        <td>Opcion</td>
    <tr>
    `
   
    
    // dom
    var div = document.createElement("div");
    document.body.appendChild(div);
    listaboards.board.forEach((v,i,array)=>{
    
        html += `<tr>
                    <td class='tdid' id='${listaboards.getId(i)}'>${listaboards.getId(i)}</td>
                    <th><input class="ocultar_input" id="Titulo${listaboards.getId(i)}" type="text" readonly value=${listaboards.getTitle(i)}></th>
                    <th><input class="ocultar_input" id="Description${listaboards.getId(i)}" type="text" readonly value=${listaboards.getDescription(i)}></th>
                    <th>${listaboards.getAuthorId(i)}</th>
                    <th>${listaboards.getTicketId(i)}</th>
                    <th>${listaboards.getCreated(i)}</th>
                    <td><button class="delete"><img src="https://img.icons8.com/material-outlined/24/000000/trash--v2.png"/></button><button class="update"><img src="https://img.icons8.com/ios/24/000000/edit--v3.png"/></button><button><img src="https://img.icons8.com/material-outlined/24/000000/closed-eye.png"/></button></td>
                </tr>`
    })
    html += `<footer>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            </footer>`
 
    div.innerHTML=html;

    var enviar = document.getElementById('guardar')
    var cont = 1;

    var borrar = document.getElementsByClassName('delete')
    var update = document.getElementsByClassName('update')
    var edit = true;
    var updates = [];
    
    // evento
    enviar.addEventListener('click', event =>
    {

        var title = document.getElementById('title')
        var description = document.getElementById('description')
        
        
        
        var opcion = document.getElementById('incidencia')

        if (title.value == '' || description.value=='')
        {
            window.alert("TODOS LOS CAMPOS SON OBLIGATORIOS")  
        }
        else
        {
        
            var newIndex = parseInt(listaboards.lastIndex()) + 1

            console.log(newIndex)

            var boards = new Board(newIndex,title.value,description.value,"2000","2001",cont,opcion.value,"2000");
            
            var alog = anyadir.postBlog(boards);
            location.reload();
        
        }
    })
    for(var x=0;x<borrar.length;x++){
        borrar[x].addEventListener('click', event =>{
            const id = event.target.parentNode.parentNode.parentNode.getElementsByClassName('tdid')[0].innerHTML
            const table = event.target.parentNode.parentNode.parentNode
            listaboards.delete(id,table)
            
        })
    }

    for(var x = 0;x<update.length;x++){
        update[x].addEventListener("click", event =>{
            var inputs = event.target.parentNode.parentNode.parentNode.getElementsByTagName("input");
            var id = event.target.parentNode.parentNode.parentNode.getElementsByClassName('tdid')[0].innerHTML
            
            console.log(inputs);
            if(edit){
                for (var y = 0;y<inputs.length;y++){
                   
                    
                    inputs[y].removeAttribute("readonly") 
                }
                edit = false

            }else{
                for (var y = 0;y<inputs.length;y++){
                    inputs[y].setAttribute("readonly", "true");
                    console.log(inputs[y].value)
                    updates.push(inputs[y].value)
                }
                listaboards.update(id,updates);
                updates = [];
                edit = true
            }
            
        })
    }

   
   
}