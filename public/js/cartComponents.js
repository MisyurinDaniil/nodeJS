Vue.component('cart', {
    data() {
        return {
            cartProducts: [],
            cartProductURL: 'getBasketProducts.json',
            addToCartUrl: 'addToBasket.json',
            deleteCartUrl: 'deleteFromBasket.json',
            imgPlaceholder: 'img/image-holder.jpg',
            isVisibleCart: false,
            isEmptyCart: true,
        }
    },
    methods: {
        addtoCart(product) {
            this.$root.getJson(API + this.addToCartUrl)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartProducts.find((item) => {
                            return item.id_product === product.id_product
                        });
                        if (find) ++find.quantity;
                        else {
                            this.cartProducts.push({
                                id_product: product.id_product,
                                product_name: product.product_name,
                                price: product.price,
                                quantity: 1,
                            });
                        }
                    }
                })
        },
        delFromCart(cartProduct) {
            this.$root.getJson(API + this.deleteCartUrl)
                .then(data => {
                    if (data.result === 1) {
                        let findIndex = null;
                        let find = this.cartProducts.find((item, index) => {
                            findIndex = index;
                            return cartProduct.id_product === item.id_product
                        });
                        if (find.quantity === 1) this.cartProducts.splice(findIndex, 1);
                        else --find.quantity;
                    }
                })
                .catch(error => {
                    this.errorText = error + '!!!!';
                });
        },
    },
    template: `
        <div v-show="isVisibleCart" class="product-cart flex-column border position-absolute px-2 pb-2">

            <p v-if="!cartProducts.length">Ваша корзина пустая.</p>
            <cart-item v-for="product in cartProducts" :key="product.id_product" :product="product" :img="imgPlaceholder"></cart-item>
        </div>
    `,
    mounted() {
        this.$root.getJson(API + this.cartProductURL)
            .then(data => {
                this.cartProducts = [...data.contents];
            })
            .catch(error => {
                this.errorText = error + '!!!!';
            });
    },
});
Vue.component('cart-item', {
    props: ['product', 'img'],
    template: `
        <div class="cart-item d-flex justify-content-between mt-2 border p-2">
            <img class="cart-item__img d-block img-thumbnail" :src="img">
            <div class="ms-2">
                <h3 class="cart-item__title">{{product.product_name}}</h3>
                <span class="cart-item__quantity d-block">Количество: {{product.quantity}}</span>
                <br>
                <span class="cart-item__price d-block">{{product.price}} руб. за штуку</span>
            </div>
            <div class="d-flex flex-column justify-content-center ms-2">
                <p class="cart-item__total-amount">{{product.price * product.quantity}} руб.</p>
                <button @click="$parent.delFromCart(product)" class="cart-item__del-button btn btn-secondary">X</button>
            </div>
        </div>
    `,
});