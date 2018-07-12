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
                .pipe(
                    map(x => x.response.body),
                    filter(x => x['totalCount'] > 0 ),
                    pluck('items'),
                    pluck('item'),
                    map(x=> common.checkArray(x)),
                    map(x => common.deleteField(x, ['년','지역코드']))
                );
    },
    getApiDataJson(url) {
        const apiJsonData = axios.get(url).then()
        return  fromPromise(apiJsonData)
                .pipe(
                    map(x => x.data),
                    flatMap(x=>x)
                );
    }
}