


export class TicketsList {

    tickets;

    constructor()
    {
        this.carregarLocalStorage();
    }

    nouTicket(ticket) {
        this.tickets.push(ticket);
        this.desarLocalStorage();
    }

    desarLocalStorage(){
        localStorage.setItem('tickets',JSON.stringify(this.tickets));
    }
    
    carregarLocalStorage(){
        this.tickets = (localStorage.getItem('tickets'))
                        ? JSON.parse(localStorage.getItem('tickets'))
                        : [];
    }

    cercaTicketAssigned_id(id) {
        for (let i of this.tickets)
        {
            if (i.id == id){
                return i.assigned_id;
            }
        }
        return "nufunciunu";
    }

    cercaTicketUpdated(id) {
        for (let i of this.tickets)
        {
            if (i.id == id){
                if (i.updated == null){
                    return i.created;
                }
                else{return i.updated;}                
            }
        }
    }

    lastIndex(){
        var last = this.tickets.length;
        if (last == 0) return -1
        return this.tickets[last-1].id;
    }

    delete(idticket){
        let configuracio = localStorage.getItem('tickets');
        let conf = JSON.parse(configuracio);

        // RECORRER VALORS
        for(var i in conf){
            var id = conf[i].id;
            if(id == idticket){
                this.tickets.splice(conf[i],1);
                this.desarLocalStorage();
                break;
            }
        }
    }

    edit(idticket, edits){
        let configuracio = localStorage.getItem('tickets');
        let conf = JSON.parse(configuracio);

        // RECORRER VALORS
        for(var i in conf){
            var id = conf[i].id;
            if(id == idticket){
                this.tickets[id].title = edits[0];
                this.tickets[id].desc = edits[1];
                this.desarLocalStorage();
                break;
            }
        }  
    }
}

