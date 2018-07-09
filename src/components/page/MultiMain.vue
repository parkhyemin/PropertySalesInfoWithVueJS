<template>
<div>
  <!--검색영역-->
  <Condition :svcData="svcData" @callApi="callApi" @callTradeApi="callTradeApi" />

  <!-- 다세대/연립 거래내역 리스트 -->
  <TradeList v-if="isCallApi" :tradeListData="tradeListData" />
</div>
</template>

<script>
import Condition from '../common/Condition';
import TradeList from '../common/TradeList';

export default {
  name: 'DetachMain',
  components: { 
        Condition, TradeList
    },
  data () {
    return {
      svcData: {value:'Multi', text:'연립/다세대'},
      isCallApi : false, /* API 호출 전, 검색조건 validation */
      tradeListData : []
    }
  },
  methods:{
    callApi(result){
      this.tradeListData = [{'':'조회된 내용이 없습니다'}];
      this.isCallApi = result;
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