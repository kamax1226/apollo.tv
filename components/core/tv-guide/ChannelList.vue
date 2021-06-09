<template>
<div v-if="$fetchState.pending">
    <div class="loadingio-spinner-dual-ring-v9pna4viv1d channellist">
        <div class="ldio-1b03m6p5bfr">
            <div></div>
            <div>
                <div></div>
            </div>
        </div>
    </div>
</div>
<p v-else-if="$fetchState.error">Error while fetching tvshows</p>
<div v-else>
    <div class="align-items-center w-100 fadeInUp">
        <div class="guide-div">
            <div class="select-guide">
                <div class="select-description-guide">
                    Select Channel
                </div>
                <div class="sea-epi iq-custom-select d-inline-block">
                    <V-select v-model="selected" @input="setSelected" :options="channelOptions" />
                </div>
            </div>
            <div class="favorites-contents">
                <div class="channel__guide__view">
                    <div class="channel__section">
                        <div class="channel__list__section">
                            <div class="channel__header">
                                <span>Channel</span>
                            </div>

                            <div class="channel__name__box" :data-channel="channel.id" v-for="(channel, index) in channelList" :key="index" track-by="channel.id">
                                <nuxt-link :to="{ path: '/frontend/channel-detail', query: { id: channel.id } }"  class="hover-buttons">
                                    <div class="channel__name">
                                        <div>{{channel.title}}</div>
                                        <!-- <div style="font-size:0.8em;font-weight:bold;color: #4085ce;">{{channel.name}}</div> -->
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>

                        
                        <div class="channel__programme__section">
                            <div class="programme__header">
                                <div class="header__time" v-for="(n, index) in hoursList" :key="index">
                                    <p v-if="currentDate == n.date.substr(n.date.length - 1) && currentTime == n.time" class="current-time">{{n.date}} {{n.time}}:00 - {{n.time + 1}}:00</p>
                                    <p v-else>{{n.date}} {{n.time}}:00 - {{n.time + 1}}:00</p>
                                </div>
                            </div>

                            <div class="programme__timing__section">
                                <div class="programme__row" v-for="(channel, index) in channelList" :key="index" track-by="channel.id" :data-channel-id="channel.id" :data-programme-fetched="typeof channel.programmes != 'undefined'">
                                    <span class="programme programme--no__data" v-show="typeof channel.programmes == 'undefined'">Data Loading</span>
                                    <span class="programme" :style="{ flex:'0 0 ' + (programme.duration * minuteWidthPx - 2) + 'px' }" v-for="(programme, index) in channel.programmes" track-by="$index" :key="index" @mouseover="onProgrammeHover($event,programme, channel)" @mouseout="onProgrammeHoverOut">
                                        <div> {{programme.title}}</div>
                                        <sup> {{programme.duration}}mins.</sup>
                                        <sup style="float:right" class="guide-description">{{programme.desc}}</sup>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProgrammeDetailsPopup v-show="currentProgramme" :programmeDetails="currentProgramme" :channelDetails="currentChannel" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/*eslint-disable*/
