Vue.component('product-review', {
    template: `
      <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
            <b> Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
       </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submited', productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
            } else {
                if (!this.name) this.errors.push("Name required");
                if (!this.review) this.errors.push("Review required");
                if (!this.rating) this.errors.push("Rating required");
            }
        }
    }
})
Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template:
        `
     <ul>
        <li v-for="detail in details">{{detail}}</li>
    </ul>
    `
})
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        `
     <div class="product">
        <div class="product-image">
            <img :src="image" :alt="description">
        </div>
        <div class="product-info">
            <h1>{{title}}</h1>
            <h2>{{description}}</h2>
            <p v-show="inStock">In stock</p>
            <p v-show="!inStock" :class="{outOfStock: inStock}"
            >Out of Stock</p>
            <p v-show="onSale">{{sale}}</p>

            <a :href="link">This is tha link</a>
            <p>Shipping: {{shipping}}</p>
            
             <product-details :details="details"></product-details>
             
            <div v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 class="color-box"
                 :style="{backgroundColor:variant.variantColor}"
                 @mouseover="updateProduct(index)"
            >
            </div>
            <div v-for="size in sizes">
                <p>{{size}}</p>
            </div>

            <div class="buttons">
                <button :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                        @click="addToCart">Add to Cart
                </button>
                
                   <button :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                        @click="removeFromCart">Remove</button>
            </div>
          
        </div>
       <div class="reviews-wrapper">
        <div class="product-review">
                   <h2>Reviews</h2>
                   <p v-if="!reviews.length">There are no reviews</p>
                   <ul>
                       <li v-for="review in reviews">
                           <p>{{review.name}}</p>
                           <p>{{review.rating}}</p>
                           <p>{{review.review}}</p>
                       </li>
                   </ul>
               </div>
               <product-review @review-submited="addReview"></product-review></div>
    </div>
        `,
    data() {
        return {
            product: 'Socks',
            brand: 'Tasty',
            description: 'Very nice and not stinky',
            selectedVariant: 0,
            link: 'https://www.google.com',
            onSale: true,
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
            reviews: [],
        }

    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);

        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        },
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
        sale() {
            if (this.onSale) {
                return `${this.brand} ${this.product} are on sale`
            }
            return `${this.brand} ${this.product} are not sale`

        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99

        }
    }
})
const app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);

        },
        removeItem(id) {
            for (var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }

})