/* 
import {ref, set, get} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js"
import {db} from './db_config.js'

// getting data
var username_arr = [];

console.log(username_arr)

// Protect
var loggedIn = false;
 */
// check localStorage for user
var localUser = localStorage.getItem('user');
var localUserType = localStorage.getItem('user_type');

/* console.log(localUser)
console.log(localUserType)
console.log(username_arr[0])

for (user of username_arr) {
    if (user == localUser) {
        loggedIn = true;
        break
    }
}
console.log("Login: "+loggedIn) */

/* if (localUserType == "instructor"){
    window.location.replace("updatedetail.html");
} 
else if (localUserType == "student"){
    window.location.replace("search-instructor.html");
} else {
    console.log("error");
    window.location.replace("index.html");
} */


function logout() {

    localStorage.removeItem('user');
    localStorage.removeItem('user_type');
    window.location.replace("index.html");

}