// set up db
import {ref, set, get} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import {db} from './db_config.js'

const app = Vue.createApp({
    data() {
        return {
            username:'',
            password:'',
            error_str: '',
            user_type: '',

            username_arr: [],
        }
    },
    methods:{
        login(){
            
            if (this.username == "" || this.password == "") {
                this.error_str = "Please fill in all the fields."
                return
            }
            if (!this.authenticate(this.username, this.password)) {
                this.error_str = "Invalid username or password."
                return
            }
            localStorage.setItem("user", this.username)
            localStorage.setItem("user_type", this.user_type)
            if (this.user_type == "student") {
                window.location.replace("search-instructor.html") // if user is student, redirect to search-instructor.html
            } else if (this.user_type == "instructor") {
                window.location.replace("updatedetail.html")    // if user is instructor, redirect to updatedetail.html
            } else {
                window.location.replace("index.html")
            }

        },

        authenticate(username, password){
            for (let each in this.username_arr){
                if (this.username_arr[each].username == username && this.username_arr[each].password == password){
                    this.user_type = this.username_arr[each].user_type
                    return true
                }
            }
        },
    },
    created() {
        // get usernames from database
        get(ref(db, 'users/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // push user_type, username, password to database
                for (let key in snapshot.val()) {
                    // user object, contains username, user_type, password
                    let user = {}
                    user.user_type = snapshot.val()[key].user_type
                    
                    user.username = key
                    user.password = snapshot.val()[key].password
                    // push object to array
                    this.username_arr.push(user)
                    
                }
                //console.log(this.username_arr)
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
}).mount('#login');

