import { filter, map, flatMap, pluck } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'
import axios from 'axios'
import xml from 'xml2json-light';
import common from '../service/Common.js'

export default {
    
    getApiDataXml(url) {
        // 법정동 아파트 거래 리스트 API call
        const apiXmlData = axios.get(url)
                        .then((result) => xml.xml2json(result.data));
        
        return  fromPromise(apiXmlData)
                .pipe(map(x => x.response.body))
                .pipe(filter(x => x['totalCount'] > 0 ))
                .pipe(pluck('items'))
                .pipe(pluck('item'))
                .pipe(map(x=> common.checkArray(x)))
                .pipe(map(x => common.deleteField(x, ['년','지번','지역코드'])))
                .pipe(flatMap(x=> x));
    },
    getApiDataJson(url) {
        const apiJsonData = axios.get(url).then()
        return  fromPromise(apiJsonData)
                .pipe(map(x => x.data))
                .pipe(flatMap(x=>x));
    }
}