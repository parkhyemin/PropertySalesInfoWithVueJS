
import { filter, map, flatMap, pluck, debounceTime, tap, toArray, first, retry } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import axios from 'axios'
import xml from 'xml2json-light';
import {_} from 'vue-underscore';
import common from '../service/Common.js'

export default {
    
    /**
     * 공공데이터 API를 통해 아파트, 연립다세대, 단독다가구 실거래 데이터를 xml 포멧으로 응답받는다.
     * xml 포멧의 데이터를 json 포멧으로 변경한 후, 
     * 검색조건의 [법정동] 값으로 필터링 된 값을 리턴한다.
     * @param {*} url 
     * @param {*} lawdCd 
     * @param {*} dealYmd 
     * @param {*} dong 
     */
    getApiDataXml(url, lawdCd, dealYmd, dong) {
        // 법정동 별 거래 리스트 API call
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
                    filter(x=> x.response.header.resultCode === '00' && x.response.body.totalCount > 0 ),
                    map(x => x.response.body.items.item),
                    map(x=> common.toArray(x)),  //flatMap 하기전에 배열로 만들어주어야 함
                    // map(x => common.deleteField(x, ['년','지역코드'])),
                    flatMap(x => x),
                    // filter(x => x['법정동'] === dong),
                    toArray()
                );
    },
    /**
     * 실거래가 데이터는 월 단위로 데이터를 제공한다.
     * 따라서 조건에서 월을 '전체'로 선택할 경우,
     * API를 다중으로 요청하여 merge 한 stream을 리턴한다. 
     * @param {*} url 
     * @param {*} lawdCd 
     * @param {*} dealYmd 
     * @param {*} dong 
     */
    getMergeData(url, lawdCd, dealYmd, dong) {
        const year = dealYmd.substring(0,4);
        const curYear = new Date().getFullYear();
        let merge$;
        if( dealYmd.length < 6 ){   // 월 전체 선택했을 때
            
            // 현재 년도의 경우 현재 달까지, 이전년도의 경우 12월까지 데이터를 가져온다
            const month = (year == curYear) ? new Date().getMonth() + 1 : 12;
            let streamArray = [];
            for(let i=1; i<=month; i++){
                let ymd = year +common.addZero(i);
                const s$ = this.getApiDataXml(url, lawdCd, ymd, dong)
                streamArray.push(s$); 
            }
            merge$ = merge(streamArray)
                    .pipe(
                        flatMap(x => x),
                        toArray(),
                        map(x => _.sortBy(_.flatten(x), '월')), // 거래된 월 순으로 정렬
                        map(x => x.reverse())                   // 거래된 월의 역순으로 리턴
                    );
        }else{  // 월 선택 했을 때
            merge$ =  this.getApiDataXml(url, lawdCd, dealYmd, dong);
        }

        return merge$;
    },
    /**
     * 일반적인 Rest API를 통해 json 포멧의 데이터를 응답받는다.
     * @param {*} url 
     */
    getApiDataJson(url) {
        const apiJsonData = axios.get(url).then()
        return  fromPromise(apiJsonData)
                .pipe(
                    map(x => x.data),
                    flatMap(x=>x)
                );
    },
    /**
     * 시도 + 시군 + 법정동 + 지번으로 x, y 좌표 값을 얻는다
     *  - 다음 지도에 Marker 표시할 때 사용된다
     * @param {*} url 
     * @param {*} fieldNm 
     */
    getApiDataLocation(url, fieldNm) {
        // url = '/api/getAddress?query=상봉동 495'
        const apiJsonData = axios.get(url).then()
        return  fromPromise(apiJsonData)
                .pipe(
                    map(x => x.data),
                    filter(x => x.meta.total_count != 0),
                    map(x => x.documents),
                    flatMap(x=> common.setObjectTitleByFieldNm(x, fieldNm)),
                    // first()
                );
    },
    /**
     * 다음지도에 표시될 아이템 리스트들의 x,y 좌표값을 얻은 후,
     * merge 한 stream을 리턴한다.
     * @param {*} sido     검색조건의 시도
     * @param {*} sigun    검색조건의 시군
     * @param {*} itemList 다음지도에 표시될 아이템 리스트
     * @param {*} fieldNm  Marker에 표시될 타이틀(ex 아파트명, 빌라 명)
     */
    getMergeLocationData(sido, sigun, itemList, fieldNm) {
        const baseUrl = '/api/getAddress?query=';
        let url;
        let streamArray = [];
        for(let i=0, item; item=itemList[i]; i++) {
            url = baseUrl + sido + ' '+ sigun + ' ' + item['법정동'] + ' ' + item['지번']
            streamArray.push(this.getApiDataLocation(url, item[fieldNm]))
        }
        return  merge(streamArray)
                .pipe(
                    flatMap(x => x),
                    toArray(),
                );

    }
}