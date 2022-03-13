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
        // emptyContact: false,
        // deletedChat: 0,
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
        contacts: {
            visible: [],
            deleted: [],
            // tmpInputSearch: [],
        },
        clicked:0,
        header: {
            iconMenuOpen: false,
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

        /**
         * 
         * @param {*} name 
         * @returns Array $name: Iniziali di Name
         */
        name_initials (name){
            const initials = [];
            name.split(' ').forEach(el => {
                initials.push (el[0]);
            });
            return initials;
        },

        /**
         * Modifica lo status di notification container 
         */
        notificationsStatusChange() {
            this.main.notificationsContainer.clicked = !this.main.notificationsContainer.clicked;
        },

        /**
         * funzione che prende il testo del messaggio e lo pusha nell'array messaggi corretto
         */
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
                this.contacts.visible[this.clicked].messages.push(message);
                this.contacts.visible[this.clicked].last_access[0] = 'oggi alle ' + dayjs().format('HH:mm:ss');
                
                this.main.footer.input.value = '';
            }
        },

        /**
         * Genera una risposta automatica
         */
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
                app.contacts.visible[app.clicked].messages.push(message);
                app.contacts.visible[app.clicked].status = 2;
            };
            this.contacts.visible[this.clicked].status = 1;
            
            setTimeout(() => { app.contacts.visible[app.clicked].status = 0},2000);
            setTimeout(message_received, 1000);
        },

        /**
         * 
         * @returns random answer
         */
        randomAnswer() {
            function rndNum(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            return this.answers[rndNum(0, this.answers.length - 1)];
        },

        /**
         * Reset all menu
         */
        hideMenu() {
            this.contacts.visible[this.clicked].messages.forEach(el => {
                el.clicked = false;
            });
        },
        // Show Menu
        showMenu (i){
            this.contacts.visible[this.clicked].messages.forEach((el, index) => {
                if (el.clicked && index != i) {
                    el.clicked = false;
                }
            });             
            this.contacts.visible[this.clicked].messages[i].clicked = !this.contacts.visible[this.clicked].messages[i].clicked;
            this.closeIconMenu();
        },

        // Delete a message
        deleteMessage(i) {
            if(this.contacts.visible[this.clicked].messages.length > 0) {
                this.contacts.visible[this.clicked].messages[i].saved = false;
            }
        },

        // Return last message
        findLastMessage(i) {
            if(this.contacts.visible[i].messages.length > 0) {
                const saved = this.contacts.visible[i].messages.filter((el)=> {
                    return el.saved==true;
                });
                return (saved.length != 0) ? saved[saved.length - 1].text : '';
            }
        },
        findLastDate(i) {
            if(this.contacts.visible[i].messages.length > 0) {
                const saved = this.contacts.visible[i].messages.filter((el) => {
                    return el.saved == true;
                });
                return (saved.length != 0) ? saved[saved.length - 1].date : '';
            }
        },
        checkIcon(i) {
            if(i == 2) {
                this.header.iconMenuOpen = !this.header.iconMenuOpen;
                this.hideMenu();
            }
        },
        closeIconMenu () {
            this.header.iconMenuOpen = false;
        },
        clearChat() {
            if (this.contacts.visible[this.clicked].messages.length > 0) {
                this.contacts.visible[this.clicked].messages.forEach(el => {
                   el.saved = false; 
                });
                this.closeIconMenu();
            }
        },
        changeClicked(i) {
            if(this.contacts.visible.length === 0) {
                this.clicked = 0;
            } else {

                this.clicked = i;
            }
        },
        findFirstIndexVisible() {
            const visible = [];
            this.contacts.visible.map(((el, index) => {
                visible.push(index);
            }));
            this.clicked = visible [0];
        },
        deleteChat() {
            this.closeIconMenu();

            this.contacts.visible[this.clicked].messages.splice(0,this.contacts.visible[this.clicked].messages.length);
            
            this.contacts.deleted.push(this.contacts.visible[this.clicked]);
            this.contacts.visible.splice(this.clicked,1);
            
        },
        // TROVA UN CONTATTO AL CLICK SU INPUT-SEARCH
        searchContact (){
            this.closeIconMenu();
            const tmp = [];

            if(this.main.input.value.trim() !== '') {
                this.contacts.deleted.forEach(function (el) {
                        tmp.push(el);
                    });
                this.contacts.visible.forEach(function (el) {
                        tmp.push(el);
                    });

                this.contacts.visible.splice(0,this.contacts.visible.length);
                this.contacts.deleted.splice(0,this.contacts.deleted.length);
                
                console.log();
                tmp.forEach((el) => {
                    el.name.toLowerCase().includes(this.main.input.value.toLowerCase().trim()) ? this.contacts.visible.push(el) : this.contacts.deleted.push(el);
                });
                this.clicked = 0;
            } else {
                const tmp = this.contacts.deleted;
                while(this.contacts.deleted.length > 0) {
                    tmp.forEach((el,index) => {
                            if(el.messages.length > 0) {
                                this.contacts.visible.push(el);
                            };
                            this.contacts.deleted.splice(index,1);
                    });
                }
                this.clicked = 0;
            }
        }
    },
    // POPOLAMENTO DA FAKE DB
    created () {
        // CONTATTI
        this.contacts.visible = [
            {

                // emptyContact: false,
                name: "Michele",
                avatar: "_1",
                // visible: true,
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
                // emptyContact: false,
                name: "Fabio",
                avatar: "_2",
                // visible: true,
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
                // emptyContact: false,
                name: "Samuele",
                avatar: "_3",
                // visible: true,
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
                // emptyContact: false,
                name: "Luisa",
                avatar: "_4",
                // visible: true,
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
        // UTENTE CONNESSO
        this.user  = {
            name: 'Claudio',
            avatar: '_5',
        }
    },
});