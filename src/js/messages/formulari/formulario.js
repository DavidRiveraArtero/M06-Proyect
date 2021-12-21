import {MessagesList} from "../messegesList";
import {Messages} from "../messages";

let listamensaje = new MessagesList();
let anadir = new MessagesList();


export function creaHTMLFormulariAfegir() {
   
    let html=`
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <html>
        <p>Message: </p><input type="text" name="message" id="message" required>
        <br>        
        <fieldset>
            <legend>Donde quieres enviar el mensage:</legend>
            <label><input type="radio" name="opciones" id="privado" required> Privado</label>
            <label><input type="radio" name="opciones" id="publico"> Publico</label>
        </fieldset>
        <br>
        <div id="elegir">
        </div>
        <p id="contacte"></p>
        <p id="grupp"></p>
        <input type="button" id="revisar" value="Revisar">
        <input type="submit" id="guardar" value="Guardar y aplicar">
        <br>
        <table class="default" id="info" >
            <caption>Información sobre cada mensaje</caption>
            <tr class="inf">
                <td>Id</td>
                <td>Author</td>
                <td>Mensaje</td>
                <td>Fecha</td>
                <td>Privado(true) o Publico(false)</td>
                <td>Destino</td>
                <td>Opciones</td>
            </tr>

    </html>
    `
    var div = document.createElement("div");
    document.body.appendChild(div);

    // CREAR EL INTPUT MOSTRAR LA INFORMACION
    listamensaje.messages.forEach((v, i, array) => {
        html+= `
            <tr id="a">
                <td class="ocultar">${v.id}</td>
                <td class="ocultar">${v.author_id}</td>
                <td>
                    <input type="text" id="msm" readonly value="${v.message}">
                </td>
                <td class="ocultar" >${v.created}</td>
                <td class="ocultar" >${v.privpub}</td>
                <td class="ocultar" >${v.desti}</td>
                <td>
                    <button > <i id="eliminar" class="fa fa-trash" aria-hidden="true"></i> </button>
                    <button > <i id="editar" class="fa fa-cog" aria-hidden="true"></i> </button>
                    <button > <i id="ver" class="fa fa-eye" aria-hidden="true"></i> </button>
                </td>
            </tr>
        `
    });

    div.innerHTML=html;

    // VARIABLES
    var fecha = new Date();  
    var mensa;
    var privado;
    var publico;
    var privpub; // SI ES PRIVADO SERA True SI ES PUBLICO SERA False
    var desti;
    var activarEd = true;
    var cambios;

    var missatge="^[A-Z a-z 0-9]+";

    // VALIDAR FORMULARIO
    document.querySelector("#revisar").addEventListener("click",() => {
        (checkForm("#formulario"))
    });

    document.querySelector("#guardar").addEventListener("click",() => {

        if (checkForm("#formulario"))
        {    
            // --------- Recoger los valores de configuracion ---------
            var Antid = 0;
            var Antauthor_id = 0;

            mensa = document.querySelector("#message").value;
            desti = document.querySelector("#desinatario").value;
            Antid = parseInt(listamensaje.lastIndex()) +1;
            Antauthor_id = parseInt(listamensaje.lastIndex()) +1;

            var tabla = new Messages(Antid,Antauthor_id, mensa, fecha, privpub, desti)

            anadir.nouMessages(tabla);
            location.reload(); // Recargar página
        }
    });

    document.getElementById("info").addEventListener("click", (event) => {
        var id = event.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML;

        if (event.target.id == "eliminar")
        {
            event.target.parentNode.parentNode.parentNode.remove();
            listamensaje.delete(id);

        }
        if (event.target.id == "editar")
        {
            var fila = event.target.parentNode.parentNode.parentNode.querySelector("input");
            if (activarEd)
            {   
                fila.removeAttribute("readonly");
                activarEd = false;
            }
            else{
                fila.setAttribute("readonly", "true");
                activarEd = true;
                cambios = fila.value
                console.log(cambios);
                listamensaje.update(id,cambios);
            }
        }
        else{
            // document.getElementsByClassName(".ocultar").toggle();
            // $('td:nth-child(3)').toggle();
        }
    })


    // FUNCIONES
    function checkInput(idInput, patt)
    {
        return patt.test(document.querySelector(idInput).value) ? true : false;    
    }

    // COMPROVACIÓN
    function checkForm(idForm)
    {
        var pattM = new RegExp(missatge);
        var missatgeCorrecte = false;

        privado = document.querySelector("#privado").checked
        publico = document.querySelector("#publico").checked
        if (privado) { privpub=true; }
        if (publico) { privpub=false; }

        if (checkInput("#message",pattM) && ( privado || publico))
        {
            console.log("Correcte")
            missatgeCorrecte=true;
        }
        else { 
            console.log("---ERROR---")
            missatgeCorrecte=false;
        }
        if (missatgeCorrecte)
        {
            PrivadoPublico(privado)
        }

        return missatgeCorrecte;
    }

    // QUE A ESCOGIDO PRIVADO O PUBLICO?
    function PrivadoPublico(privado)
    {
        // COMPROVAR SI EXISTE YA UNA OPCIÓN CREADA
        var comprovarDesti = document.getElementById("destino");
        if (comprovarDesti != null)
        {
            comprovarDesti.remove();
        }
        if (privado)
        {
            console.log("Ha entrado");
            // CREAR EL INTPUT PARA ELEGIR CONTACTO
            // --------- CREAR OPCIONES DE CONTACTO ---------
            var elegir = document.getElementById("elegir");
            var parrafo = document.createElement("p");
            var select = document.createElement("select");
            var option = document.createElement("option");
            parrafo.id="destino";
            parrafo.innerHTML="Contacto:";
            select.id="desinatario";
            option.innerHTML="Contacto1";
            select.appendChild(option);
            parrafo.appendChild(select);
            elegir.appendChild(parrafo);
        }
        // var comprovarGrupo = document.getElementById("grupo");
        if (publico)
        {
            // CREAR EL INTPUT PARA ELEGIR GRUPO
            var elegir = document.getElementById("elegir");
            var parrafo = document.createElement("p");
            var select = document.createElement("select");
            var option = document.createElement("option");
            parrafo.id="destino";
            parrafo.innerHTML="Grupo:";
            select.id="desinatario";
            option.innerHTML="Grupo1";
            select.appendChild(option);
            parrafo.appendChild(select);
            elegir.appendChild(parrafo);
        }
        return true;
    }
}