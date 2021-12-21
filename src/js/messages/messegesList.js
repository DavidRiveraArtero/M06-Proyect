export class MessagesList{

    messages;

    constructor ()
    {
        this.carregarLocalStorage();           
    }

    nouMessages(message) {
        this.messages.push(message);
        this.desarLocalStorage();
    }

    desarLocalStorage() {
        localStorage.setItem('messages',JSON.stringify(this.messages));
    }

    carregarLocalStorage() {
        this.messages = ( localStorage.getItem('messages') )
                        ? JSON.parse( localStorage.getItem('messages') )
                        : [];
    }
       
    lastIndex(){
        var ultid = this.messages.length
        if (ultid == 0) return -1
        return this.messages[ultid-1].id;
    }

    delete(idmensaje){
        let configuracio =  localStorage.getItem("messages");
        let conf = JSON.parse(configuracio);
        console.log(conf);

        // --------- Recoger los valores de configuracion ---------
        for (var i in conf)
        {
            var id =  conf[i].id;
            console.log(id);
            console.log(idmensaje);
            if (id == idmensaje)
            {
                this.messages.splice(idmensaje,1);
                this.desarLocalStorage();
                break;
            }
        }
    }
    update(idmensaje,cambios){
        let configuracio =  localStorage.getItem("messages");
        let conf = JSON.parse(configuracio);

        for (var i in conf)
        {
            var id =  conf[i].id;
            if (id == idmensaje)
            {
                this.messages[idmensaje].message = cambios;
                this.desarLocalStorage();
                break;
            }
        }


    }
}