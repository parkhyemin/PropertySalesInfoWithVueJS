<template>
    <!--<li v-for="(m, index) in msg" :key="'m_'+index">
        <span v-for="(a, index) in m" :key="'a_'+index">{{a}} </span>
    </li>
     <li v-for="(d, index) in data" :key="'dm_'+index">
        <span >{{d}} </span>
    </li>-->
    <!--<button @click="sum(1,2)">1+2는?</button>-->
    <!--<b-tabs>
        <b-tab title="first" href="Apt" active>
            <br>I'm the first fading tab
        </b-tab>
        <b-tab title="second" href="Multi" >
            <br>I'm the second tab content
        </b-tab>
        <b-tab title="third">
            <br>I'm the third tab content
        </b-tab>
    </b-tabs>-->
    <!--<DaumMap />-->
    <b-container>
        <b-row v-for="(obj, index) in list" :key="'obj_'+index">
            <b-col v-if="obj['제목'] != undefined">
                <b-row class="bg-antiquewhite mt-3">
                    <b-col>{{obj['제목']}}</b-col>
                </b-row>
                <b-row class="bg-darkgray">
                    <b-col>거래금액</b-col>
                    <b-col>아파트</b-col>
                    <b-col>층</b-col>
                </b-row>
            </b-col>
            <b-col v-else>
                <b-row>
                    <b-col>{{obj['거래금액']}}</b-col>
                    <b-col>{{obj['아파트']}}</b-col>
                    <b-col>{{obj['층']}}</b-col>
                </b-row>
            </b-col>
            
        </b-row>
    </b-container>

   

</template>

<script>
import { Observable, from } from 'rxjs';
import { bufferCount, map, flatMap, pluck, first, toArray, filter, tap } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { merge } from 'rxjs/observable/merge'
import { range } from 'rxjs/observable/range'

import {_} from 'vue-underscore';
import {RxHttpRequest} from 'rx-http-request';
import xml from 'xml2json-light';
import DaumMap from '../common/DaumMap';

import axios from 'axios'
import apiService from '../service/ApiService.js'
import TestService from '../service/TestService.js'


