import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
        
        
const firebaseConfig = {
//    /* apiKey: "AIzaSyDCojnVruEr7szvuPi4ZNXaK63ek9DiMXE",
//     authDomain: "wad2-586e4.firebaseapp.com",
//     projectId: "wad2-586e4",
//     storageBucket: "wad2-586e4.appspot.com",
//     messagingSenderId: "859256546618",
//     appId: "1:859256546618:web:4b5ad0bf9e149cb668dc03",
//     measurementId: "G-JK9EV2N8S9"*/

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
import {getFirestore, doc, setDoc ,collection, addDoc, getDocs} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
const clouddb = getFirestore();

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
    const storageRef= sRef(storage, username+ "/licence/"+imgname1);
    const storageRef2= sRef(storage, username+"/cert/"+imgname2);
    const uploadTask1 = uploadBytesResumable(storageRef, imgtoupload1,metadata1);
    uploadTask1.on('state-changed', (snapshot)=>{
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        
    }, (error)=>{
        alert("error");
    }, ()=>{
        getDownloadURL(uploadTask1.snapshot.ref).then((downloadURL)=>{
          
            SaveURLtoFirestore(downloadURL, "/licence");
            console.log('update complete');
            
        });
    });
    const uploadTask2 = uploadBytesResumable(storageRef2, imgtoupload2,metadata2);
    uploadTask2.on('state-changed', (snapshot)=>{
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        
    }, (error)=>{
        alert("error");
    }, ()=>{
        getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL)=>{
    
            SaveURLtoFirestore(downloadURL, "/cert");
            console.log('update complete');
        });
    });

}

async function SaveURLtoFirestore(url, path){
    var username= document.getElementById("username").value;
    var ref= doc(clouddb, username+path)
    await setDoc(ref, {
        url: url
    });
    
}
/*async function getImagefromFirestore(username, path,){
    var ref = doc(clouddb, username+path);
    var url = await getDoc(ref);
    if(url.exist){
        your_variable = url.data().url;
    }

}*/

upbtn.onclick= function(){
    uploadFile();
}