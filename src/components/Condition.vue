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
import xml from 'xml-to-json-promise';
import {_} from 'vue-underscore';

export default {
  name: 'Condition',
  props: [],
  data () {
    return {
        s_year : null,
        o_year: [],
        s_month : null,
        o_month: [],
        s_sido : '',
        o_sido : [],
        s_sigungu : '',
        o_sigungu : [],
        s_dong : '',
        o_dong : [],
        showVaildationAlert : false,
        vailidationMsg : '조회 조건을 확인하세요.',
        aptList : [],
        trandeList : []
    }
  },
  mounted() {
      this.initConditionDate();
      this.initConditionSido();
      this.initConditionSigungu();
      this.initConditionDong();
  },
  methods:{
    initConditionDate() {
        // set Year
        let year = new Date().getFullYear();
        for(var i=0; i<=10; i++){
            this.o_year.push( this.generateOptionObj(year-i, year-i));
        }
        this.s_year = year;

        // set month
        for(var i=0; i<12; i++){
            this.o_month.push( this.generateOptionObj(i+1, i+1));
        }
        this.s_month = new Date().getMonth() + 1;
    },
    initConditionSido() {
        this.o_sido = [];
        this.o_sido.push(this.generateOptionObj('', '시/도'));

        this.$http.get('http://localhost:18081/api/sido')
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
        this.s_sigungu = '';
    },
    setConditionSigungu(sidoCode) {
        this.initConditionSigungu();
        this.$http.get('http://localhost:18081/api/sigungu?sido='+sidoCode)
        .then(res => {
            // console.log(res.data);
            _.each(res.data, this.addConditionSigungu);
        })
    },
    initConditionDong () {
        this.o_dong = [];
        this.o_dong.push(this.generateOptionObj('', '읍/면/동'));
        this.s_dong = '';
    },
    setConditionDong(sigunguCode){
        this.initConditionDong();
        this.$http.get('http://localhost:18081/api/dong?sigungu='+sigunguCode)
        .then(res => {
            // console.log(res.data);
            _.each(res.data, this.addConditionDong);
        })
    },
    generateOptionObj(val, text) {
        return {value:val, text:text};
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
        if(! this.$refs.el_sido.value){
            msg = '(시/도)를 선택하세요';
            hasError = true;
        }else if(! this.$refs.el_sigungu.value){
            msg = '(시/군/구)를 선택하세요';
            hasError = true;
        }else if(! this.$refs.el_dong.value){
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

        if( !this.showVaildationAlert ){
            this.getAptListApiData();
            this.getTradeAptListApiData();

        }
    },
    getAptListApiData() {
        // 법정동 아파트 리스트 API call
        let loadCode = this.s_dong;
        console.log('+++++ loadCode : ' + loadCode);
        this.$http.get('http://localhost:18081//api/aptList?loadCode='+loadCode+'&pageNo=1&numOfRows=50')
        .then((result) => {
            xml.xmlDataToJSON(result.data)
            .then(json =>  {
                let aptList = json.response.body[0].items[0].item;
                let header = json.response.header[0];

                // 부모 창 리스트에 데이터 전송
                this.$emit('callAptListApi', aptList, header);
            })
        })
        .catch(err => console.log(err)); 
    },
    getTradeAptListApiData() {
        // 법정동 아파트 거래 리스트 API call
        let lawdCd = this.s_dong.substr(0, 5);
        let dealYmd = this.s_year + this.addZero(this.s_month);
        console.log('lawdCd:'+lawdCd)
        this.$http.get('http://localhost:18081/api/data?LAWD_CD='+lawdCd+'&DEAL_YMD='+dealYmd)
        .then((result) => {
            xml.xmlDataToJSON(result.data)
            .then(json =>  {
                let body = json.response.body[0];
                let header = json.response.header[0];
                this.totalCount = body.totalCount;
                //console.log(temp);
                _.map(body.items[0].item, this.deleteProperty);
                let tradeList = body.items[0].item;
                // 부모 창 리스트에 데이터 전송
                this.$emit('callTradeAptApi', tradeList, header);
            })
        })
        .catch(err => console.log(err)); 
    },
    deleteProperty(obj) {
      delete obj['지역코드'];
      delete obj['건축년도']; 
      // _.pick(obj, '지역코드','건축년도');
    },
    addZero(val){
        let temp = parseInt(val);
        let result = '' + temp;
        return result < 10 ? result = '0' + temp : result;
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>