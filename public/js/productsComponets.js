Vue.component('products-list', {
    data() {
        return {
            products: [],
            productsFilter: [],
            productsURL: 'getProducts.json',
            imgPlaceholder: 'img/image-holder.jpg',
            errorText: '',
        }
    },
    template: `
                <div class="row products-list d-flex justify-content-between">
                    <error-component v-if="errorText" :error="errorText"></error-component>                   
                    <product v-for="item in productsFilter" :key="item.id_product"
                        :item="item"
                        :img="imgPlaceholder">
                    </product>
                </div>
    `,
    mounted() {
        this.$root.getJson(API + this.productsURL)
            .then(data => {
                this.products = [...data];
                this.productsFilter = [...data];
            })
            .catch(error => {
                this.errorText = error + '!!!!';
            });
    },
});

Vue.component('product', {
    props: ['item', 'img'],
    template: `
                <div class="product-item col flex-grow-0 mt-3 mb-3">
                    <div class="product-item__block p-3">
                        <h3  class="product-item__title">{{ item.product_name }}</h3>
                        <img class="product-item__img img-fluid img-thumbnail" :src="img">
                        <p class="product-item__price">{{ item.price }} руб.</p>
                        <button @click="$root.$refs.cart.addtoCart(item)" class="product-item__add-button btn btn-warning">Добавить</button>
                    </div>
                </div>  
    `,
});