<template>
<section id="home" class="iq-main-slider p-0">
    <div id="home-slider" class="slider m-0 p-0">
        <div v-for="(data,index) in sliderData" :key="index" class="slide slick-bg s-bg-2">
            <b-container fluid class="position-relative h-100">
                <div class="slider-inner h-100">
                    <b-row class="align-items-center  h-100">
                        <b-col xl="12" lg="12" md="12" class="slide-title-b">
                            <div class="slide-title-div">
                                <h1 class="slide-title2 fade-in-text">
                                    {{ data.text2 }}
                                </h1>
                                <h1>
                                    &nbsp;&nbsp;
                                </h1>
                                <h1 class="slide-title3 fade-in-text">
                                    {{ data.text3 }}
                                </h1>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-container>
        </div>
    </div>
</section>
</template>

<script>
import Slick from '../../core/slider/Slick'
export default {
    name: 'Home',
    components: {
        Slick
    },
    data() {
        return {
            sliderData: [
                { title: 'bushland', age: '18', sesson: '2 Seasons', text1: "Welcome To", text2: "TV", text3: "Shows" },
            ],
            homeSliderOption: {
                autoplay: false,
                speed: 800,
                lazyLoad: 'progressive',
                arrows: true,
                dots: false,
                prevArrow: '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
                nextArrow: '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        dots: true,
                        arrows: false
                    }
                }]
            }
        }
    },
    mounted() {},
    methods: {}
}
</script>
