const app = Vue.createApp({
    data() {
        return {
            email:"",
            password:"",
            emailAlert: "Email cannot be empty!",
            passwordALert: "Password cannot be empty!",
            currentEmailAlert:"",
            currentPasswordAlert:"",
            currentLoginAlert:"",
        }
    },
    methods:{
        validate_email(){
            this.currentEmailAlert="";
            this.currentLoginAlert="";
            this.currentPasswordAlert="";
            if (this.email.length == 0){
                this.currentEmailAlert = "Email cannot be empty!";
            }
            if (this.password.length == 0){
                this.currentPasswordAlert = "Password cannot be empty!";
            }
        }
    }
}).mount('#login');

