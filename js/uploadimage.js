import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
        
        
const firebaseConfig = {
    apiKey: "AIzaSyDcAD4nPjxFv3P1hUrq-Sv5JT50r84UqI8",
    authDomain: "drivez-4f327.firebaseapp.com",
    databaseURL: "https://drivez-4f327-default-rtdb.firebaseio.com",
    projectId: "drivez-4f327",
    storageBucket: "drivez-4f327.appspot.com",
    messagingSenderId: "198435132181",
    appId: "1:198435132181:web:0739c1ce18ab34d7154f1c"
};


const app = initializeApp(firebaseConfig);
import {getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

import{getDatabase, ref, set ,child, get, update, remove} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
const realdb= getDatabase();

var files= [];
var reader= new FileReader();



var upbtn= document.getElementById("upbtn");

async function uploadFile(){
    var imgtoupload1= document.getElementById("licencePic").files[0];
    var imgname1= imgtoupload1.name;
    var imgtoupload2= document.getElementById("cert").files[0];
    var imgname2= imgtoupload2.name;
    var proglab1= document.getElementById("proglab1");
    var proglab2 = document.getElementById("proglab2");
    var username= document.getElementById("username").value;
    const metadata1={
        contentType: imgtoupload1.type
    };
    
    const metadata2={
        contentType: imgtoupload2.type
    }
    const storage= getStorage();
    const storageRef= sRef(storage, "images/" +username+ "/licence/"+imgname1);
    const storageRef2= sRef(storage, "images/" +username+"/cert/"+imgname2);
    const uploadTask1 = uploadBytesResumable(storageRef, imgtoupload1,metadata1);
    uploadTask1.on('state-changed', (snapshot)=>{
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        
    }, (error)=>{
        alert("error");
    }, ()=>{
        getDownloadURL(uploadTask1.snapshot.ref).then((downloadURL)=>{
          
            SaveURLtoRealtimeDb(downloadURL, "/licence");
            console.log('update complete');
            
        });
    });
    const uploadTask2 = uploadBytesResumable(storageRef2, imgtoupload2,metadata2);js/uploadimage.js
    uploadTask2.on('state-changed', (snapshot)=>{
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        
    }, (error)=>{
        alert("error");
    }, ()=>{
        getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL)=>{
    
            SaveURLtoRealtimeDb(downloadURL, "/cert");
            console.log('update complete');
        });
    });

}

function SaveURLtoRealtimeDb(url, path){
    var username= document.getElementById("username").value;
    set(ref(realdb, "images/"+username+path),
     {
        imageurl: url

    });  
}

function GetURLfromRealtimeDb(username){
   
    var dbRef= ref(realdb)
    get(child(dbRef, "images/"+username+"/licence")).then((snapshot)=>{
        if(snapshot.exists()){
            return snapshot.val().imageurl;

        }
    });
}



upbtn.onclick= function(){
    uploadFile();
}