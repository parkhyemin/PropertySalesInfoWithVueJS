<template>
<div>
  <!-- 네비게이션 -->
  <Navigation :svcData="svcData"/>
  
  <!--검색영역-->
  <Condition :svcData="svcData" @callApi="callApi" @callTradeApi="callTradeApi" />

  <!-- 단독/다가구 거래내역 리스트 (group by 월) -->
  <TradeListWithMonth v-if="isValidation" :tradeListData="tradeListData" />
</div>
</template>

<script>
import Navigation from '../common/Navigation';
import Condition from '../common/Condition';
import TradeListWithMonth from '../common/TradeListWithMonth';

export default {
  name: 'DetachMain',
  components: { 
    Navigation, Condition, TradeListWithMonth
  },
  data () {
    return {
      svcData: 'Detach',
      isValidation : false, /* 검색조건 validation */
      tradeListData : []
    }
  },
  methods:{
    callApi(result){
      this.tradeListData = [];
      this.isValidation = result;
    },
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