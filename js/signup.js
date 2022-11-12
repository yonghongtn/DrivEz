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
            gender: 'male',
            birth: '',
            lang: [],
            lang_to_add: '',
            teach: '',
            licence: '3',
            postal_code: '',
            phone: '',
            lesson_price: '',
            enrol_fee: '',
            circuit_fee: '',
            rental_fee: '',
            actual_address: '',
            location: "",

            //array of all the users
            username_arr: [],
            // array of all the areas
            postal_code_districts:{
                "01": "CBD",
                "02": "CBD",
                "03": "CBD",
                "04": "CBD",
                "05": "CBD",
                "06": "CBD",
                "07": "Tanjong Pagar",
                "08": "Tanjong Pagar",
                "09": "Telok Blangah",
                "10": "Telok Blangah",
                "11": "Pasir Panjang/Clementi",
                "12": "Pasir Panjang/Clementi",
                "13": "Pasir Panjang/Clementi",
                "14": "Tiong Bahru/Queenstown",
                "15": "Tiong Bahru/Queenstown",
                "16": "Tiong Bahru/Queenstown",
                "17": "Beach Road",
                "18": "Middle Road/Golden Mile",
                "19": "Middle Road/Golden Mile",
                "20": "Little India",
                "21": "Little India",
                "22": "Orchard/River Valley",
                "23": "Orchard/River Valley",
                "24": "Bukit Timah/Holland/Tanglin",
                "25": "Bukit Timah/Holland/Tanglin",
                "26": "Bukit Timah/Holland/Tanglin",
                "27": "Bukit Timah/Holland/Tanglin",
                "28": "Novena/Thomson",
                "29": "Novena/Thomson",
                "30": "Novena/Thomson",
                "31": "Balastier/Serangoon/Toa Payoh",
                "32": "Balastier/Serangoon/Toa Payoh",
                "33": "Balastier/Serangoon/Toa Payoh",
                "34": "MacPherson/Braddell",
                "35": "MacPherson/Braddell",
                "36": "MacPherson/Braddell",
                "37": "MacPherson/Braddell",
                "38": "Geylang/Eunos",
                "39": "Geylang/Eunos",
                "40": "Geylang/Eunos",
                "41": "Geylang/Eunos",
                "42": "Katong/Joo Chiat",
                "43": "Katong/Joo Chiat",
                "44": "Katong/Joo Chiat",
                "45": "Katong/Joo Chiat",
                "46": "Bedok/Upper East Coast",
                "47": "Bedok/Upper East Coast",
                "48": "Bedok/Upper East Coast",
                "49": "Loyang/Changi",
                "50": "Loyang/Changi",
                "81": "Loyang/Changi",
                "51": "Pasir Ris/Tampines",
                "52": "Pasir Ris/Tampines",
                "53": "Hougang/Punggol",
                "54": "Hougang/Punggol",
                "55": "Hougang/Punggol",
                "82": "Hougang/Punggol",
                "56": "Bishan/Ang Mo Kio",
                "57": "Bishan/Ang Mo Kio",
                "58": "Upper Bukit Timah/Ulu Pandan",
                "59": "Upper Bukit Timah/Ulu Pandan",
                "60": "Jurong",
                "61": "Jurong",
                "62": "Jurong",
                "63": "Jurong",
                "64": "Jurong",
                "65": "Hillview/Choa Chu Kang",
                "66": "Hillview/Choa Chu Kang",
                "67": "Hillview/Choa Chu Kang",
                "68": "Hillview/Choa Chu Kang",
                "69": "Tengah/Lim Chu Kang",
                "70": "Tengah/Lim Chu Kang",
                "71": "Tengah/Lim Chu Kang",
                "72": "Kranji/Woodgrove",
                "73": "Kranji/Woodgrove",
                "77": "Upper Thomson",
                "78": "Upper Thomson",
                "75": "Yishun/Sembawang",
                "76": "Yishun/Sembawang",
                "79": "Seletar",
                "80": "Seletar",
            }
        }
    },
    methods: {
        // Methods
        addLang(){
            if (this.lang_to_add != ''){
                //capitalise lang_to_add
                this.lang_to_add = this.lang_to_add.charAt(0).toUpperCase() + this.lang_to_add.slice(1).toLowerCase();
                if (!this.lang.includes(this.lang_to_add)){
                    this.lang.push(this.lang_to_add);
                    
                }
                this.lang_to_add = ''
                //console.log(this.lang)
            }
        },
        removeLang(language){
            this.lang.splice(this.lang.indexOf(language), 1);
        },
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
                            postal_code: this.postal_code,
                            phone: this.phone,
                            lesson_price: this.lesson_price,
                            enrolment_fee: this.enrol_fee,
                            circuit_fee: this.circuit_fee,
                            rental_fee: this.rental_fee,
                            location: this.location
                        })
                        .then(() => {
                            // redirect to login page
                            setTimeout(function () {
                                window.location.href = "login.html"
                            }, 1000);
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
                    error_arr.push("Username must be alphanumeric, without spaces in between.")
                }
                // Check if name is valid
                if (this.name.length<3 || !(this.name).includes(' ')) {
                    error_arr.push("Please enter you full name, with a space between each part of your name.")
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
                    this.birth == "" || this.lang.length == 0 || 
                    this.teach == "" || this.phone == "" || 
                    this.lesson_price == "" || this.enrol_fee == "" || 
                    this.circuit_fee == "" || this.rental_fee == "" ||this.postal_code == "") {
                    error_arr.push("Please fill in all the fields.")
                }
                else{
                    // Check if birth year is valid
                    if (this.birth < 1930 || this.birth > 2005 || !Number.isInteger(this.birth)) {
                        error_arr.push("Please enter a valid year of birth (between 1930 and 2005).")
                    }
                    // Check if 1st teaching yr is valid
                    if (this.teach < 1930 || this.teach > 2022 || !Number.isInteger(this.birth)) {
                        error_arr.push("Please enter a valid year (between 1930 and 2022).")
                    }
                    // Check if phone is valid
                    if (this.phone.length != 8 || !this.isNumeric(this.phone)) {
                        error_arr.push("Please enter a valid phone number.")
                    }
                    if (this.lesson_price <0){
                        error_arr.push("Lesson price cannot be negative.")
                    }
                    if (this.enrol_fee <0){
                        error_arr.push("Enrolment fee cannot be negative.")
                    }
                    if (this.circuit_fee <0){
                        error_arr.push("Circuit fee cannot be negative.")
                    }
                    if (this.rental_fee <0){
                        error_arr.push("Rental fee cannot be negative.")
                    }
                    // validate postal code
                    if (!this.validatePostal(this.postal_code)){
                        error_arr.push("Please enter a valid postal code.")
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
        },
        validatePostal(){
            if (this.postal_code.toString().length == 6 && this.isNumeric(this.postal_code)){
                var first_2_digits = this.postal_code.toString().substring(0,2)
                var valid_postal_districts = Object.keys(this.postal_code_districts)
                if (valid_postal_districts.includes(first_2_digits)){
                    //call API to check if postal code is valid
                    axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${this.postal_code}&apiKey=CV_8vw28DASCSBDvK42L1Hin0WQKpAqjUTUDwhiJu6k`)
                    .then(response=>{
                        this.actual_address = ""
                        if (response.data.items.length > 0){
                            this.actual_address = response.data.items[0].title
                        }
                    })
                    .catch(error=>{error.message})
                    if (this.actual_address == "" || this.actual_address.indexOf("Singapore") == -1){
                        this.location = ""
                        return false
                    }
                    else{
                        this.location = this.postal_code_districts[first_2_digits]
                        return true
                    }
                }
                else{
                    this.location = ""
                    return false
                }
            }
            else{
                this.location = ""
                return false
            }
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