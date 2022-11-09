const footer = Vue.createApp({

})

footer.component('footer-component', {
    template: `
    <div class="bg-info text-center fs-5 mt-5">
        Copyright 2022 DrivEz. All rights reserved.
    </div>
    `
})    


footer.mount('#footer')