import {
    mapGetters,
    mapActions,
    mapMutations
} from 'vuex'
import Vue from 'vue'
import ChannelDetails from './ChannelDetails'
import ProgrammeDetailsPopup from './ProgrammeDetails'
import moment from 'moment'
// import { Observable } from 'rxjs/Observable'
// import 'rxjs/add/observable/fromEvent'
// import 'rxjs/add/operator/scan'
import Rx from 'rxjs/Rx'
export default {
    name: 'ChannelList',
    components: {
        ChannelDetails,
        ProgrammeDetailsPopup
    },
    async fetch() {
        let data = {
            limit: 20
        };

        this.categoryList = await this.$store.dispatch("loadChannelCategoryList");
        this.categoryList.forEach((item, index) => {
            this.channelOptions.push({
                id: item.id,
                value: item.id,
                text: item.name
            });
            if (index == 0) {
                console.log("first fetch: " + item.id)
                this.selected = '' + item.id;
                this.setChannels(item.id);
            }
        });
    },
    data() {
        return {
            channelList: {},
            currentProgramme: null,
            currentChannel: null,
            // minuteWidthPx: window.innerWidth > 600 ? 5 : 3,
            minuteWidthPx: 4,
            $programmeRows: null,
            SCROLL_WAIT_MS: 300,
            categoryList: [],
            channelOptions: [],
            selected: '-1',
            prevPosition: 0,
            currentDate: '',
            currentTime: 0
        }
    },
    mounted() {
        let d = new Date();
        this.currentDate = d.getDate();
        this.currentTime = d.getHours();
        // this.$programmeRows = document.querySelectorAll('.programme__timing__section .programme__row')
        // console.log(this.$programmeRows);
        // this.onViewUpdated()
    },
    subscriptions() {
        let context = this;

        return {
            scrollPage: Rx.Observable.fromEvent($window.document, 'scroll')
                .debounce(e => Rx.Observable.timer(this.SCROLL_WAIT_MS))
                .map(function (scrollEvent) {
                    console.log("onViewUpdated scroll");
                    context.onViewUpdated()
                })
                .distinctUntilChanged(),
        }
    },
    computed: {
        hoursList() {
            let d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            let date = d.getDate();

            let timeArray = [];
            for (let i = 0; i < 72; i++) {
                let row = {};
                if (i > 23 && i < 48) {
                    let temp1 = (date + 1) < 10 ? '0' + (date + 1) : (date + 1);
                    row['date'] = year + '-' + month + '-' + temp1;
                    row['time'] = i - 24;
                } else if (i >= 48) {
                    let temp2 = (date + 2) < 10 ? '0' + (date + 2) : (date + 2);
                    row['date'] = year + '-' + month + '-' + temp2;
                    row['time'] = i - 48;
                } else {
                    let temp3 = date < 10 ? '0' + date : date;
                    row['date'] = year + '-' + month + '-' + temp3;
                    row['time'] = i;
                }
                timeArray.push(row);
            }
            return timeArray
        }
    },
    methods: {
        onChannelClick(channel) {
            this.$store.dispatch({
                type: 'fetchChannelDetails',
                channel: channel
            })
        },
        onProgrammeHover(e, programme, channel) {
            this.currentProgramme = programme
            this.currentChannel = channel
        },
        onProgrammeHoverOut() {
            this.currentProgramme = null
            this.currentChannel = null
        },
        setSelected(value) {
            console.log("setSelected: " + value);
            if (value != '') {
                this.setChannels(value);
            }
        },

        setChannels(id) {
            console.log("setChannels: " + id)
            this.channelList = [];

            const data = {
                category_id: id,
                limit: 100,
                offset: 0,
                guide: 1
            };

            this.$store.dispatch("loadCategoryChannelList", data)
                .then(res => {
                    if (res == null || res == undefined || res.length == 0) return;
                    this.channelList = res;
                    setTimeout(() => { this.onViewUpdated() }, this.SCROLL_WAIT_MS)
                });
        },
        onViewUpdated() {
            this.$programmeRows = document.querySelectorAll('.programme__timing__section .programme__row')
            function isElementInViewport(e) {
                for (var f = e.offsetTop, t = e.offsetLeft, o = e.offsetWidth, n = e.offsetHeight; e.offsetParent;) e = e.offsetParent, f += e.offsetTop, t += e.offsetLeft;
                return f < window.pageYOffset + window.innerHeight && t < window.pageXOffset + window.innerWidth && f + n > window.pageYOffset && t + o > window.pageXOffset
            }

            function isProgrammeDataNotPresent(elem) {
                return elem.getAttribute('data-programme-fetched') == null
            }
            console.log("this.$programmeRows: " + this.$programmeRows.length);

            let channelIdListVisibleInViewPort = Array.from(this.$programmeRows)
                .filter(isElementInViewport)
                .filter(isProgrammeDataNotPresent)
                .map(elem => {
                    return elem.getAttribute('data-channel-id');
                })
            console.log("channelIdListVisibleInViewPort: " + channelIdListVisibleInViewPort.length);
            if (channelIdListVisibleInViewPort.length > 0) {
                this.fetchProgrammes(channelIdListVisibleInViewPort)
            }
        },
        async fetchProgrammes(channelIds) {
            let data = '';
            for (let i = 0; i < channelIds.length; i++) {
                data += channelIds[i] + ',';
            }

            let list = await this.$store.dispatch("loadChannelGuide", data)

            list.forEach(key => {
                let objIndex = this.channelList.findIndex(channel => channel.id == key.id)
                if (key.full != null && key.full.length != 0) {
                    for (let i = 0; i < key.full.length; i++) {
                        if (key.full[i].start != undefined && key.full[i].stop != undefined) {
                            let time_start = Vue.prototype.dateParse((key.full[i].start.split(' '))[0]);
                            let time_end = Vue.prototype.dateParse((key.full[i].stop.split(' '))[0]);
                            let diff = Math.round(((new Date(time_end).getTime()) - (new Date(time_start).getTime())) / 60000)
                            key.full[i].start = time_start;
                            key.full[i].stop = time_end;
                            key.full[i].duration = diff
                        }
                    }
                    this.channelList[objIndex]['programmes'] = key.full;
                }
            });
            let temp = {id: "tempapollochannellist", is_favorite: true, name: "coronavirus.us", poster: "https://media.tv4.live/coronavirus.us.png", programmes: []}
            this.channelList.push(temp);
            this.channelList = this.channelList.filter(function (element) {
                return element.id != "tempapollochannellist"
            })
        },
        handleScroll () {
            if (Math.abs(this.prevPosition - window.scrollY) > 500) {
                this.onViewUpdated()
                this.prevPosition = window.scrollY;
                console.log("scrollchanged");
            }
        }
    },
    created () {
        if (process.browser) {
            console.log("window: " + window.innerWidth, window.innerHeight);
        }
        if (process.client) { 
            window.addEventListener('scroll', this.handleScroll);
        }
    },
    destroyed () {
        if (process.client) { 
            window.removeEventListener('scroll', this.handleScroll);
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');

/*=============================================== CONTAINER ===============================================*/
.channel__guide__view {
    width: 80vw;
    margin: 100px auto;
    text-align: left;
    box-sizing: border-box;
    position: relative;
    /*user-select: none;*/
}

/*=============================================== CHANNEL FILTER ===============================================*/

.channel__filter {
    background-color: #333;
    color: #368ed2;
    padding: 20px;
    margin-bottom: 20px;
}

.channel__filter .btn__clear__favourites {
    background-color: #1b62cc;
    color: #fff5f5;
    border: 1px solid #6894d4;
    cursor: pointer;
    padding: 5px 10px;
}

.channel__filter input {
    margin: 0px 10px;
    outline: none;
    border-radius: 20px;
    padding: 3px 15px;
}

/*=============================================== CHANNEL SECTION ===============================================*/

.channel__section {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    font-family: 'Raleway', sans-serif;
}

/*=============================================== CHANNEL LIST COLUMN ( CHANNEL NAME + FAVOURITE ICON )===============================================*/

.channel__list__section {
    display: flex;
    flex-direction: column;
    flex: 0 0 200px;
}

.channel__list__section>div {
    border-bottom: 1px solid #C4C4C4;
    padding: 0 10px;
    display: flex;
    flex: 0 0 42px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.channel__list__section .favourite {
    font-size: 1.5em;
    color: rgb(231, 9, 98);
    text-align: center;
}

.channel__list__section .channel__header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-family: 'Raleway', sans-serif;
    font-size: 1.4em;
    background-color: black;
    color: var(--iq-primary);
    border-radius: 20px 0px 0px 0px;
}

.channel__header .active {
    font-weight: bold;
}

.channel__header>* {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
}

.channel__name__box {
    font-weight: bold;
    font-size: 0.8em;
    display: block;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: black;
}

.invert {
    transform: rotate(180deg);
}

/*=============================================== EPG TV PROGRAMME TIMING ( PROGRAMME TIME + BUTTON TO MOVE GUIDE )  ===============================================*/

.channel__programme__section {
    background: #434343;
    overflow-x: scroll;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
}

.channel__programme__section .programme__header {
    font-size: 0.8em;
    height: 42px;
    /* background-color: var(--iq-info);*/
    color: white;
    line-height: 40px;
    display: flex;
    flex-direction: row;
}

.programme__header .header__time {
    flex: 0 0 298px;
    margin-left: 2px;
    margin-bottom: 2px;
    box-sizing: border-box;
    background-color: var(--iq-info);
    /* border-right: 2px solid #464646; */
    text-align: center;
}

.programme__row {
    display: flex;
    flex-direction: row;
    height: 42px;
    /* border-bottom: 1px solid #C4C4C4;*/
    /*padding: 0 10px;*/
}

.programme__timing__section {
    /*background-color: #793C49;*/
}

.programme__row .programme {
    flex: 0 0 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 2px;
    margin-bottom: 2px;
    /* line-height: 30px; */
    padding: 7px 10px;
    font-size: 0.8em;
    font-weight: bold;
    box-sizing: border-box;
    /* border-right: 1px solid #dcdcdc; */
    background-color: #5b5b5b;
}

.programme__row .programme--no__data {
    line-height: 40px;
    padding: 0 10px;
    font-size: 0.8em;
    font-weight: bold;
    box-sizing: content-box;
}

.programme__row sup {
    color: #29a2f3;
    line-height: 15px;
}

/*=============================================== OTHERS  ===============================================*/

/*=============================================== MOBILE DEVICE ===============================================*/

@media screen and (max-width: 600px) {

    /*=============================================== CONTAINER ===============================================*/
    .channel__guide__view {
        font-size: 0.8em;
        width: 94vw;
        margin: 50px auto;
    }

    /*=============================================== CHANNEL FILTER ===============================================*/
    .channel__filter .btn__clear__favourites,
    .channel__filter input {
        margin: 10px 0px;
        width: 100%;
        padding: 5px;
    }

    /*=============================================== CHANNEL SECTION ===============================================*/
    .channel__list__section {
        flex: 0 0 60px;
    }

    /*=============================================== CHANNEL LIST COLUMN ( CHANNEL NAME + FAVOURITE ICON )===============================================*/
    .channel__list__section .channel__name__box {
        width: 60px;
        padding: 0 5px;
        white-space: normal;
    }

    .channel__list__section .channel__header {
        width: 60px;
        font-size: 0.8em;
        flex-direction: column;
    }

    .channel__name div {
        display: block;
        text-align: center
    }

    /*=============================================== EPG TV PROGRAMME TIMING ( PROGRAMME TIME + BUTTON TO MOVE GUIDE )  ===============================================*/
    .programme__header .header__time {
        flex: 0 0 180px;
    }

    .programme__row .programme {
        flex: 0 0 180px;
    }

    /*=============================================== OTHERS  ===============================================*/
    .guide-description {
        display: none;
    }
}
</style>
