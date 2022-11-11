const app = Vue.createApp({
    data() {
        return {
            // data
            instructor:"David LO",
            rating: 5,
            enrolment_date: "",
            passed: '1',
            times_taken:1,
            review: "",
            error_messages: [],
        }
    },
    methods: {
        // methods
        reset(){
            this.rating = 5;
            this.enrolment_date = "";
            this.passed = '1';
            this.times_taken = 1;
            this.review = "";
        },
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
        }
    },
    mounted() {
        // mounted
    },

})
app.mount('#app')
    