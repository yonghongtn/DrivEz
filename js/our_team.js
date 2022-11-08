const app = Vue.createApp({
    data() {
        return {
            members: [
                {name:"Ivan", description:"", pic:"img/ivan.jpg", website:"https://0venoven.github.io/ "},
                {name:"James", description:"Hello, I am James. In my free time, I like to eat hotpot!", pic:"img/james.jpeg",website:"https://yonghongtn.github.io/"},
                {name:"Samuel", description:"", pic:"img/samuel.jpg",website:"https://samuelsmuscis.github.io/"},
                {name:"Yin Kit", description:"I like cats! MEOW!", pic:"img/yinkit.jpg",website:"https://ngyinkit.github.io"},
            ],
        }
    }
}).mount('#our_team');