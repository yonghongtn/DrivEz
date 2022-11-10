const app = Vue.createApp({
    data() {
        return {
            // data
            name: 'David Lo',
            username: 'davidlo',
            email: "davidlo@smu.edu.sg",
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
    