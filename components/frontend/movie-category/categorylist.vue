<template>
<section id="iq-favorites">
    <b-container>
        <b-row>
            <b-col sm="12" class="overflow-hidden">
                <CategoryItem v-if="true" :category="categoryData" />
            </b-col>
        </b-row>
    </b-container>
</section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import CategoryItem from './categoryitem.vue';
export default {
    name: 'CategoryList',
    components: {
        VueSlickCarousel,
        CategoryItem
    },
    props: {
        category: {
            type: Object,
            required: false
        }
    },

    data() {
        return {
            categoryData: this.category ? { ...this.category } : [],
        }
    },
    computed: {},
    mounted() {},
    methods: {},
    fetchOnServer: false
}
</script>
