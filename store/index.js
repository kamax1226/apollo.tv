import Cookie from "js-cookie";
import Vuex from "vuex";
import Vue from 'vue'

export const state = () => ({
  token: null,
  email: '',
  password: ''
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  },
};

export const actions = {
  authenticateUser(vuexContext, authData) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
        username: authData.email,
        password: authData.password
    });

  //   let body = queryStr['stringify']({
  //     username: "pometunmmn@gmail.com",
  //     password: "67445"
  // });

    return this.$axios
      .$post("login", body)
      .then(result => {
        if(result.success == false) {
          return {
            success: false,
            message: result.message
          }
        }

        vuexContext.commit("setToken", result.data.token);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime() + Number.parseInt(result.data.expires_at) * 1000
        );
        Cookie.set("jwt", result.data.token);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + Number.parseInt(result.data.expires_at) * 1000
        );
        return {
          success: true,
          message: "success"
        }
      })
      .catch(e => {
        console.log(e);
        return {
          success: false,
          message: "error"
        }
      });
  },
  
  initAuth(vuexContext, req) {
    let token;
    let expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        console.log("Cookie not exist");
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("expirationDate="))
        .split("=")[1];
    } else {
      token = localStorage.getItem("token");
      expirationDate = localStorage.getItem("tokenExpiration");
    }
    /*if (new Date().getTime() > +expirationDate || !token) {
      console.log("No token or invalid token");
      vuexContext.dispatch("logout");
      return;
    }*/
    vuexContext.commit("setToken", token);
  },

  logout(vuexContext) {
    vuexContext.commit("clearToken");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
  },

  loadMovieBanner(vuexContext) {

    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    let category_id = 5;
    return this.$axios
      .$get("info/movies/items/" + category_id + "/0/10", body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data.infos;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title;
          item.vote = data.meta.votes;
          item.rank = data.meta.rank;
          item.poster = data.meta.poster;
          item.name = data.genres;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadTvShowBanner(vuexContext) {

    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    let category_id = 57;
    return this.$axios
      .$get("info/tvshows/items/" + category_id + "/0/10", body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data.infos;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title;
          item.vote = data.meta.votes;
          item.poster = data.meta.poster;
          item.name = data.genres;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadChannelBanner(vuexContext) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    let category_id = 26;
    return this.$axios
      .$get("info/livetv/categories/" + category_id + "/0/10", body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.name;
          item.poster = data.logo;
          item.name = data.id;
          item.id = data.id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadSportBanner(vuexContext) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    let category_id = 10;
    return this.$axios
      .$get("event/files/" + category_id + "/0/10", body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.title;
          item.poster = data.category.logo_url;
          item.date = (data.event_date.split("T"))[0];
          item.id = data.id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadMovieCategoryList(vuexContext) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    return this.$axios
      .$get("info/movies/categories", body)
      .then(result => {
        if(!("data" in result)) return [];
        return result.data;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadTvShowCategoryList(vuexContext) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    return this.$axios
      .$get("info/tvshows/categories", body)
      .then(result => {
        if(!("data" in result)) return [];
        return result.data;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadChannelCategoryList(vuexContext) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    return this.$axios
      .$get("info/livetv/categories", body)
      .then(result => {
        if(!("data" in result)) return [];
        return result.data;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadSportCategoryList(vuexContext) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    return this.$axios
      .$get("event/categories", body)
      .then(result => {
        if(!("data" in result)) return [];
        return result.data;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadCategoryMovieList(vuexContext, data) {

    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/movies/items/" + data.category_id + "/" + data.offset + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data.infos;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title;
          item.vote = data.meta.votes;
          item.rank = data.meta.rank;
          item.poster = data.meta.poster;
          item.name = data.meta.company;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadCategoryTvShowList(vuexContext, data) {

    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/tvshows/items/" + data.category_id + "/" + data.offset + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data.infos;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title;
          item.vote = data.meta.votes;
          item.poster = data.meta.poster;
          item.name = data.meta.company;
          item.seasons = data.meta.seasons;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadCategoryChannelList(vuexContext, data) {

    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    
    return this.$axios
      .$get("info/livetv/categories/" + data.category_id + "/" + data.offset + "/" + data.limit + "?with_tv_guide=" + data.guide, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.name;
          item.poster = data.logo;
          item.name = data.id;
          item.id = data.id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadCategorySportList(vuexContext, data) {

    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    
    return this.$axios
      .$get("event/files/" + data.category_id + "/" + data.offset + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.title;
          item.poster = data.category.logo_url;
          item.date = (data.event_date.split("T"))[0];
          item.id = data.id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadSearchMovieList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/movie/search/" + data.keyword + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title;
          item.vote = data.meta.votes;
          item.rank = data.meta.rank;
          item.poster = data.meta.poster;
          item.name = data.meta.genres;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadSearchTvShowList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/tvshow/search/" + data.keyword + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title;
          item.vote = data.meta.votes;
          item.poster = data.meta.poster;
          item.name = data.meta.genres;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadSearchChannelList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/livetv/search/" + data.keyword + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.name;
          item.poster = data.logo;
          item.name = data.id;
          item.id = data.id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadSearchSportList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("event/search/" + data.keyword + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.title;
          item.poster = data.category.logo_url;
          item.date = (data.event_date.split("T"))[0];
          item.id = data.id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        res = res.sort((a, b) => b.date - a.date);
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadFavoriteMovieList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("favorite/movie/list/" + data.offset + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title;
          item.vote = data.meta.votes;
          item.rank = data.meta.rank;
          item.poster = data.meta.poster;
          item.name = data.meta.genres;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadFavoriteTvShowList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("favorite/tvshow/list/" + data.offset + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title;
          item.vote = data.meta.votes;
          item.poster = data.meta.poster;
          item.name = data.meta.genres;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadNewEpisodeList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/tvshow/episodes/newest/" + data.offset + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title + " S:" + data.season + " E:" + data.episode + " " + data.meta.meta_episode.title;
          item.vote = data.meta.votes;
          item.poster = data.meta.poster;
          item.name = data.meta.genres;
          item.season = data.season;
          item.episode = data.episode;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadDateEpisodeList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/tvshow/episodes/" + data.date, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title + " S:" + data.season + " E:" + data.episode + " " + data.meta.meta_episode.title;
          item.vote = data.meta.votes;
          item.poster = data.meta.poster;
          item.name = data.meta.genres;
          item.season = data.season;
          item.episode = data.episode;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadFavoriteChannelList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("favorite/livetv/list/" + data.offset + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.name;
          item.poster = data.logo;
          item.name = data.id;
          item.id = data.id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadFavoriteSportList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("event/favorite/list/" + data.offset + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.title;
          item.poster = data.category.logo_url;
          item.date = (data.event_date.split("T"))[0];
          item.id = data.id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadYearMovieList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/movies/year/" + data.year + "/" + data.offset + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title;
          item.vote = data.meta.votes;
          item.rank = data.meta.rank;
          item.poster = data.meta.poster;
          item.name = data.meta.genres;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadYearTvShowList(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/tvshows/year/" + data.year + "/" + data.offset + "/" + data.limit, body)
      .then(result => {
        if(!("data" in result)) return [];
        let datas = result.data;
        let res = [];
        for(let data of datas) {
          let item = {};
          item.title = data.meta.title;
          item.vote = data.meta.votes;
          item.poster = data.meta.poster;
          item.name = data.meta.genres;
          item.imdb_id = data.imdb_id;
          item.is_favorite = data.is_favorite;
          res.push(item);
        }
        return res;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadUserInfo(vuexContext) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("user", body)
      .then(result => {
        if(!("data" in result)) return [];
        return result.data;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadMovieItem(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/movies/" + data.imdb_id, body)
      .then(result => {
        if(!("data" in result)) return [];
        return (result.data)[0];
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadTvShowItem(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/tvshows/" + data.imdb_id, body)
      .then(result => {
        if(!("data" in result)) return [];
        return (result.data)[0];
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadChannelItem(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("info/livetv/epg/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return [];
        return (result.data)[0];
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadSportItem(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("event/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return [];
        return (result.data)[0];
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },

  loadMovieSrc(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("play/movie/" + data.imdb_id, body)
      .then(result => {
        if(!("data" in result)) return '';
        return result.data.secure_link;
      })
      .catch(e => {
        console.log(e);
        return '';
      });
  },

  loadTvShowSrc(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("play/tvshow/" + data.imdb_id + "/" + data.season + "/" + data.episode, body)
      .then(result => {
        if(!("data" in result)) return '';
        return result.data.secure_link;
      })
      .catch(e => {
        console.log(e);
        return '';
      });
  },

  loadChannelSrc(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("play/livetv.epg/" + data.id + ".m3u8", body)
      .then(result => {
        if(!("data" in result)) return '';
        return result.data.secure_link;
      })
      .catch(e => {
        console.log(e);
        return '';
      });
  },

  loadSportSrc(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$get("play/event/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return '';
        return result.data.secure_link;
      })
      .catch(e => {
        console.log(e);
        return '';
      });
  },

  movieAddFavorite(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$post("favorite/movie/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return false;
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  },

  tvshowAddFavorite(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$post("favorite/tvshow/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return false;
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  },

  channelAddFavorite(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$post("favorite/livetv/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return false;
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  },

  sportAddFavorite(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$post("event/favorite/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return false;
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  },

  movieRemoveFavorite(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$delete("favorite/movie/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return false;
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  },

  tvshowRemoveFavorite(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$delete("favorite/tvshow/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return false;
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  },

  channelRemoveFavorite(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$delete("favorite/livetv/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return false;
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  },

  sportRemoveFavorite(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });

    return this.$axios
      .$delete("event/favorite/" + data.id, body)
      .then(result => {
        if(!("data" in result)) return false;
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  },

  loadChannelGuide(vuexContext, data) {
    let queryStr = require('querystring');
    let body = queryStr['stringify']({
    });
    
    return this.$axios
      .$get("epg/" + data, body)
      .then(result => {
        if(!("data" in result)) return [];
        return result.data;
      })
      .catch(e => {
        console.log(e);
        return [];
      });
  },
};

export const getters = {
  isAuthenticated(state) {
    return state.token != null && state.token != 'undefined';
  },

  getToken(state) {
    return state.token;
  },
};
