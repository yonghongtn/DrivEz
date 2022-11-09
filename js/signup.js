const app = Vue.createApp({
    data() {
        return {
            // Data
            user_type: "student",
            name: "",
            email: "",
            password: "",
            password2: "",
            error_str: "",
        }
    },
    methods: {
        // Methods
        validate() {
            let error_arr=[]
            // Check if all fields are filled
            if (this.name == "" || this.email == "" || this.password == "" || this.password2 == "") {
                error_arr.push("Please fill in all the fields.")
            }
            else{
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
            }
            else{
                // no errors, send data to backend
                // check if email is already in use
                // if not, send data to backend
                // if user is an instructor, redirect to instructor_info.html
                if(this.user_type == "instructor"){
                    window.location.href = "instructor_info.html"
                }
                // else, redirect student to login page
                else{
                    window.location.href = "login.html"
                }
            }
        },
    },
})
app.mount('#app')