const app = Vue.createApp({
    data() {
        return {
            // data
            name: 'David Lo',
            username: 'davidlo',
            email: "davidlo@smu.edu.sg",
            gender: "Male",
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
    