<template>
<div>
  <b-container fluid class="bg-aliceblue">
    <!--<b-row class="ml-1"><p>실거래가</p></b-row>-->
    <b-row class="mb-3">
      <b-col class="mt-2"><b-form-select v-model="s_year" :options="o_year" /></b-col>
      <b-col class="mt-2"><b-form-select v-model="s_month" :options="o_month" /></b-col>
      <b-col class="mt-2" cols="6"><b-form-select v-model="s_sido" :options="o_sido" @change="setConditionSigungu($event)"/></b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col class="mb-3"><b-form-select v-model="s_sigungu" :options="o_sigungu" @change="setConditionDong($event)"/></b-col>
      <b-col class="mb-3">
        <b-input-group>
            <b-form-select v-model="s_dong" :options="o_dong" ref="el_dong" class="mr-2"/>
            <b-btn variant="primary" @click="callApi" >조회</b-btn>
        </b-input-group>
      </b-col>
    </b-row>
    <b-alert variant="danger" :show="showAlert">{{errorMsg}}</b-alert>
  </b-container>
</div>
</template>

<script>
import {_} from 'vue-underscore';
import { filter, flatMap, tap, map, first } from 'rxjs/operators'
import common from '../service/Common.js'
import apiService from '../service/ApiService.js'

export default {
  name: 'Condition',
  props: ['svcData','feildData'],
  data () {
    return {
        s_year    : null,  o_year    : [],
        s_month   : null,  o_month   : [],
        s_sido    : null,  o_sido    : [],
        s_sigungu : null,  o_sigungu : [],
        s_dong    : null,  o_dong    : [],
        showAlert : false,
        errorMsg  : '조회 조건을 확인하세요.',
        tradeList : [],
        TEMPLIST : []
    }
  },
  mounted() {
      this.initConditionDate();
      this.initConditionSido();
      this.initConditionSigungu();
      this.initConditionDong();
      this.$emit('callApi', false); // 거래내역 초기화

  },
  methods:{
    initConditionDate() {
        const {year, month} = common.initConditionDate(this.o_year, this.o_month);
        this.s_year = year;
        this.s_month = month;
    },
    initConditionSido() {
        const obj = common.generateOptionObj('', '시/도');
        this.o_sido = [obj];
        this.s_sido = obj.value;
        apiService.getApiDataJson('/api/sido')
        .subscribe(res => this.addConditionSido(res));

    },
    initConditionSigungu () {
        const obj = common.generateOptionObj('', '시/군/구');
        this.o_sigungu = [obj];
        this.s_sigungu = obj.value;
    },
    setConditionSigungu(sidoCode) {
        this.initConditionSigungu();
        apiService.getApiDataJson('/api/sigungu?sido='+sidoCode.val)
        .subscribe(res => this.addConditionSigungu(res));
    },
    initConditionDong () {
        const obj = common.generateOptionObj('', '읍/면/동');
        this.o_dong = [obj];
        this.s_dong = obj.value;
    },
    setConditionDong(sigunguCode){
        this.initConditionDong();
        apiService.getApiDataJson('/api/dong?sigungu='+sigunguCode.val)
        .subscribe(res => this.addConditionDong(res));
    },
    addConditionSido(obj) {
        this.o_sido.push(common.generateOptionObj(obj.code, obj.sido))
    },
    addConditionSigungu(obj) {
        this.o_sigungu.push(common.generateOptionObj(obj.code, obj.sigun))
    },
    addConditionDong(obj) {
        this.o_dong.push(common.generateOptionObj(obj.code, obj.dong))
    },
    callApi () {
         // vailidation check
        let {msg, hasError} = common.vailidation(this.s_sido.val, this.s_sigungu.val, this.s_dong.val);
        this.showAlert = hasError;
        this.errorMsg  = msg;
        this.$emit('callApi', !this.showAlert);

        this.tradeList = []
        if( !this.showAlert ){
            if(this.svcData === 'Apt'){
                this.getTradeAptListApiData();
            }else if(this.svcData === 'Multi'){
                this.getTradeMultiListApiData();
            }else if(this.svcData === 'Detach'){
                this.getTradeDetachListApiData();
            }
        }
    },
    getTradeAptListApiData() {
        // 법정동 아파트 거래 리스트 API call
        const { LAWD_CD, DEAL_YMD} = this.getSelectedCondition();
        apiService.getMergeData('/api/getRTMSDataSvcAptTrade', LAWD_CD, DEAL_YMD, this.s_dong.txt)
        .pipe(
            map(x=> common.filterByFielNm(x, '법정동', this.s_dong.txt)),
            tap(val => this.uniqList = common.uniqTradeList(val, this.feildData)),
            tap(() => this.callKakaoAddressApi('아파트'))
        )
        .subscribe(res => {
            this.tradeList= res;
            this.$emit('callTradeApi', this.tradeList, this.uniqList);
        });

    },
    getTradeMultiListApiData() {
        // 법정동 연립/다세대 거래 리스트 API call
        const { LAWD_CD, DEAL_YMD} = this.getSelectedCondition();
        apiService.getMergeData('/api/getRTMSDataSvcRHTrade', LAWD_CD, DEAL_YMD, this.s_dong.txt) 
        .pipe(
            map(x=> common.filterByFielNm(x, '법정동', this.s_dong.txt)),
            tap(val => this.uniqList = common.uniqTradeList(val, this.feildData)),
            tap(() => this.callKakaoAddressApi('연립다세대'))
        )
        .subscribe(res => {
            this.tradeList = res;
            this.$emit('callTradeApi', this.tradeList, this.uniqList);
        });
        
    }, 
    getTradeDetachListApiData () {
        // 법정동 단독주택 거래 리스트 API call
        const { LAWD_CD, DEAL_YMD} = this.getSelectedCondition();
        apiService.getMergeData('/api/getRTMSDataSvcSHTrade', LAWD_CD, DEAL_YMD, this.s_dong.txt) 
        .pipe(
            map(x=> common.filterByFielNm(x, '법정동', this.s_dong.txt)),
            tap(val => this.uniqList = common.uniqTradeList(val, this.feildData)),            
        )
        .subscribe(res => {
            this.tradeList = res;
            this.$emit('callTradeApi', this.tradeList, this.uniqList);
        });
    },
    callKakaoAddressApi(fieldNm) {
        // 아파트, 연립/다세대의 x, y좌표를 얻는다 (다음지도 Marker 표시용)
        apiService.getMergeLocationData(this.s_sido.txt, this.s_sigungu.txt, this.uniqList, fieldNm)
        .subscribe(res => {
            this.$emit('callKakaoApi', res)
        });
        
    }, 
    getSelectedCondition() {
        const lawdCd = this.s_dong.val.substr(0, 5);
        const dealYmd = this.s_year.val + common.addZero(this.s_month.val);
        return {LAWD_CD : lawdCd, DEAL_YMD : dealYmd}
    }
    
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    select{font-size:13px; height:35px!important;}
    .col{padding-left:5px;padding-right:5px;}
    button{height:35px;}
    .bg-aliceblue{background : aliceblue; }
</style>