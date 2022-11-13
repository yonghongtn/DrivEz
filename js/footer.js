const footer = Vue.createApp({

})

footer.component('footer-component', {
    template: `
    <footer class="bg-info text-center fs-5 mt-5  position-sticky bottom-0 w-100">
        Copyright 2022 DrivEz. All rights reserved.
    </footer>
    `
})    


footer.mount('#footer')