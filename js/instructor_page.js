import {ref, set, get} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import {db} from './db_config.js'

import{getDatabase, ref as sRef, set as sett ,child, get as gett, update as updatee, remove} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
const realdb= getDatabase();


const app = Vue.createApp({

    data() {
        return {

    
            student_name: '',

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
            reviews: {},
            no_of_reviews: 0,
            student_username: '',
            average_rating:0,
            one_star: 0,
            two_star: 0,
            three_star: 0,
            four_star: 0,
            five_star: 0,
            review_object: {},


            instructor_photo_url: '',
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
        getStyle(numerator,denominator) {

            var percent = numerator/denominator*100;
            return `width': ${percent.toFixed(0)}%;`
    
        },
        getRatingDesc(rating) {
            if (rating == 1) {
                return "1/5 Terrible"
            } else if (rating == 2) {
                return "2/5 Poor"
            } else if (rating == 3) {
                return "3/5 Average"
            } else if (rating == 4) {
                return "4/5 Very Good"
            } else if (rating == 5) {
                return "5/5 Excellent"
            }
        },
        // Google Maps API

        initMap(){

            // 
            let postal_code = this.postal_code
        
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
        
                let map = new google.maps.Map(document.getElementById('map'), options);
        
                // Marker
                let marker = new google.maps.Marker({
                    position: {lat, lng},
                    map: map,
                });
        
            })
            .catch(error => {
        
                console.log(error.message)
        
            })
        
        },
        GetURLfromRealtimeDb(username){
            var dbRef= sRef(realdb)
            gett(child(dbRef, "images/"+username+"/licence")).then((snapshot)=>{
                if(snapshot.exists()){
                    var returnedurl=snapshot.val().imageurl;
                 
                    this.instructor_photo_url=returnedurl;
              
                }})
            },


    },

    created() {
        
        if (sessionStorage.getItem('instructor_name')){

            let student_username = localStorage.getItem('user')
            this.student_username = student_username
            let instructor_name = sessionStorage.getItem('instructor_name')
           
            // get user's name
            get(ref(db))
            .then((snapshot) => {
                if (snapshot.exists()) {

                    // get user's name
                    this.student_name = snapshot.val().users[this.student_username].name;

                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });

            // getting review data
            get(ref(db, 'reviews/' + instructor_name))
            .then((snapshot) => {
            if (snapshot.exists()) {

                // push review to reviews
                this.reviews = snapshot.val();
                this.no_of_reviews = this.reviews.total_number_of_ratings;
                this.average_rating = this.reviews.overall_rating;
                this.one_star = this.reviews.one_star;
                this.two_star = this.reviews.two_star;
                this.three_star = this.reviews.three_star;
                this.four_star = this.reviews.four_star;
                this.five_star = this.reviews.five_star;
                var keys = Object.keys(this.reviews);
                for (let key of keys){
                    if (key != 'total_number_of_ratings' && key != 'overall_rating' && key != 'one_star' && key != 'two_star' && key != 'three_star' && key != 'four_star' && key != 'five_star'){
                        this.review_object[key] = this.reviews[key];
                    }
                }
                this.GetURLfromRealtimeDb(instructor_name);
            } else {
                console.log("No data available");
            }})
            .catch((error) => {
                console.error(error);
            });

            // get usernames from database
            get(ref(db, 'users/' + instructor_name))
            .then((snapshot) => {
                if (snapshot.exists()) {

                    // push respective data to data()
                    this.user_type = snapshot.val().user_type;
                    this.username = snapshot.val().username;
                    this.name = snapshot.val().name;
                    this.gender = snapshot.val().gender;
                    this.birth_yr = snapshot.val().birth_yr;
                    this.languages = snapshot.val().languages.join(', ');
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
    
