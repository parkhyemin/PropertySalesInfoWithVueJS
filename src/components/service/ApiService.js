
import { filter, map, flatMap, pluck, concat, tap, toArray } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import axios from 'axios'
import xml from 'xml2json-light';
import {_} from 'vue-underscore';
import common from '../service/Common.js'
import { debug } from 'util';

export default {
    
    getApiDataXml(url, lawdCd, dealYmd) {
        // 법정동 아파트 거래 리스트 API call
        let option = {
            params: {
                LAWD_CD: lawdCd,
                DEAL_YMD : dealYmd
            }
        }
        const apiXmlData = axios.get(url, option)
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
    },
    getMergeData(url, lawdCd, dealYmd) {
        const year = dealYmd.substring(0,4);
        let merge$;
        if( dealYmd.length < 6 ){
            // 월 전체 선택했을 때
            const curMon = new Date().getMonth() + 1;
            let streamArray = [];
            for(let i=1; i<=curMon; i++){
                let ymd = year +common.addZero(i);
                const s$ = this.getApiDataXml(url, lawdCd, ymd)
                streamArray.push(s$); 
            }
            merge$ = merge(streamArray)
                    .pipe(
                        flatMap(x => x),
                        toArray(),
                        map(x => _.sortBy(_.flatten(x), '월'))
                    );
        }else{
            // 월 선택 했을 때
            merge$ =  this.getApiDataXml(url, lawdCd, dealYmd);
        }

        return merge$;
        
    },
    
}