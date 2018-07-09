<template>
  <ul>
    <li v-for="(m, index) in msg" :key="'m_'+index">
        <span v-for="(a, index) in m" :key="'a_'+index">{{a}} </span>
    </li>
     <li v-for="(d, index) in data" :key="'dm_'+index">
        <span >{{d}} </span>
    </li>
  </ul>

 
   

</template>

<script>
import { Observable, from } from 'rxjs';
import { bufferCount, map, flatMap, pluck, first, filter } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'
import {_} from 'vue-underscore';
import {RxHttpRequest} from 'rx-http-request';
import xml2json from 'xml2json-light';


export default {
    name: 'RxjsTest',
    data () {
        return {
            msg: [],
            data : []
        }
    },
    mounted() {
        
        // Proxy 테스트
        // this.$http.get('/api/sido')
        // .then((res) => console.log(res) );

        // this.$http.get('/api/sido')
        // .then((res) => console.log(res) );

        
        const apiXmlData = this.$http.get('/api/getRTMSDataSvcRHTrade?LAWD_CD=11110&DEAL_YMD=201512')
                        .then((result) => xml2json.xml2json(result.data));
        console.log(apiXmlData);


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
        pluckByKeyArray(x, param) {
            _.each(x, (v) => 
                _.each(param, (p) => v[p] = _.first(v[p]) )
            )
           return x;
        },
    }

}
</script>