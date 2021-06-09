import Vue from 'vue'

Vue.component('iq-card', require('../components/core/cards/iq-card').default)
Vue.component('Lottie', require('../components/core/lottie/Lottie').default)
Vue.component('Progressbar', require('../components/core/progressbar/Progressbar').default)
Vue.component('Slick', require('../components/core/slider/Slick').default)
Vue.component('V-select', require('../components/core/select2/Select2').default)

Vue.component('tab-nav', require('../components/core/tab/tab-nav').default)
Vue.component('tab-nav-items', require('../components/core/tab/tab-nav-items').default)
Vue.component('tab-content', require('../components/core/tab/tab-content').default)
Vue.component('tab-content-item', require('../components/core/tab/tab-content-item').default)
Vue.component('TimeLine', require('../components/core/timeline/TimeLine').default)

Vue.prototype.randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

Vue.prototype.getToday = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
}

Vue.prototype.getDateCalendar = (sub) => {
  var today = new Date();
  var dateOffset = (24*60*60*1000) * sub;
  today.setTime(today.getTime() - dateOffset);
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
}

Vue.prototype.getDuration = (duration) => {
  var hour = Math.floor(duration / 60);
  var min = duration % 60;
  return hour + "h " + min + "m";
}

Vue.prototype.getDate = (date) => {
  var dates = date.toString().split("T");
  return dates[0];
}

Vue.prototype.dateParse = (dateStr) => {
  var y = dateStr.substring(0, 4);
  var m = dateStr.substring(4, 6);
  var d = dateStr.substring(6, 8);
  var h = dateStr.substring(8, 10);
  var i = dateStr.substring(10, 12);
  var s = dateStr.substring(12, 14);

  return y + "-" + m + "-" + d + " " + h + ":" + i;
}

Vue.prototype.getVideoType = (videoUrl) => {
  var type = "video/mp4";
  if(videoUrl.includes(".mp4")) 
    type = "video/mp4";
  else if(videoUrl.includes(".m3u8"))
    type = "application/x-mpegurl";
  else type = "video/webm";
  return type;
}

Vue.prototype.isMKV = (videoUrl) => {
  if(videoUrl.includes(".mkv")) 
    return true;
  return false;
}