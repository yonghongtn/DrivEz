import {ref, set, get} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import {db} from './db_config.js'

const app = Vue.createApp({
    data() {
        return {
            current_user_type: "",
            current_username: "",
            current_name: "",
            current_email: "",
            current_password: "",
            

            current_gender: 'male',
            current_birth: '',
            current_lang: "",
            current_lang_to_add: '',
            current_teach: '',
            current_licence: '3',
            current_postal_code: '',
            current_phone: '',
            current_lesson_price: '',
            current_enrol_fee: '',
            current_circuit_fee: '',
            current_rental_fee: '',

            user_type: "",
            username: "",
            name: "",
            email: "",
            password: "",
            new_password: "",
            reenter_password: "",
            error_str: "",

            // instructor data
            //photo: null,
            //cert: null,
            gender: "",
            birth: "",
            lang: "",
            lang_to_add: "",
            teach: "",
            licence: "",
            postal_code: "",
            phone: "",
            lesson_price: "",
            enrol_fee: "",
            circuit_fee: "",
            rental_fee: "",

            actual_address:"",
            error_arr:[],
    /*
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
                            rental_fee: this.rental_fee
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
    */ 
            



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
        
        // methods
        addLang(){
            if (this.lang_to_add != ''){
                //capitalise lang_to_add
                this.lang_to_add = this.lang_to_add.charAt(0).toUpperCase() + this.lang_to_add.slice(1).toLowerCase();
                console.log(this.lang)
                var lang_arr = this.lang.split(", ")
                
                if (!lang_arr.includes(this.lang_to_add)){
                    if (lang_arr.length === 0){
                        this.lang = this.lang_to_add
                    }
                    else{
                        this.lang+=", "+this.lang_to_add
                    }
                }
                this.lang_to_add = ''
                //console.log(this.lang)
            }
        },
        removeLang(language){
            var lang_arr = this.lang.split(', ');
            if (lang_arr.length === 1){
                this.lang = ''
            }
            else{
                lang_arr.splice(lang_arr.indexOf(language), 1);
                this.lang = lang_arr.join(', ');
            }
        },
        cleardetails(){
            this.name = this.current_name;
            this.email = this.current_email;
            this.lang = this.current_lang;
            this.teach = this.current_teach;
            this.licence = this.current_licence;
            this.postal_code = this.current_postal_code;
            this.phone =    this.current_phone;
            this.lesson_price = this.current_lesson_price;
            this.enrol_fee =    this.current_enrol_fee;
            this.circuit_fee = this.current_circuit_fee;
            this.rental_fee = this.current_rental_fee;

        },
        clearpw(){
            this.password='';
            this.new_password='';
            this.reenter_password='';
        },
        updatedetails(){
            if(this.validate_pt2()){
                console.log("validated right")
            set(ref(db, 'users/' + this.username), {
                user_type: this.current_user_type,
                name: this.current_name,
                email: this.current_email,
                password: this.current_password,
                gender: this.current_gender,
                birth_yr: this.birth,
                languages: this.lang.split(", "),
                first_year_of_teaching: this.teach,
                licence_type: this.licence,
                postal_code: this.postal_code,
                phone: this.phone.toString(),
                lesson_price: this.lesson_price,
                enrolment_fee: this.enrol_fee,
                circuit_fee: this.circuit_fee,
                rental_fee: this.rental_fee
              })
            .then(() => {
                alert('Data updated successfully!');
            })
            .catch((error) => {
                this.error_str = `
                Error updating. Please try again.
                Error code: ${error}`;
            });
        }
        },
        updatepw(){
            console.log("Current pw"+ this.current_password)
            console.log("Password"+ this.password)
            console.log("New pw"+ this.current_password)
            console.log("Comfirm new pw"+ this.current_password)
            if(this.validate_pw()){
                set(ref(db, 'users/' + this.username), {
                    user_type: this.current_user_type,
                    name: this.current_name,
                    email: this.current_email,
                    password: this.new_password,
                    gender: this.current_gender,
                    birth_yr: this.current_birth,
                    languages: this.current_lang.split(', '),
                    first_year_of_teaching: this.current_teach,
                    licence_type: this.current_licence,
                    postal_code: this.current_postal_code,
                    phone: this.current_phone,
                    lesson_price: this.current_lesson_price,
                    enrolment_fee: this.current_enrol_fee,
                    circuit_fee: this.current_circuit_fee,
                    rental_fee: this.current_rental_fee
                  })
                  alert("Password changed successfully!")
                
            }

            
        },

        signup(){
            if(this.validate_pt2()){ // no errors
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
                            languages: this.lang.split(", "),
                            first_year_of_teaching: this.teach,
                            licence_type: this.licence,
                            postal_code: this.postal_code,
                            phone: this.phone,
                            lesson_price: this.lesson_price,
                            enrolment_fee: this.enrol_fee,
                            circuit_fee: this.circuit_fee,
                            rental_fee: this.rental_fee
                        })
                        .then(() => {
                            // redirect to login page
                            setTimeout(function () {
                                window.open('https://www.encodedna.com/javascript/operators/default.htm', '_blank');
                            }, 5000);
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
        validate_pw(){
            this.error_arr=[];
             if (this.new_password != this.reenter_password) {
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
        validate_pt2() {
            if(this.user_type == "student"){
                return true
            }
            else{ // user type is instructor
                let error_arr=[]
                //console log fields below

                // Check if all fields are filled
                if ( // this.photo === null || this.cert === null || 
                    this.birth == "" || this.lang.split(", ").length == 0 || 
                    this.teach == "" || this.phone == "" || 
                    this.lesson_price == "" || this.enrol_fee == "" || 
                    this.circuit_fee == "" || this.rental_fee == "" ||this.postal_code == ""|| this.licence == "") {
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
                    if (this.phone.toString().length != 8) {
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
                    return true
                }
                else{
                    return false
                }
            }
            else{
                return false
            }
        }
    },
    created(){
        this.username = localStorage.getItem("user")
        //get user details from database
        get(ref(db, 'users/' + this.username))
        .then((snapshot) => {
            if (snapshot.exists()) {
                this.current_name = snapshot.val().name
                this.current_gender = snapshot.val().gender
                this.current_licence = snapshot.val().licence_type
                this.current_email = snapshot.val().email
                this.current_user_type = snapshot.val().user_type
                //this.current_photo = snapshot.val().photo
                //this.current_cert = snapshot.val().cert
                this.current_birth = snapshot.val().birth_yr
                this.current_lang = snapshot.val().languages.join(", ") // change the db to store as string
                this.lang = snapshot.val().languages.join(", ")
                //console.log(this.current_lang)
                //console.log(this.lang)
                this.current_teach = snapshot.val().first_year_of_teaching
                this.current_phone = snapshot.val().phone
                this.current_lesson_price = snapshot.val().lesson_price
                this.current_enrol_fee = snapshot.val().enrolment_fee
                this.current_circuit_fee = snapshot.val().circuit_fee
                this.current_rental_fee = snapshot.val().rental_fee
                this.current_postal_code = snapshot.val().postal_code
                this.current_password = snapshot.val().password


                this.teach = snapshot.val().first_year_of_teaching
                this.phone = snapshot.val().phone
                this.lesson_price = snapshot.val().lesson_price
                this.enrol_fee = snapshot.val().enrolment_fee
                this.circuit_fee = snapshot.val().circuit_fee
                this.rental_fee = snapshot.val().rental_fee
                this.postal_code = snapshot.val().postal_code
                this.licence = snapshot.val().licence_type
                this.birth = snapshot.val().birth_yr

            } else {
                console.log("No data available");
            }
        })
    }
})
app.mount('#app')
    