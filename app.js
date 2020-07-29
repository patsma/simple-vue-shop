const app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        brand: 'Tasty',
        description: 'Very nice and not stinky',
        selectedVariant: 0,
        link: 'https://www.google.com',
        onSale: true,
        cart: 0,
        details: ["80% awesome", "20% wool", "All gender"],
        sizes: ["big", "medium", "small"],
        variants: [
            {
                variantId: 1,
                variantQuantity: 10,
                variantColor: "green",
                variantImage: './assets/img/socks-green.jpg'
            },
            {
                variantId: 2,
                variantQuantity: 0,
                variantColor: "blue",
                variantImage: './assets/img/socks-blue.jpg'
            }
        ],

    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        removeFromCart() {
            this.cart -= 1;
        },

        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        brandProduct() {
            return `${this.brand} ${this.product}`
        }
    }
})