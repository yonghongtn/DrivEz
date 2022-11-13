import {ref, set, get} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import {db} from './db_config.js'

const app = Vue.createApp({

    data() {

        return {

            instructor_name: '',
            instructor_username: '',

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
        }

    },

    methods: {

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

    },


    created() {

        // get instructor name
        this.instructor_username = localStorage.getItem("user")

        // getting review data
        get(ref(db, 'reviews/' + this.instructor_username))
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
                    this.review_object[key] = this.reviews[key]; // actual reviews
                }
            }


        } else {
            console.log("No data available");
        }})
        .catch((error) => {
            console.error(error);
        });

    }

})
app.mount('#app')




