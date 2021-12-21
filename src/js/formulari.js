// IMPORTS
import {Tickets} from "./classes/tickets.js"
import {llistadetickets} from "../index"
import {AssetsList} from "./classes/assetsList.js";
import {llistadeassets} from "../index"

// CREEM FORMULARI
export function crearFormulariHtml()
{
    // AGAFEM ASSETS
    let option="";
    for (let i of llistadeassets.assets){
        option += "<option value='"+i.id_asset+"'>"+i.location+" "+i.model+"</option>"
    }
    
    // FEM HTML
    let html = `
        <label for="title">TITOL: </label>
        <input type="text" value="Títol a ficar" name="title" id="title" /><br><br>

        <label for="desc">DESCRIPCIÓ: </label>
        <input type="text" value="Descripció de ticket" name="desc" id="desc" /><br><br>

        <label for="asset_id">ASSET: </label>
        <select name="asset_id" id="asset_id">
            ${option}
        </select><br><br>

        <button id="enviar">ENVIAR</button>

        <div class="total">
            <h1 class="titolmostrarticket">MOSTRAR TICKETS</h1>
            <div class="agenda">
                <table id="taula">
                    <tr class="fila" id="fila">
                        <th colspan="1">ID</th>
                        <th colspan="1">TITLE</th>
                        <th colspan="1">DESCRIPTION</th>
                        <th colspan="1">ID ASSIGNED</th>
                        <th colspan="1">ASSET</th>
                        <th colspan="1">CREATION DATE</th>
                        <th colspan="1">UPDATED</th>
                        <th colspan="1">OPTIONS</th>
                    </tr>
            </div>
        </div>
    `;

    // CREEM DIV DINS DE BODY
    var div = document.createElement("div");
    document.body.appendChild(div);  
    
    // MOSTRAR TOTS ELS TICKETS CREATS
    llistadetickets.tickets.forEach( (v) => {
        html += `
            <tr>
                <td>${v.id}</td>
                <td><input type="text" value=${v.title} readonly /></td>
                <td><input type="text" value=${v.desc} readonly /></td>
                <td>${v.assigned_id}</td>
                <td>${llistadeassets.cercaTicketAsset_id(v.asset_id)}</td>
                <td>${v.created}</td>
                <td>${llistadetickets.cercaTicketUpdated(v.id)}</td>
                <td>
                    <button><i class="fa fa-eye" style="font-size:28px"></i></button>
                    <button class="editar" id="editar"><i class="editar material-icons">settings</i></button>
                    <button class="brosa" id="brosa"><i style="font-size:28px" class="fa">&#xf1f8;</i></button>
                </td>
            </tr>
        `
    }); 

    // INTRODUIM AL DIV L'HTML
    div.innerHTML=html

    // SI FEM CLICK AL BOTÓ ENVIAR
    var enviar = document.getElementById("enviar");
    enviar.addEventListener("click", event =>{    
        event.preventDefault();
    
        console.log("aaa")
        console.log(llistadetickets)
        // CREEM NOU TICKET

        var id = parseInt(llistadetickets.lastIndex())+1;
        var title = document.getElementById("title");
        var desc = document.getElementById("desc");
        var author_id = 1;
        var asset_id = document.getElementById("asset_id");
        title = title.value;
        desc = desc.value;
        author_id = author_id.value;
        asset_id = asset_id.value;
    
        var created = new Date();
        var assigned_id = 0;
        var updated = null;
        
        const ticket = new Tickets(id,title,desc,author_id,assigned_id,asset_id,created,updated);
    
        // INTRODUIM NOU TICKET
        llistadetickets.nouTicket(ticket);

        // RECARREGUEM PÀGINA
        location.reload();
    });

    // SI FEM CLICK A CONTINGUTS DE LA TAULA
    var taula = document.getElementById("taula");
    var edit = true;
    var edits = [];
    taula.addEventListener("click", event=>{
        event.preventDefault();
        // SI FEM CLICK AL BOTÓ BROSA
        // if(event.target.className=="brosa"){
        //     event.target.parentNode.parentNode.remove();
        // }
        
        // SI FEM CLICK A LA ICONA BROSA
        if(event.target.className=="fa"){
            event.target.parentNode.parentNode.parentNode.remove();
            var idticket = event.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML;
            console.log(idticket)
            llistadetickets.delete(idticket);
            // llistadetickets.delete(idticket);
        }
        
        // SI FEM CLICK A LA ICONA EDITAR
        if(event.target.className.includes("editar")){
            var idticket = event.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML;
            var inputs = event.target.parentNode.parentNode.parentNode.getElementsByTagName("input");
            console.log(inputs)
            // SI VOL EDITAR
            if(edit){
                for(var i=0; i<inputs.length;i++){
                    inputs[i].removeAttribute("readonly");
                }
                edit=false;
            }
            // SI VOL DESAR CANVIS
            else{
                for(var i=0; i<inputs.length;i++){
                    inputs[i].setAttribute("readonly","true");
                    console.log(inputs[i].value)
                    edits.push(inputs[i].value);
                }
                llistadetickets.edit(idticket,edits)
                edits = [];
                edit=true;
            }
        }

    });
}