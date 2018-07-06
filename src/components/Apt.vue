<template>
<div>
  <!--검색영역-->
  <Condition @callApi="callApi" @callAptListApi="callAptListApi" @callTradeAptApi="callTradeAptApi" />

  <!-- 아파트 리스트-->
  <AptList v-if="isCallApi" :aptListData="aptListData" />

  <!-- 아파트 거래내역 리스트 -->
  <TradeList v-if="isCallApi" :aptTradeListData="aptTradeListData" />
</div>
</template>

<script>
import xml from 'xml-to-json-promise';
import {_} from 'vue-underscore';
import Condition from './Condition';
import AptList from './AptList';
import TradeList from './TradeList';

export default {
  name: 'Apt',
  components: { 
        Condition, AptList, TradeList
    },
  data () {
    return {
      data: [],
      isCallApi : false, /* API 호출 전, 검색조건 validation */
      aptListData : [],
      aptTradeListData : [],
      totalCount : 0,
      emptyList:[{'조회된 거래내역이 없습니다.':' '}]
    }
  },
  methods:{
    callApi(result){
      // console.log('+++++++++++callApi result:'+result)
      this.aptListData = [];
      this.aptTradeListData = [];
      this.isCallApi = result;
    },
    callAptListApi(aptList) {
      // console.log('+++++++++++callAptListApi aptList:');
      // console.log(aptList);
      // console.log(aptList);
      // console.log(header);
      this.aptListData = aptList;
    },
    callTradeAptApi(tradeList, header){
      // console.log('+++++++++++callTradeAptApi aptList:');
      // console.log(tradeList);
      this.aptTradeListData = tradeList;
    }
  },
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>