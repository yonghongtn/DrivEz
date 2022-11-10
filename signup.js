const app = Vue.createApp({
    data() {
        return {
            // Data
            user_type: "student",
            username: "",
            name: "",
            email: "",
            password: "",
            password2: "",
            error_str: "",
        }
    },
    methods: {
        // Methods
        signup(){
            if(this.validate()){ // no errors
                // check if username is already in use
                // if not, send data to backend
                // if user is an instructor, redirect to instructor_info.html
                if(this.user_type == "instructor"){
                    window.location.href = "instructor_info.html"
                }
                // else, user is a student
                else{
                    // redirect to login page
                    window.location.href = "login.html"
                }
            }
        },
        validate() {
            let error_arr=[]
            // Check if all fields are filled
            if (this.username == "" || this.name == "" || this.email == "" || this.password == "" || this.password2 == "") {
                error_arr.push("Please fill in all the fields.")
            }
            else{
                // Check if username is valid
                if (!this.isAlphaNumeric(this.username)) {
                    error_arr.push("Username must be alphanumeric.")
                }
                // Check if name is valid
                if (this.name.length<3 || !(this.name).includes(' ')) {
                    error_arr.push("Please enter a valid name.")
                }
                // Check if email is valid
                if (!(this.email).includes('@') || !(this.email).includes('.') || this.email.length < 5) {
                    error_arr.push("Please enter a valid email.")
                }
                // Check if passwords match
                if (this.password != this.password2) {
                    error_arr.push("Passwords do not match.")
                }
                // Check if password is valid
                if (this.password.length < 8) {
                    error_arr.push("Password must be at least 8 characters long.")
                }
            }
            // if error_arr.length > 0, update error_str
            if (error_arr.length > 0) {
                this.error_str = error_arr.join("<br>")
                return false
            }
            else{
                return true
            }
        },
        isAlphaNumeric(str){
            for (i = 0; i < str.length; i++) {
                code = str.charCodeAt(i)
                if (!(code > 47 && code < 58) && // numeric (0-9)
                    !(code > 64 && code < 91) && // upper alpha (A-Z)
                    !(code > 96 && code < 123)) { // lower alpha (a-z)
                    return false
                }
            }
            return true
        }
    },
})
app.mount('#app')