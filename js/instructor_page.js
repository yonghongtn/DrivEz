import {ref, set, get} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import {db} from '../db_config.js'

const app = Vue.createApp({

    data() {
        return {

            // specific instructor's data
            // ??? not yet done parts
            user_type: '',
            username: '',
            photo: null,
            cert: null,
            
            // name
            name: '',

            // about
            gender: '',
            birth_yr: '', // calculate age
            languages: '',
            first_year_of_teaching: '', // years of teaching experience
            licence_type: '',
            phone: '',
            email: '',
            
            // fees
            enrolment_fee: '',
            lesson_price: '',
            circuit_fee: '',
            rental_fee: '',

            // postal_code
            postal_code: '',

            // reviews
            reviews: [],

        }
    },

    computed: {

        age() {
            const d = new Date();
            let year = d.getFullYear();
            return year - Number(this.birth_yr)
        },

        teaching_experience() {
            const d = new Date();
            let year = d.getFullYear();
            return year - Number(this.first_year_of_teaching)
        }

    },

    methods: {
        
        // methods

        // Google Maps API

        initMap(){

            // 
            let postal_code = 791456 // this.postal_code
        
            // Geocode API
            // 1) Complete the endpoint URL
            let api_endpoint_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${postal_code}&key=AIzaSyAQOL8HDJFzih5gX-KcUz_bMH9HLQyj0aM`
            
        
        
            // 2) Use Axios to call API asynchronously
            axios.get(api_endpoint_url)
            .then(response => {
        
                let lat = response.data.results[0].geometry.location.lat
                let lng = response.data.results[0].geometry.location.lng
        
                // Map API
                var options = {
                    center: {lat, lng},
                    zoom: 16
                }
        
                map = new google.maps.Map(document.getElementById('map'), options);
        
                // Marker
                marker = new google.maps.Marker({
                    position: {lat, lng},
                    map: map,
                });
        
            })
            .catch(error => {
        
                console.log(error.message)
        
            })
        
        }


    },

    created() {
        
        if (sessionStorage.getItem('instructor_name')){

            let instructor_name = sessionStorage.getItem('instructor_name')

            // get usernames from database
            get(ref(db, 'users/' + instructor_name))    // "user1" is the hardcoded instructor name for now
            .then((snapshot) => {
                if (snapshot.exists()) {

                    // push respective data to data()
                    this.user_type = snapshot.val().user_type;
                    this.username = snapshot.val().username;
                    this.name = snapshot.val().name;
                    this.gender = snapshot.val().gender;
                    this.birth_yr = snapshot.val().birth_yr;
                    this.languages = snapshot.val().languages;
                    this.first_year_of_teaching = snapshot.val().first_year_of_teaching;
                    this.licence_type = snapshot.val().licence_type;
                    this.phone = snapshot.val().phone;
                    this.email = snapshot.val().email;
                    this.enrolment_fee = snapshot.val().enrolment_fee;
                    this.lesson_price = snapshot.val().lesson_price;
                    this.circuit_fee = snapshot.val().circuit_fee;
                    this.rental_fee = snapshot.val().rental_fee;
                    this.postal_code = snapshot.val().postal_code;
                    this.reviews = snapshot.val().reviews;

                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            alert("Instructor not found");
            window.location.replace("search-instructor.html");
        }

    }

})
app.mount('#app')
    