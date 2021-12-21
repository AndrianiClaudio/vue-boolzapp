// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente(verdi) e dall’interlocutore(bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v -for, visualizzare nome e immagine di ogni contatto
// Ecco l’array contacts:


// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v -for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato
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
                clicked: false,
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
        }
    },
    created () {
        // Ecco l’array contacts:
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
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Ricordati di dargli da mangiare",
                        status: "sent",
                    },
                    {
                        date: "10/01/2020 16:15:22",
                        text: "Tutto fatto!",
                        status: "received",
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
                    },
                    {
                        date: "20/03/2020 16:30:55",
                        text: "Bene grazie! Stasera ci vediamo?",
                        status: "received",
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Mi piacerebbe ma devo andare a fare la spesa.",
                        status: "sent",
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
                    },
                    {
                        date: "28/03/2020 10:20:10",
                        text: "Sicuro di non aver sbagliato chat?",
                        status: "sent",
                    },
                    {
                        date: "28/03/2020 16:15:22",
                        text: "Ah scusa!",
                        status: "received",
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
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received",
                    },
                ],
                last_access: '27/03/2020 22:15:22',
            },
        ];
        this.user  = {
            name: 'Claudio',
            // last_access: '21/12/2020',
            avatar: '_5',
        }
    }
});