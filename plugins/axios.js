export default function({ $axios, store, redirect }) {
    $axios.onRequest(request => {

      //let baseUrl = 'https://tv4.live/api/';
      //request.url = baseUrl + request.url;

      request.headers.common['content-type'] = 'application/x-www-form-urlencoded';
      if(store.getters['isAuthenticated'])
          request.headers.common['Authorization'] = 'Bearer ' + store.getters['getToken'];
      
      return request
    })
  
    $axios.onResponse(response => {
      //console.log('[ RESPONSE ]' + response.request.responseURL, response)
      // TODO: If token expires, perform a silent refresh
      response['success'] = true;
      return response;
    })
  
    $axios.onError(error => {
      console.error('[ ERROR ]', error)
      const code = parseInt(error.response && error.response.status)
      /*if (code === 401) {
        store.state.sessionStorage.authUser = null
        return redirect('/')
      }*/
      error.response['success'] = false;
      return error.response;
    })
  }