export default {
    name: 'RxjsTest',
    components: { 
        DaumMap
    },
    data () {
        return {
            msg: [],
            data : {
                '57.3' : [
                    {'거래금액' : '3억', '아파트' : '덩부아파트', '층' : 1, '전용면적' : '57.3'},
                    {'거래금액' : '3억2천', '아파트' : '덩부아파트', '층' : 2, '전용면적' : '57.3'}
                ]
                ,
                '74.25' : [
                    {'거래금액' : '4억', '아파트' : '덩부아파트', '층' : 10, '전용면적' : '74.25'},
                    {'거래금액' : '4억2천', '아파트' : '덩부아파트', '층' : 11, '전용면적' : '74.25'}
                ]
                ,
                '84.96' : [
                    {'거래금액' : '5억', '아파트' : '덩부아파트', '층' : 20, '전용면적' : '84.96'},
                    {'거래금액' : '5억2천', '아파트' : '덩부아파트', '층' : 21, '전용면적' : '84.96'}
                ]
                
            },
            list : [],
            tab: 'Detach',
        }
    },
    mounted() {
        // 전용면적에 따라 group by 된 값
        let _list = [];
        from([this.data])
        .pipe(
            map(x => _.toArray(x)),
            flatMap(x=> x),
            tap(x => {
                let first = _.first(x);
                let titleObj = {'제목': first['아파트'] + ' ' + first['전용면적']}
                _list.push(titleObj)
                _.each(x, o => _list.push(o));
            })
        )
        .subscribe(x => {
           this.list = _list;
            console.log(_list);
        })

        //다중 request
        // const apiXmlData = axios.get(url, option)
        //                 .then((result) => xml.xml2json(result.data));
        // let promises = [];
        // let result = [];
        // promises.push(axios.get('/api/getRTMSDataSvcRHTrade?LAWD_CD=11110&DEAL_YMD=201512'));
        // promises.push(axios.get('/api/getRTMSDataSvcRHTrade?LAWD_CD=11110&DEAL_YMD=201612'));
        // promises.push(axios.get('/api/getRTMSDataSvcRHTrade?LAWD_CD=11110&DEAL_YMD=201712'));


        // const all = axios.all(promises)
        // fromPromise(all)
        // .subscribe(x => console.log(x))
        // apiService.getMergeData('/api/getRTMSDataSvcRHTrade', '11110', '2018', '논현동')
        // .subscribe(x => console.log(x))


        

        // .then(res => console.log(res));
        
        // range(1, 10)
        // .subscribe(x => console.log(x))

        // 주소로 좌표정보 가져오기 테스트
        // apiService.getApiDataLocation('/api/getAddress?query=서울특별시 중랑구 망우동 506-8','EG Seoul Leader')
        // .subscribe(res => console.log(res)); 

        // 다중 Observable 연결 테스트
        // const s1$ = apiService.getApiDataXml('/api/getRTMSDataSvcAptTrade?LAWD_CD=11110&DEAL_YMD=201511');
        // const s2$ = apiService.getApiDataXml('/api/getRTMSDataSvcAptTrade?LAWD_CD=11110&DEAL_YMD=201512');
        // console.log(s1$);
        // console.log(s2$);
        // s1$.subscribe(res => console.log(res));
        // s2$.subscribe(res => console.log(res));

        // const s3$ = merge(s1$, s2$);
        // s3$
        // .pipe(
        //     flatMap(x => x),
        //     toArray()
        // )
        // .subscribe(res => console.log(res));

        

        // Custom 컴포넌트 테스트
        // console.log(TestService);
        // let s$ = TestService.getApiData();
        // s$
        // .pipe(filter(x =>  x['법정동'] === '평창동' ))
        // .subscribe(res => {
        //     // this.tradeList.push(res);
        //     // this.$emit('callTradeApi', this.tradeList);
        //     console.log(res);
        // });
        
        
        // Proxy 테스트
        // this.$http.get('/api/sido')
        // .then((res) => console.log(res) );

        // this.$http.get('/api/sido')
        // .then((res) => console.log(res) );

        
        // const apiXmlData = this.$http.get('/api/getRTMSDataSvcRHTrade?LAWD_CD=11110&DEAL_YMD=201512')
        //                 .then((result) => xml2json.xml2json(result.data));
        // console.log(apiXmlData);


        // RxHttpRequest.get('http://localhost:18081//api/getLegaldongAptList?loadCode=1126010200&pageNo=1&numOfRows=5')
        // .pipe(map(resp => resp.body))
        // .subscribe(
        //     (data) => {
        //         console.log(data);
        //     },
        //     (err) => console.log(err)
        // )
        

        // 아파트 리스트
        /*let apiXmlData = this.$http.get('http://localhost:18081//api/getLegaldongAptList?loadCode=1126010200&pageNo=1&numOfRows=5')
                        .then((result) => xml.xmlDataToJSON(result.data).then() );
        fromPromise(apiXmlData)
        .pipe(flatMap(x => x.response.body))
        .pipe(pluck('items'))
        .pipe(flatMap(x => x ))
        .pipe(pluck('item'))
        .pipe(map(x => this.pluckByKeyArray(x, ['kaptCode','kaptName'])))
        .subscribe(res => this.data = res  )
        */

        // from(['Text1', 'Text2','Text3','Text4', 'Text5','Text6'])
        // // .pipe(bufferCount(3))
        // .pipe(filter(x =>  x === 'Text1'))
        // .subscribe(val =>
        //         this.msg.push(val)
        //     );
        
        /*let loadCode = '1168010300';
        let apiXmlData = this.$http.get('http://localhost:18081//api/getLegaldongAptList?loadCode='+loadCode+'&pageNo=1&numOfRows=50')
                        .then((result) => xml.xmlDataToJSON(result.data).then());
        fromPromise(apiXmlData)
        .pipe(flatMap(x => x.response.body))
        .pipe(pluck('items'))
        .pipe(flatMap(x => x ))
        .pipe(pluck('item'))
        .pipe(flatMap(x => this.pluckByKeyArray(x, ['kaptCode','kaptName'])))
        .pipe(bufferCount(3))
        .subscribe(res => console.log(res))
        */
        
    },
    methods : {
        
        // sum (a, b) {
        //     const result = a + b;
        //     return result
        // },
        // pluckByKeyArray(x, param) {
        //     _.each(x, (v) => 
        //         _.each(param, (p) => v[p] = _.first(v[p]) )
        //     )
        //    return x;
        // },
            // getAptListApiData() {
    //     // 법정동 아파트 리스트 API call
    //     this.aptList = [];
    //     const loadCode = this.s_dong.val;
    //     console.log('+++++ getAptListApiData loadCode : ' + loadCode);
    //     const apiXmlData = this.$http.get('/api/getLegaldongAptList?loadCode='+loadCode+'&pageNo=1&numOfRows=50')
    //                     .then((result) => xml.xml2json(result.data));
    //     fromPromise(apiXmlData)
    //     .pipe(map(x => x.response.body))
    //     .pipe(filter(x => x['totalCount'] > 0 ))
    //     .pipe(pluck('items'))
    //     .pipe(pluck('item'))
    //     .pipe(flatMap(x=> x))
    //     .pipe(bufferCount(3))
    //     .subscribe(res => {
    //         this.aptList.push(res);
    //         this.$emit('callAptListApi', this.aptList); 
    //     });
        
    // },
    }

}
</script>

<style scoped>
    table{width : 100%; border: 1px solid #444444; border-collapse:collapse;}
    td{border:1px solid black;cursor:pointer}
    td:hover{background-color: #ccc;}
    .bg-antiquewhite{background:antiquewhite;}
    .bg-darkgray{background : darkgray}
</style>