<template>
<div>
  <b-container fluid>
    <b-row class="mb-3"><h4>실거래가</h4></b-row>
    <b-row class="mb-3">
      <b-col><b-form-select v-model="s_year" :options="o_year" /></b-col>
      <b-col><b-form-select v-model="s_month" :options="o_month" /></b-col>
      <b-col><b-form-select v-model="s_sido" :options="o_sido" @change="setConditionSigungu($event)" ref="el_sido"/></b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col><b-form-select v-model="s_sigungu" :options="o_sigungu" @change="setConditionDong($event)" ref="el_sigungu"/></b-col>
      <b-col>
        <b-input-group>
            <b-form-select v-model="s_dong" :options="o_dong" ref="el_dong"/>
            <b-btn variant="primary" @click="callApi" >조회</b-btn>
        </b-input-group>
      </b-col>
    </b-row>
    <b-alert variant="danger"
             :show="showVaildationAlert">
      {{vailidationMsg}}
    </b-alert>
  </b-container>
</div>
</template>

<script>
import { Observable, from } from 'rxjs';
import { filter, bufferCount, map, flatMap, pluck, first } from 'rxjs/operators'
import { fromPromise } from 'rxjs/observable/fromPromise'
import xml from 'xml2json-light';
import {_} from 'vue-underscore';

export default {
  name: 'Condition',
  props: [''],
  data () {
    return {
        s_year : null,
        o_year: [],
        s_month : null,
        o_month: [],
        s_sido : null,
        o_sido : [],
        s_sigungu : null,
        o_sigungu : [],
        s_dong : null,
        o_dong : [],
        showVaildationAlert : false,
        vailidationMsg : '조회 조건을 확인하세요.',
        aptList : [],
        tradeList : []
    }
  },
  mounted() {
      this.initConditionDate();
      this.initConditionSido();
      this.initConditionSigungu();
      this.initConditionDong();
      this.$emit('callApi', false); // 아파트 목록, 아파트 거래내역 숨김

  },
  methods:{
    initConditionDate() {
        // set Year
        const year = new Date().getFullYear();
        from(this.generateArrayByCount(10))
        .pipe(map(x => this.generateOptionObj(year-x, year-x)))
        .subscribe(res => this.o_year.push(res))
        // this.s_year = year;
        this.s_year = {val : year, txt: year}

        // set month
        from(this.generateArrayByCount(12))
        .pipe(map(x => this.generateOptionObj(x+1, x+1)))
        .subscribe(res => this.o_month.push(res))
        // this.s_month = new Date().getMonth() + 1;
        const mon = new Date().getMonth() + 1;
        this.s_month = {val : mon, txt: mon}
    },
    generateArrayByCount(count) {
        let array = [];
        for(let i=0; i<count; i++)
            array.push(i);
        return array;
    },
    initConditionSido() {
        this.o_sido = [];
        this.o_sido.push(this.generateOptionObj('', '시/도'));
        this.s_sido = {val:'', txt:'시/도'};
        this.$http.get('/api/sido')
        .then(res => {
            //console.log(res.data);
            _.each(res.data, this.addConditionSido);
        })
        .catch(err => console.log(err)); 
    },
    initConditionSigungu () {
        // console.log(sidoCode);
        this.o_sigungu = [];
        this.o_sigungu.push(this.generateOptionObj('', '시/군/구'));
        this.s_sigungu = {val:'', txt:'시/군/구'};
    },
    setConditionSigungu(sidoCode) {
        this.initConditionSigungu();
        this.$http.get('/api/sigungu?sido='+sidoCode.val)
        .then(res => {
            // console.log(res.data);
            _.each(res.data, this.addConditionSigungu);
        })
    },
    initConditionDong () {
        this.o_dong = [];
        this.o_dong.push(this.generateOptionObj('', '읍/면/동'));
        this.s_dong = {val:'', txt:'읍/면/동'};
    },
    setConditionDong(sigunguCode){
        this.initConditionDong();
        this.$http.get('/api/dong?sigungu='+sigunguCode.val)
        .then(res => {
            // console.log(res.data);
            _.each(res.data, this.addConditionDong);
        })
    },
    generateOptionObj(val, text) {
        return {value:{val : val, txt: text}, text:text};
    },
    addConditionSido(obj) {
        this.o_sido.push(this.generateOptionObj(obj.code, obj.sido))
    },
    addConditionSigungu(obj) {
        this.o_sigungu.push(this.generateOptionObj(obj.code, obj.sigun))
    },
    addConditionDong(obj) {
        this.o_dong.push(this.generateOptionObj(obj.code, obj.dong))
    },
    vailidation() {
        let msg;
        let hasError = false;
        if(! this.s_sido.val){
            msg = '(시/도)를 선택하세요';
            hasError = true;
        }else if(! this.s_sigungu.val){
            msg = '(시/군/구)를 선택하세요';
            hasError = true;
        }else if(! this.s_dong.val){
            msg = '(읍/면/동)을 선택하세요';
            hasError = true;
        }

        this.vailidationMsg = msg;
        return hasError;
    },
    callApi () {
         // vailidation check
        this.showVaildationAlert = this.vailidation();
        this.$emit('callApi', !this.showVaildationAlert);

        this.aptList = [],
        this.tradeList = []

        if( !this.showVaildationAlert ){
            // this.getAptListApiData(); // 데이터 별로임.. 안쓰는게 날 듯
            this.getTradeAptListApiData();

        }
    },
    getAptListApiData() {
        // 법정동 아파트 리스트 API call
        this.aptList = [];
        const loadCode = this.s_dong.val;
        console.log('+++++ getAptListApiData loadCode : ' + loadCode);
        const apiXmlData = this.$http.get('/api/getLegaldongAptList?loadCode='+loadCode+'&pageNo=1&numOfRows=50')
                        .then((result) => xml.xml2json(result.data));
        fromPromise(apiXmlData)
        .pipe(map(x => x.response.body))
        .pipe(filter(x => x['totalCount'] > 0 ))
        .pipe(pluck('items'))
        .pipe(pluck('item'))
        .pipe(flatMap(x=> x))
        .pipe(bufferCount(3))
        .subscribe(res => {
            this.aptList.push(res);
            this.$emit('callAptListApi', this.aptList); 
        });
        
    },
    getTradeAptListApiData() {
        // 법정동 아파트 거래 리스트 API call
        const lawdCd = this.s_dong.val.substr(0, 5);
        const dealYmd = this.s_year.val + this.addZero(this.s_month.val);
        const apiXmlData = this.$http.get('/api/getRTMSDataSvcAptTrade?LAWD_CD='+lawdCd+'&DEAL_YMD='+dealYmd)
                        .then((result) => xml.xml2json(result.data));
        
        fromPromise(apiXmlData)
        .pipe(map(x => x.response.body))
        .pipe(filter(x => x['totalCount'] > 0 ))
        .pipe(pluck('items'))
        .pipe(pluck('item'))
        .pipe(map(x => this.deleteField(x, ['년','지번','지역코드'])))
        .pipe(flatMap(x=> x))
        .pipe(filter(x =>  x['법정동'] === this.s_dong.txt ))
        .subscribe(res => {
            this.tradeList.push(res);
            this.$emit('callTradeAptApi', this.tradeList);
        });

    },
    addZero(val){
        let temp = parseInt(val);
        let result = '' + temp;
        return result < 10 ? result = '0' + temp : result;
    },
    deleteField(x, del) {
        _.each(x, (v) => {
                _.each(del, (d) => delete v[d] )
            }
        )
        return x;
    }
     
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>