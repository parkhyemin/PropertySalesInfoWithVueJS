import {_} from 'vue-underscore';
import { Observable, from } from 'rxjs';
import { filter, bufferCount, map, flatMap, pluck, first } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'
import axios from 'axios'
import xml from 'xml2json-light';
import common from '../service/Common.js'

export default {
    created() {
        console.log('TestService created')
        // _.each([1,2],function(x){
        //     console.log(x)
        // });
        this.mounted()
        return {v : '1', t : 'ttt'}
    },
    mounted() {
        console.log('TestService mounted')
    },
    getApiData() {
        // 법정동 아파트 거래 리스트 API call
        const apiXmlData = axios.get('/api/getRTMSDataSvcAptTrade?LAWD_CD=11110&DEAL_YMD=201605')
                        .then((result) => xml.xml2json(result.data));
        
        return fromPromise(apiXmlData)
        .pipe(map(x => x.response.body))
        .pipe(filter(x => x['totalCount'] > 0 ))
        .pipe(pluck('items'))
        .pipe(pluck('item'))
        .pipe(map(x=> common.toArray(x)))
        .pipe(map(x => common.deleteField(x, ['년','지번','지역코드'])))
        .pipe(flatMap(x=> x));
    }
}