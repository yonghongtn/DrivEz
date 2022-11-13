import {ref, set, get, update} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import {db} from './db_config.js'

const app = Vue.createApp({

    data() {
        return {
            // data
            instructor_name:"",
            rating: 5,
            enrolment_date: "",
            // passed: '1',
            // times_taken:1,
            review: "",
            error_messages: [],
            success_messages: "",

            student_username: "",

            total_number_of_ratings: 0,
            overall_rating : 0,
            one_star : 0,
            two_star : 0,
            three_star : 0,
            four_star : 0,
            five_star : 0,

            submitted: false,
            student_name:"",
            instructor:""
            }


    },

    methods: {
        // methods

        // Reset the form
        reset(){
            this.rating = 5;
            this.enrolment_date = "";
            // this.passed = '1';
            // this.times_taken = 1;
            this.review = "";
        },

        // Verify the form, submit if valid
        verify(){
            this.error_messages = [];
            if (this.passed != "1"){
                this.times_taken = 1;
            }
            if (this.times_taken % 1 != 0){
                this.error_messages.push("Times taken to pass must be an integer");
            }
            if (this.times_taken < 1){
                this.error_messages.push("Times taken to pass must be at least 1");
            }
            if (this.enrolment_date == ""){
                this.error_messages.push("Enrolment date cannot be empty");
            }
            if (this.review.length<200){
                this.error_messages.push("Review must be at least 200 characters long");
            }
            if (this.enrolment_date != ""){
                var enrolment_date = new Date(this.enrolment_date);
                var today = new Date();
                if (enrolment_date > today){
                    this.error_messages.push("Enrolment date cannot be in the future");
                }
            }
            console.log(this.error_messages)

            // if no errors, submit
            if (this.error_messages.length == 0){

                this.success_messages = "Review submitted successfully";

                this.ratingComputation();

                // push the review object to firebase
                update(ref(db, 'reviews/' + this.instructor_name + '/' + this.student_username), {
                    rating: this.rating,
                    enrolment_date: this.enrolment_date,
                    // passed: this.passed,
                    // times_taken: this.times_taken,
                    review: this.review,
                });

                update(ref(db, 'reviews/' + this.instructor_name),{
                    total_number_of_ratings: this.total_number_of_ratings,
                    overall_rating: this.overall_rating,
                    one_star: this.one_star,
                    two_star: this.two_star,
                    three_star: this.three_star,
                    four_star: this.four_star,
                    five_star: this.five_star,
                });
                
                setTimeout(function () {
                    window.location.replace("instructor-page.html");
                }, 2000);
                

            }

        },

        ratingComputation() {
            if (this.rating == 1){
                this.one_star += 1;
            } else if (this.rating == 2){
                this.two_star += 1;
            } else if (this.rating == 3){
                this.three_star += 1;
            } else if (this.rating == 4){
                this.four_star += 1;
            } else if (this.rating == 5){
                this.five_star += 1;
            }
            this.total_number_of_ratings += 1;
            this.overall_rating = (this.one_star + this.two_star*2 + this.three_star*3 + this.four_star*4 + this.five_star*5) / this.total_number_of_ratings;
            return this.overall_rating;
        }
    },

    created() {

        // rmb to add protect.js
        
        if (sessionStorage.getItem('instructor_name')){

            let instructor_name = sessionStorage.getItem('instructor_name')

            // get instructor name from sessionStorage
            this.instructor_name = instructor_name;

            // get student username from localStorage
            let student_username = localStorage.getItem('user');
            this.student_username = student_username;

        } else {
            alert("Instructor not found");
            window.location.replace("search-instructor.html");
        }

        // if this guy already review, show him what he wrote before and let him update
        get(ref(db, 'reviews/' + this.instructor_name + '/' + this.student_username))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // push data to data()

                this.review = snapshot.val().review;
                this.rating = snapshot.val().rating;
                this.enrolment_date = snapshot.val().enrolment_date;

                if (this.review != ""){
                    this.submitted = true;
                }

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });

        get(ref(db, 'reviews/' + this.instructor_name))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // push data to data()

                if (snapshot.val().total_number_of_ratings == undefined){
                    this.total_number_of_ratings = 0;
                } else {
                    this.total_number_of_ratings = snapshot.val().total_number_of_ratings;
                }

                this.overall_rating = snapshot.val().overall_rating;
                this.one_star = snapshot.val().one_star;
                this.two_star = snapshot.val().two_star;
                this.three_star = snapshot.val().three_star;
                this.four_star = snapshot.val().four_star;
                this.five_star = snapshot.val().five_star;

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
        this.student_name = localStorage.getItem('student');
        this.instructor = localStorage.getItem('instructor');
    },


})
app.mount('#app')
    
