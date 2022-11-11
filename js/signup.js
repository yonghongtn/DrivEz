// set up db
import {ref, set, get} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import {db} from './db_config.js'

const app = Vue.createApp({
    data() {
        return {
            // Data for all
            user_type: "student",
            username: "",
            name: "",
            email: "",
            password: "",
            password2: "",
            error_str: "",

            // instructor data
            photo: null,
            cert: null,
            gender: 'male',
            birth: '',
            lang: '',
            teach: '',
            licence: '3',
            location: 'Sembawang',
            phone: '',
            lesson_price: '',
            enrol_fee: '',
            circuit_fee: '',
            rental_fee: '',

            //array of all the users
            username_arr: [],
            // array of all the areas
            location_arr: ['Sembawang', 'Woodlands', 'Yishun', 'Ang Mo Kio', 
                'Hougang', 'Punggol', 'Sengkang', 'Serangoon',
                'Bedok', 'Pasir Ris', 'Tampines', 'Bukit Batok',
                'Bukit Panjang', 'Choa Chu Kang', 'Clementi', 'Jurong East',
                'Jurong West', 'Tengah', 'Bishan', 'Bukit Merah',
                'Bukit Timah', 'Central Area', 'Geylang', 
                'Kallang/Whampoa', 'Marine Parade','Queenstown', 'Toa Payoh'],
        }
    },
    methods: {
        // Methods
        signup(){
            if(this.validate_pt1() && this.validate_pt2()){ // no errors
                // check if username is already in use
                if (this.username_arr.includes(this.username)){
                    this.error_str = "Username already in use"
                    return
                }
                // if not, send data to backend
                else{
                    if(this.user_type == "student"){
                        set(ref(db, 'users/' + this.username), {
                            user_type: this.user_type,
                            name: this.name,
                            email: this.email,
                            password: this.password
                        })
                        .then(() => {
                            // redirect to login page
                            window.location.href = "login.html"
                        })
                        .catch((error) => {
                            this.error_str = `
                            Error creating account, please refresh this page and try again.
                            Error code: ${error}`;
                        });
                    }
                    else{
                        set(ref(db, 'users/' + this.username), {
                            user_type: this.user_type,
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            gender: this.gender,
                            birth_yr: this.birth,
                            languages: this.lang,
                            first_year_of_teaching: this.teach,
                            licence_type: this.licence,
                            location: this.location,
                            phone: this.phone,
                            lesson_price: this.lesson_price,
                            enrolment_fee: this.enrol_fee,
                            circuit_fee: this.circuit_fee,
                            rental_fee: this.rental_fee
                        })
                        .then(() => {
                            // redirect to login page
                            window.location.href = "login.html"
                        })
                        .catch((error) => {
                            this.error_str = `
                            Error creating account, please refresh this page and try again.
                            Error code: ${error}`;
                        });
                    }
                }
            }
        },
        validate_pt1() {
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
                if (!this.validateEmail(this.email)) {
                    error_arr.push("Please enter a valid email.")
                }
                // Check if passwords match
                if (this.password != this.password2) {
                    error_arr.push("Passwords do not match.")
                }
                // Check if password is valid
                if (!this.validatePassword(this.password)) {
                    error_arr.push("Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.")
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
        validate_pt2() {
            if(this.user_type == "student"){
                return true
            }
            else{ // user type is instructor
                let error_arr=[]
                // Check if all fields are filled
                if ( // this.photo === null || this.cert === null || 
                    this.birth == "" || this.lang == "" || 
                    this.teach == "" || this.phone == "" || 
                    this.lesson_price == "" || this.enrol_fee == "" || 
                    this.circuit_fee == "" || this.rental_fee == "") {
                    error_arr.push("Please fill in all the fields.")
                }
                else{
                    // Check if birth year is valid
                    if (this.birth < 1930 || this.birth > 2005 || !Number.isInteger(this.birth)) {
                        error_arr.push("Please enter a valid year (between 1930 and 2005).")
                    }
                    // Check if 1st teaching yr is valid
                    if (this.teach < 1930 || this.teach > 2005 || !Number.isInteger(this.birth)) {
                        error_arr.push("Please enter a valid year (between 1930 and 2005).")
                    }
                    // Check if phone is valid
                    if (this.phone.length != 8 || !this.isNumeric(this.phone)) {
                        error_arr.push("Please enter a valid phone number.")
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
            }
        },
        isAlphaNumeric(str){
            for (let i = 0; i < str.length; i++) {
                let code = str.charCodeAt(i)
                if (!(code > 47 && code < 58) && // numeric (0-9)
                    !(code > 64 && code < 91) && // upper alpha (A-Z)
                    !(code > 96 && code < 123)) { // lower alpha (a-z)
                    return false
                }
            }
            return true
        },
        validateEmail(email) {
            const re = /\S+@\S+\.\S+/
            return re.test(email)
        },
        validatePassword(password) {
            const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
            return re.test(password)
        },
        isNumeric(str) {
            return /^\d+$/.test(str)
        }
    },
    created() {
        // get usernames from database
        get(ref(db, 'users/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                this.usernames = Object.keys(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    },
})
app.mount('#app')