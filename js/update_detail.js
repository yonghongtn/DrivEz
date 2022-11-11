const app = Vue.createApp({
    data() {
        return {
            // data
            name: 'John Tan',
            username: 'johntan',
            email: "johntan@smu.edu.sg",
            gender: "Male",
            birthyear: 1988,
            languages: "English, Chinese, Indonesian",
            yearstarted: 2010,
            license_taught:"3",
            location: "Sengkang",
            phone: 91234567,
            lesson_price: 40,
            enrol_fee: 100,
            circuit_fee:100,
            rental_fee:200,
            current_password:"",
            new_password:"",
            reenter_new_password:"",
        }
    },
    methods: {
        // methods
    },
    mounted() {
        // mounted
    }
})
app.mount('#app')
    