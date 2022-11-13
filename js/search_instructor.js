import {ref, set, get, update} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import {db} from './db_config.js'
import{getDatabase, ref as sRef, set as sett ,child, get as gett, update as updatee, remove} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
const realdb= getDatabase();

const app = Vue.createApp({

    data() {
        return {

            name: '', // name of user
            instructors: [],    // contains all the instructor objects
            searched_name: "",
            filter_location: 'All',
            username: '',
            // error_message: '',
            overall_rating: 1,
            total_number_of_ratings: 0,
            filter_by: 'No filter',
            location_arr: ["CBD", "Tanjong Pagar", "Telok Blangah", 
                        "Pasir Panjang/Clementi", "Tiong Bahru/Queenstown", "Beach Road",
                        "Middle Road/Golden Mile", "Little India", "Orchard/River Valley",
                        "Bukit Timah/Holland/Tanglin", "Novena/Thomson", "Balastier/Serangoon/Toa Payoh",
                        "MacPherson/Braddell", "Geylang/Eunos", "Katong/Joo Chiat",
                        "Bedok/Upper East Coast", "Loyang/Changi", "Pasir Ris/Tampines",
                        "Hougang/Punggol", "Bishan/Ang Mo Kio", "Upper Bukit Timah/Ulu Pandan",
                        "Jurong", "Hillview/Choa Chu Kang", "Tengah/Lim Chu Kang",
                        "Kranji/Woodgrove", "Upper Thomson", "Yishun/Sembawang", "Seletar"],

            instructor_photo_urls:{},
        }
    },

    computed: {

        searchInstructor(){

            // for instructors in filtered_instructors, check if instructor.name contains searched_name
            // if yes, push to filtered_instructors_by location

            var filtered_instructors_by_name = [];

            // if name = searched_name, push to filtered_instructors
            if (this.searched_name.length ===0){
                filtered_instructors_by_name = this.instructors
            }
            else{
                for (let each in this.instructors){
                    if (this.instructors[each].name.toLowerCase().includes(this.searched_name.toLowerCase())){
                        filtered_instructors_by_name.push(this.instructors[each]);
                    }
                }
            }
            
            // search if meet location
            var filtered_instructors_by_location = [];
            if(this.filter_location =='All'){
                filtered_instructors_by_location = this.instructors
            } 
            else{
                for (let each in this.instructors){
                    if (this.instructors[each].location == this.filter_location){
                        filtered_instructors_by_location.push(this.instructors[each]);
                    }
                }
            }

            //combine results
            var to_return = []

            for (let instructor of filtered_instructors_by_name){
                if (filtered_instructors_by_location.includes(instructor)){
                    to_return.push(instructor)
                }
            }
            
            
            //sort by filter
            if (this.filter_by == "No filter"){
                return to_return
            }
            else if (this.filter_by == "Ascending Price"){
                to_return.sort((a, b) => a.lesson_price - b.lesson_price);
                return to_return

            }
            else if (this.filter_by == "Descending Price"){
                to_return.sort((a, b) => b.lesson_price - a.lesson_price);
                return to_return
            }
            else if (this.filter_by == "Rating"){
                to_return.sort((a, b) => a.lesson_price - b.lesson_price);
                return to_return
            }
            else if (this.filter_by == "Type of licence (3)"){
                var final = []
                for (let instructor of to_return){
                    if (instructor.licence_type == "3"){
                        final.push(instructor)
                    }
                }
                return final
            }
            else if (this.filter_by == "Type of licence (3A)"){
                var final = []
                for (let instructor of to_return){
                    if (instructor.licence_type == "3A"){
                        final.push(instructor)
                    }
                }
                return final
            }
            
        },

    },

    methods: {

        redirectLocalStorage(username){

            sessionStorage.setItem("instructor_name", username); // username is the instructor username

            // redirect to instructor page
            window.location.replace("instructor-page.html");
        },

        

        async GetURLfromRealtimeDb(username){
            var dbRef= sRef(realdb)
            await gett(child(dbRef, "images/"+username+"/licence")).then((snapshot)=>{
                if(snapshot.exists()){
                    returnedurl=snapshot.val().imageurl;
                    console.log(returnedurl)
                    console.log(typeof returnedurl)
                    this.instructor_photo_urls[username]=returnedurl;
                    console.log(this.instructor_photo_urls)
                }})
            },

    },

    created() {

        this.username = localStorage.getItem('user');   // replace with protect.js

        get(ref(db))
        .then((snapshot) => {
            if (snapshot.exists()) {

                // get user's name
                this.name = snapshot.val().users[this.username].name;

                // for each instructor
                for (let user in snapshot.val().users){
                    if (snapshot.val().users[user].user_type == "instructor"){

                        let instructor = snapshot.val().users[user];

                        instructor.username = user;

                        // get the instructor's overall rating and total number of ratings

                        if (snapshot.val().reviews[user] != undefined){
                            instructor.overall_rating = snapshot.val().reviews[user].overall_rating;
                        } else {
                            instructor.overall_rating = 0;
                        }

                        if (snapshot.val().reviews[user] != undefined){
                            instructor.total_number_of_ratings = snapshot.val().reviews[user].total_number_of_ratings;
                        } else {
                            instructor.total_number_of_ratings = 0;
                        }

                        this.instructors.push(instructor);
                    }
                }

            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });

        this.filtered_instructors = this.instructors;
        
        for (let instructor of this.instructors){
            this.GetURLfromRealtimeDb(instructor.username)

        }
        console.log(this.instructor_photo_urls)
        
    }

})
app.mount('#app')