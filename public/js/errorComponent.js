Vue.component('error-component', {
    data() {
        return {
            errorText: '',
        }
    },
    computed: {
        showError() {
            return this.errorText !== '';
        }
    },
    template: `
        <div v-if="showError">
            <p>Ошибка: {{ errorText }}</p>
        </div>
    `,
});