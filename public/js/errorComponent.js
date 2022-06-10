Vue.component('error-component', {
    props: ['error'],
    template: `
        <p>Ошибка: {{error}}</p>
    `,
});