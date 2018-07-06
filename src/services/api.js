import axios from 'axios'
import { Observable } from 'rxjs'

const API_URL = 'http://localhost:18081'

// const http = axios.create({
//   baseURL: API_URL
// })

// const get = (url, config) => Observable
//   .fromPromise(http.get(url, config))
//   .map((resp) => resp.data)
//   .catch((err) => Observable.throw(err.response.data))

// export const search = (q, page) => get('/api/sido', { params: { q, sort: 'stars', page } })
export default class RestApiService {

  sendRequest(url, config) {
    Observable
    .fromPromise(http.get(url, config))
    .map((resp) => resp.data)
    .catch((err) => Observable.throw(err.response.data))
  }

}