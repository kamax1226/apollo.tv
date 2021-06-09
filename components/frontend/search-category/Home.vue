<template>
<section id="home" class="iq-main-slider p-0">
    <div id="home-slider" class="slider m-0 p-0">
        <div v-for="(data,index) in sliderData" :key="index" class="slide slick-bg s-bg-6">
            <b-container fluid class="position-relative h-100">
                <div class="slider-inner h-100">
                    <b-row class="align-items-center  h-100">
                        <b-col xl="12" lg="12" md="12" class="slide-title-b">
                            <div class="slide-title-div">
                                <h1 data-animation-in="fadeInDown" data-delay-in="1.2" class="slide-title2">
                                    {{ data.text2 }}
                                </h1>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-container>
        </div>
    </div>
    <!-- <div class="mask-window"></div> -->
    <!-- <div class="slider-window" data-animation-in="fadeInUp" data-delay-in="1.2">
      <img src="../../../assets/images/slider/title.png" class="align-bottom slide-title">
    </div> -->
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
            sliderData: [{
                title: 'bushland',
                age: '18',
                sesson: '2 Seasons',
                text1: "Welcome To",
                text2: "Search",
                text3: "Group TV"
            }, ],
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
