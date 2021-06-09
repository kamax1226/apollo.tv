<template>
<!-- loader Start -->
<!-- <div id="loading" :style="style">
    <div id="loading-center" />
</div> -->
<div id="loading1">
    <div class="loadingio-spinner-dual-ring-v9pna4viv1d">
        <div class="ldio-1b03m6p5bfr">
            <div></div>
            <div>
                <div></div>
            </div>
        </div>
    </div>
</div>
<!-- loader END -->
</template>

<script>
import { mapGetters } from 'vuex'
import lightLoader from '../../../assets/images/loader.gif'
import { animation } from '../../../assets/app/app'
export default {
    name: 'Loader',
    props: {
        dark: { type: Boolean, default: false }
    },
    computed: {
        style() {
            return `background: var(--iq-body-bg) url(${lightLoader}) no-repeat scroll center center;background-size: 4%;`
        },
        ...mapGetters({
            darkMode: 'Setting/darkModeState'
        })
    },
    watch: {
        $route(to, from) {
            // eslint-disable-next-line no-mixed-operators
            if (to.meta.layout !== undefined && from.meta.layout === undefined || to.meta.layout === undefined && from.meta.layout !== undefined || to.meta.layout !== undefined && from.meta.layout !== undefined) {
                const load = document.getElementById('loading1')
                animation.fadeIn(load, { duration: 80 })
                load.classList.remove('d-none')
            }
        }
    },
    mounted() {}
}
</script>

<style scoped>
#loading1 {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: black;
    z-index: 1;
}

@keyframes ldio-1b03m6p5bfr {
    0% {
        transform: rotate(0)
    }

    100% {
        transform: rotate(360deg)
    }
}

.ldio-1b03m6p5bfr div {
    box-sizing: border-box !important
}

.ldio-1b03m6p5bfr>div {
    position: absolute;
    width: 68px;
    height: 68px;
    top: 16px;
    left: 16px;
    border-radius: 50%;
    border: 4px solid #000;
    border-color: #e91c48 transparent #e91c48 transparent;
    animation: ldio-1b03m6p5bfr 0.9615384615384615s linear infinite;
}

.ldio-1b03m6p5bfr>div:nth-child(2) {
    border-color: transparent
}

.ldio-1b03m6p5bfr>div:nth-child(2) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
}

.ldio-1b03m6p5bfr>div:nth-child(2) div:before,
.ldio-1b03m6p5bfr>div:nth-child(2) div:after {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 4px;
    top: -4px;
    left: 28px;
    background: #e91c48;
    border-radius: 50%;
    box-shadow: 0 64px 0 0 #e91c48;
}

.ldio-1b03m6p5bfr>div:nth-child(2) div:after {
    left: -4px;
    top: 28px;
    box-shadow: 64px 0 0 0 #e91c48;
}

.loadingio-spinner-dual-ring-v9pna4viv1d {
    width: 100px;
    height: 100px;
    display: inline-block;
    overflow: hidden;
    background: none;
    margin-left: calc(100vw / 2 - 100px / 2);
    margin-top: calc(100vh / 2 - 100px / 2);
}

.ldio-1b03m6p5bfr {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
    /* see note above */
}

.ldio-1b03m6p5bfr div {
    box-sizing: content-box;
}
</style>
