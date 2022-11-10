// set up db
import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
const db = getDatabase()

// create a vue instance
const app = Vue.createApp({
    data() {
        return {
            photo: null,
            cert: null,
            gender: 'male',
            birth: '',
            lang: '',
            teach: '',
            licence: '3',
            location: '',
            phone: '',
            lesson_price: '',
            enrol_fee: '',
            circuit_fee: '',
            rental_fee: '',
            error_str: '',
        }
    },
    methods: {
        submit(){
            if(this.validate()){
                // there are no errors, submit the form //localStorage.getItem("username")
                set(ref(db, 'instructors/' + 'dummy_val'), {
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
                    alert("Data updated successfully!");
                })
                .catch((error) => {
                    alert("Data could not be saved: " + error);
                });
            }
        },
        validate(){
            let error_arr=[]
            // Check if all fields are filled
            if ( // this.photo === null || this.cert === null || 
                this.birth == "" || this.lang == "" || 
                this.teach == "" || this.location == "" ||
                this.phone == "" || this.lesson_price == "" ||
                this.enrol_fee == "" || this.circuit_fee == "" ||
                this.rental_fee == "") {
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
        },
        isNumeric(str) {
            return /^\d+$/.test(str)
        }
    },
})
app.mount('#app')