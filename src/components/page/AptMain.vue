<template>
<div>
  <!-- 네비게이션 -->
  <Navigation :svcData="svcData"/>

  <!--검색영역-->
  <Condition :svcData="svcData" @callApi="callApi" @callTradeApi="callTradeApi" />

  <!-- 아파트 리스트-->
  <AptList v-if="isCallApi" :aptListData="aptListData" />

  <!-- 아파트 거래내역 리스트 -->
  <TradeList v-if="isCallApi" :tradeListData="tradeListData" />
</div>
</template>

<script>
import Navigation from '../common/Navigation';
import Condition from '../common/Condition';
import TradeList from '../common/TradeList';
import AptList from '../test/AptList';

export default {
  name: 'AptMain',
  components: { 
    Navigation, Condition, AptList, TradeList
  },
  data () {
    return {
      svcData       : 'Apt',
      isCallApi     : false, /* API 호출 전, 검색조건 validation */
      aptListData   : [],
      tradeListData : [],
      totalCount    : 0,
      emptyList     : [{'조회된 거래내역이 없습니다.':' '}]
    }
  },
  methods:{
    callApi(result){
      this.aptListData = [];
      // this.aptTradeListData = [];
      this.tradeListData = [{'':'조회된 내용이 없습니다'}];
      this.isCallApi = result;
    },
    // callAptListApi(aptList) {
    //   this.aptListData = aptList;
    // },
    callTradeApi(tradeList){
      this.tradeListData = tradeList;
    }
  },
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>