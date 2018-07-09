<template>
<div>
  <b-container fluid>
    <b-row class="mb-3"><h4>실거래가-{{svcData.text}}</h4></b-row>
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
import {_} from 'vue-underscore';
import { filter } from 'rxjs/operators'
import common from '../service/Common.js'
import apiService from '../service/ApiService.js'

export default {
  name: 'Condition',
  props: ['svcData'],
  data () {
    return {
        s_year    : null,  o_year    : [],
        s_month   : null,  o_month   : [],
        s_sido    : null,  o_sido    : [],
        s_sigungu : null,  o_sigungu : [],
        s_dong    : null,  o_dong    : [],
        showVaildationAlert : false,
        vailidationMsg : '조회 조건을 확인하세요.',
        tradeList : []
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
        const date = common.initConditionDate(this.o_year, this.o_month);
        this.s_year = date.year;
        this.s_month = date.month;
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
        let result = common.vailidation(this.s_sido.val, this.s_sigungu.val, this.s_dong.val);
        this.showVaildationAlert = result.hasError;
        this.vailidationMsg = result.msg;
        this.$emit('callApi', !this.showVaildationAlert);

        this.tradeList = []
        if( !this.showVaildationAlert ){
            if(this.svcData.value === 'Apt'){
                this.getTradeAptListApiData();
            }else if(this.svcData.value === 'Multi'){
                this.getTradeMultiListApiData();
            }else if(this.svcData.value === 'Detach'){
                this.getTradeDetachListApiData();
            }
        }
    },
    getTradeAptListApiData() {
        // 법정동 아파트 거래 리스트 API call
        const lawdCd = this.s_dong.val.substr(0, 5);
        const dealYmd = this.s_year.val + common.addZero(this.s_month.val);
        apiService.getApiDataXml('/api/getRTMSDataSvcAptTrade?LAWD_CD='+lawdCd+'&DEAL_YMD='+dealYmd) 
        .pipe(filter(x =>  x['법정동'] === this.s_dong.txt ))
        .subscribe(res => {
            this.tradeList.push(res);
            this.$emit('callTradeApi', this.tradeList);
        });

    },
    getTradeMultiListApiData() {
        // 법정동 연립/다세대 거래 리스트 API call
        const lawdCd = this.s_dong.val.substr(0, 5);
        const dealYmd = this.s_year.val + common.addZero(this.s_month.val);
        
        apiService.getApiDataXml('/api/getRTMSDataSvcRHTrade?LAWD_CD='+lawdCd+'&DEAL_YMD='+dealYmd) 
        .pipe(filter(x =>  x['법정동'] === this.s_dong.txt ))
        .subscribe(res => {
            this.tradeList.push(res);
            this.$emit('callTradeApi', this.tradeList);
        });
    }, 
    getTradeDetachListApiData () {
        // 법정동 단독주택 거래 리스트 API call
        const lawdCd = this.s_dong.val.substr(0, 5);
        const dealYmd = this.s_year.val + common.addZero(this.s_month.val);
        
        apiService.getApiDataXml('/api/getRTMSDataSvcSHTrade?LAWD_CD='+lawdCd+'&DEAL_YMD='+dealYmd) 
        .pipe(filter(x =>  x['법정동'] === this.s_dong.txt ))
        .subscribe(res => {
            this.tradeList.push(res);
            this.$emit('callTradeApi', this.tradeList);
        });
    },

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>