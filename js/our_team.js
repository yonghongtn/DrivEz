const app = Vue.createApp({
    data() {
        return {
            members: [
                {name:"Ivan", title:"Chief Executive Officer",pic:"img/ivan.jpg", description:"As one of the co-founders of DrivEz, Ivan hopes to make accessing private driving instructors easier for new driving students. He is a passionate entrepreneur and has a strong background in business development and marketing.", website:"https://0venoven.github.io/"},
                {name:"Yin Kit", title:"Chief Financial Officer", pic:"img/yinkit.jpg",website:"https://ngyinkit.github.io", description:"As one of the co-founders of DrivEz, she hopes to connect driving students with private driving instructors, demystifying the currently opaque industry of private car instructors. "},
                {name:"Samuel", title:"Chief Technology Officer", pic:"img/samuel.jpg",website:"https://samuelsmuscis.github.io/", description:"Being a private driving instructor himself, Samuel hopes to make the process of finding a driving instructor easier for students. He is a software developer and has a strong background in web development."},
                {name:"James", title:"Chief Marketing Officer", pic:"img/james.jpeg",website:"https://yonghongtn.github.io/", description:"Having being once taught by a private driving instructor, James wishes to make the process of finding a reliable driving instructor simpler for prospective students. He has a background in both web development and marketing."}, 
            ],
        }
    }
}).mount('#our_team');