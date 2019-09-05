import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.directive('phone', {
    bind (el) {
        el.oninput = function (e) {
            if (!e.isTrusted) {
                return;
            }
            const x = (el as HTMLInputElement).value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
            if (x) {
                (el as HTMLInputElement).value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
            }
            el.dispatchEvent(new Event('input'))
        }
    }
})
