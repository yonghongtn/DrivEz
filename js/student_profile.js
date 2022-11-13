import {ref, set, get} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import {db} from './db_config.js'

const app = Vue.createApp({
    data() {
        return {
            // data
            name: '',
            username: '',
            email: "",
            gender: "Male",
            current_password:"",
            password:"",
            new_password:"",
            reenter_new_password:"",
            error_arr: [],
        }
    },
    methods: {
        // methods
        clearpw(){
            this.password='';
            this.new_password='';
            this.reenter_new_password='';
        },
        updatepw(){
            if(this.validate_pw()){
                set(ref(db, 'users/' + this.username), {
                    user_type: this.user_type,
                    name: this.name,
                    email: this.email,
                    password: this.new_password,
                    username: this.username,
                  })
                  alert("Password changed successfully!")
            } 
        },
        validate_pw(){
            this.error_arr=[];
             if (this.new_password != this.reenter_new_password) {
                    this.error_arr.push("Passwords do not match.")
                    return false
                }
            else if(this.password != this.current_password){
                this.error_arr.push("Current password is incorrect.")
                return false
            }
                // Check if password is valid
            else if (!this.validatePassword(this.new_password)) {
                this.error_arr.push("Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.")
                return false
            }
            return true
        },
        validatePassword(password) {
            var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return re.test(password);
        }

    },
    created(){
        this.username = localStorage.getItem("user")
        //get user details from database
        get(ref(db, 'users/' + this.username))
        .then((snapshot) => {
            if (snapshot.exists()) {
                this.name = snapshot.val().name
                this.email = snapshot.val().email
                this.current_password = snapshot.val().password
                this.user_type = snapshot.val().user_type
            } else {
                console.log("No data available");
            }
        })
    }
})
app.mount('#app')
    