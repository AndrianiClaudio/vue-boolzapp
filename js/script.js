// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente(verdi) e dall’interlocutore(bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v -for, visualizzare nome e immagine di ogni contatto
// Ecco l’array contacts:


// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v -for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite(es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// Milestone 5
// ● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
// permette di cancellare il messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato / ricevuto nella lista dei contatti

const app = new Vue ({
    el: '#app',
    data: {
        user: {},
        contacts: [],
        clicked:0,
        header: {
            headerMenuIcons: [
                {
                    family: 'fas',
                    prefix: 'fa-',
                    name: 'circle-notch',
                },
                {
                    family: 'fas',
                    prefix: 'fa-',
                    name: 'comment-alt',
                },
                {
                    family: 'fas',
                    prefix: 'fa-',
                    name: 'ellipsis-v',
                },
            ],
            headerMsgMenuIcons: [
                {
                    family: 'fas',
                    prefix: 'fa-',
                    name: 'search',
                },
                {
                    family: 'fas',
                    prefix: 'fa-',
                    name: 'paperclip',
                },
                {
                    family: 'fas',
                    prefix: 'fa-',
                    name: 'ellipsis-v',
                },
            ]
        },
        main:{
            notificationsContainer: {
                icon: {
                    family: 'fas',
                    prefix: 'fa-',
                    name: 'bell-slash',
                },
                text: 'Ricevi notifiche di nuovi messaggi',
                activeText: 'Attiva notifiche dekstop',
                clicked: false,
            },
            input: {///input-search
                placeholder: 'Cerca o inizia una nuova chat',
                value: '',
                type: 'text',
                icon: {
                    family: 'fas',
                    prefix: 'fa-',
                    name: 'search',
                },
            },
            footer: {
                input: {
                    placeholder: 'Scrivi un messaggio',
                    type: 'text',
                    value: '', 
                },
                icons: [
                    {
                        family: 'far',
                        prefix: 'fa-',
                        name: 'smile',
                    },
                    {
                        family: 'fas',
                        prefix: 'fa-',
                        name: 'microphone',
                    }
                ]
            }
        },
    },
    methods: {
        chanceClicked(i) {
            this.clicked = i;
        },
        name_initials (name){
            const initials = [];
            name.split(' ').forEach(el => {
                initials.push (el[0]);
            });
            return initials;
        },
        notificationsStatusChange() {
            this.main.notificationsContainer.clicked = !this.main.notificationsContainer.clicked;
        },
        // funzione che prende il testo del messaggio e lo pusha nell'araay messaggi corretto
        //devo sapere il contact a cui inviare...
        sendMessage(e) {
            const message = {
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                text: e.target.value,
                status: "sent",
                clicked:false,
                saved: true,
            };
            this.contacts[this.clicked].messages.push(message);
            // reset input value: dopo aver inviato un messaggio, cancello il suo contenuto dalla input
            e.target.value = '';
        },
        receivedTimed() {
            function message_received () {
                const message = {
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: 'ok',
                    status: "received",
                    clicked: false,
                    saved: true,
                };
                app.contacts[app.clicked].messages.push(message);
            };
            setTimeout(message_received, 1000);
        },
        visible(i) {
            if (this.contacts[i].name.toLowerCase().indexOf(this.main.input.value.toLowerCase()) > -1) {
                this.contacts[i].visible = true;
            }
             else {
                this.contacts[i].visible = false;
            }
            return this.contacts[i].visible;
        },
        // reset di tutti i menu
        hideMenu() {
            this.contacts[this.clicked].messages.forEach(el => {
                el.clicked = false;
            });
        },
        hideMenu(i) {
            this.contacts[this.clicked].messages.forEach((el,index) => {
                if(el.clicked && index != i) {
                    el.clicked = false;
                }
            }); 
        },
        showMenu (i){
            this.hideMenu(i);
            this.contacts[this.clicked].messages[i].clicked = !this.contacts[this.clicked].messages[i].clicked;
            
        },
        deleteMessage(i) {
            this.contacts[this.clicked].messages[i].saved = false;
        },
        findLastMessage(i) {
            const saved = this.contacts[i].messages.filter((el)=> {
                return el.saved==true;
            });
            return (saved.length != 0) ? saved[saved.length - 1].text : '';
        },
        findLastDate(i) {
            const saved = this.contacts[i].messages.filter((el) => {
                return el.saved == true;
            });
            return (saved.length != 0) ? saved[saved.length - 1].date : '';
        }
    },
    created () {
        this.contacts = [
            {
                name: "Michele",
                avatar: "_1",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Hai portato a spasso il cane?",
                        status: "sent",
                        clicked: false,
                        saved: true,
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Ricordati di dargli da mangiare",
                        status: "sent",
                        clicked: false,
                        saved: true,
                    },
                    {
                        date: "10/01/2020 16:15:22",
                        text: "Tutto fatto!",
                        status: "received",
                        clicked: false,
                        saved: true,
                    },
                ],
                last_access: '21/10/2020 16:15:22',
            },
            {
                name: "Fabio",
                avatar: "_2",
                visible: true,
                messages: [
                    {
                        date: "20/03/2020 16:30:00",
                        text: "Ciao come stai?",
                        status: "sent",
                        clicked: false,
                        saved: true,
                    },
                    {
                        date: "20/03/2020 16:30:55",
                        text: "Bene grazie! Stasera ci vediamo?",
                        status: "received",
                        clicked: false,
                        saved: true,
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Mi piacerebbe ma devo andare a fare la spesa.",
                        status: "sent",
                        clicked: false,
                        saved: true,
                    },
                ],
                last_access: '28/03/2020 16:10:32',
            },
            
            {
                name: "Samuele",
                avatar: "_3",
                visible: true,
                messages: [
                    {
                        date: "28/03/2020 10:10:40",
                        text: "La Marianna va in campagna",
                        status: "received",
                        clicked: false,
                        saved: true,
                    },
                    {
                        date: "28/03/2020 10:20:10",
                        text: "Sicuro di non aver sbagliato chat?",
                        status: "sent",
                        clicked: false,
                        saved: true,
                    },
                    {
                        date: "28/03/2020 16:15:22",
                        text: "Ah scusa!",
                        status: "received",
                        clicked: false,
                        saved: true,
                    },
                ],
                last_access: '28/03/2020 16:15:22',
            },
            {
                name: "Luisa",
                avatar: "_4",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Lo sai che ha aperto una nuova pizzeria?",
                        status: "sent",
                        clicked: false,
                        saved: true,
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received",
                        clicked: false,
                        saved: true,
                    },
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Lo sai che ha aperto una nuova pizzeria?",
                        status: "sent",
                        clicked: false,
                        saved: true,
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received",
                        clicked: false,
                        saved: true,
                    },
                ],
            }
        ];
        this.user  = {
            name: 'Claudio',
            avatar: '_5',
        }
    },
});