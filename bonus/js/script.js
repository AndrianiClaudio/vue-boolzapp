// ● sotto al nome del contatto nella parte in alto a destra, cambiare l'indicazione dello
// stato: visualizzare il testo "sta scrivendo..." nel timeout in cui il pc risponde, poi
// mantenere la scritta "online" per un paio di secondi e infine visualizzare "ultimo
// accesso alle xx:yy" con l'orario corretto
// ---------------------------------------------------------------------------------------------
// ● dare la possibilità all'utente di cancellare tutti i messaggi di un contatto o di
// cancellare l'intera chat con tutti i suoi dati: cliccando sull'icona con i tre pallini in alto a
// destra, si apre un dropdown menu in cui sono presenti le voci "Elimina messaggi" ed
// "Elimina chat"; cliccando su di essi si cancellano rispettivamente tutti i messaggi di
// quel contatto(quindi rimane la conversazione vuota) oppure l'intera chat
// comprensiva di tutti i dati del contatto oltre che tutti i suoi messaggi(quindi sparisce il
// contatto anche dalla lista di sinistra)
// ---------------------------------------------------------------------------------------------
// ● visualizzare un messaggio di benvenuto che invita l'utente a selezionare un contatto
// dalla lista per visualizzare i suoi messaggi, anziché attivare di default la prima
// conversazione
// ---------------------------------------------------------------------------------------------
// ● aggiungere una splash page visibile per 1s all'apertura dell'app
// ---------------------------------------------------------------------------------------------
// ● aggiungere un'icona per cambiare la modalità light/dark
// ---------------------------------------------------------------------------------------------
// ● aggiungere un'icona per ingrandire o rimpicciolire il font
// ---------------------------------------------------------------------------------------------


// ● evitare che l'utente possa inviare un messaggio vuoto o composto solamente da
// spazi
// ---------------------------------------------------------------------------------------------
const app = new Vue ({
    el: '#app',
    data: {
        answers: [
            'Ciao, da quanto tempo! Che cosa mi racconti?',
            'Oggi il corso inizia alle 9. Mi sono svegliato prima.',
            'Io e Marco andiamo assieme al concerto dei Beatles.',
            'Hai preso i regali di natale?',
            'Bene, tu?',
            'Siamo andati a vedere la partita di pallavolo di Angela',
            'Ci beviamo qualcosa tutti assieme in questi giorni?',
        ],
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
                    },
                    {
                        family: 'fas',
                        prefix: 'fa-',
                        name: 'plane',
                    },
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
        // funzione che prende il testo del messaggio e lo pusha nell'array messaggi corretto
        //devo sapere il contact a cui inviare...
        sendMessage() {
            //trim rimuove gli spazi iniziali e finali
            this.main.footer.input.value = this.main.footer.input.value.trim();
            if (this.main.footer.input.value.length > 0) {
                const message = {
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: this.main.footer.input.value,
                    status: "sent",
                    clicked: false,
                    saved: true,
                };
                this.contacts[this.clicked].messages.push(message);
                this.main.footer.input.value = '';
            }
        },
        receivedTimed() {
            function message_received () {
                const txt = app.randomAnswer();
                const message = {
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: txt,
                    status: "received",
                    clicked: false,
                    saved: true,
                };
                app.contacts[app.clicked].messages.push(message);
                app.contacts[app.clicked].status = 2;
            };
            this.contacts[this.clicked].status = 1;
            setTimeout(() => { app.contacts[app.clicked].status = 0},2000);
            setTimeout(message_received, 1000);
        },
        randomAnswer() {
            function rndNum(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            return this.answers[rndNum(0, this.answers.length - 1)];
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
        },
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
                last_access: ['21/10/2020 16:15:22','Sta scrivendo ...','Online'],
                status: 0,
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
                last_access: ['28/03/2020 16:10:32', 'Sta scrivendo ...', 'Online'],
                status: 0,
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
                last_access: ['28/03/2020 16:15:22', 'Sta scrivendo ...', 'Online'],
                status: 0,
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
                last_access: ['22/10/2020 06:10:22', 'Sta scrivendo ...', 'Online'],
                status: 0,
            }
        ];
        this.user  = {
            name: 'Claudio',
            avatar: '_5',
        }
    },
});