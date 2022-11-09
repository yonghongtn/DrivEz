const app = Vue.createApp({
    data() {
        return {
            members: [
                {name:"Ivan", description:["Needs 100k so that he can get 1 million sooner","Likes to run with zombies", "Very interested in catching seals and freeing them from plastic waste entrapments after he retires :>"], pic:"img/ivan.jpg", website:"https://0venoven.github.io/ "},
                {name:"James", description:["likes horses","wants to 1M25","needs 10h of sleep every day", "thinks he is too heavy"], pic:"img/james.jpeg",website:"https://yonghongtn.github.io/"},
                {name:"Samuel", description:["is better than  justin bieber in coding skills","is a gigachad","needs 24 more A+ to finally be part of dean's list"], pic:"img/samuel.jpg",website:"https://samuelsmuscis.github.io/"},
                {name:"Yin Kit", description:["wants her TA position","wants to retire in Jeju because it's pretty","wishes she can just retire and not care abt having to earn money to pay bills","is happy the sem is almost over bc she has been losing too much hair already"], pic:"img/yinkit.jpg",website:"https://ngyinkit.github.io"},
            ],
        }
    }
}).mount('#our_team');