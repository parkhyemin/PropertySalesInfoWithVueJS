<template>
<div>
  <!-- 네비게이션 -->
  <Navigation :svcData="svcData"/>
  
  <!--검색영역-->
  <Condition :svcData="svcData" @callApi="callApi" @callTradeApi="callTradeApi" />

  <!-- 지역 정보-->
  <MapList v-if="isValidation" :showMap="showMap" :uniqListData="uniqListData" :feildData="feildData" @showFilterData="showFilterData" />

  <!-- 다세대/연립 거래내역 -->
  <TradeList v-if="isValidation && isSelectedItem" :tradeListData="tradeFilterData" />
</div>
</template>

<script>
import Navigation from '../common/Navigation';
import Condition from '../common/Condition';
import TradeList from '../common/TradeList';
import MapList from '../common/MapList';

import { from } from 'rxjs';
import { tap, bufferCount, filter } from 'rxjs/operators'

export default {
  name: 'DetachMain',
  components: { 
    Navigation, Condition, TradeList, MapList
  },
  data () {
    return {
      svcData         : 'Multi',
      feildData       : '연립다세대',/* API 필드명 */
      isValidation    : false,      /* 검색조건 validation */
      isSelectedItem  : false,      /* 연립/다세대 선택 여부 */
      showMap         : false,      /* 다음맵 표출 여부*/
      uniqListData    : [],         /* 연립/다세대 중복제거 데이터 */
      tradeListData   : [],         /* 연립/다세대 선택 전, 전체데이터 */
      tradeFilterData : [],         /* 연립/다세대 선택 후, 필터링된 데이터 */
    }
  },
  methods:{
    callApi(result){
      this.uniqListData = [];
      this.tradeListData = [];
      this.isValidation = result;
      this.showMap = false;
      this.isSelectedItem = false;
    },
    callTradeApi(tradeList, uniqList){
      // 거래된 아파트 정보(group by 아파트명)
      from(uniqList)
      .pipe(
        tap(() => {
            // 초기화
            this.uniqList = [];
            this.isSelectedItem = false;
          }
        ),
        bufferCount(3)  // 하나의 row에 3개의 아이템을 뿌려주기 위해
      )
      .subscribe(res => {
        this.uniqListData.push(res);
      });
      
      // 거래 내역 전체 리스트
      this.tradeListData = tradeList;
    },
    showFilterData(item) {
      this.isSelectedItem = true;
      let list = Object.assign([], this.tradeListData);
      this.tradeFilterData = [];
      from(list)
      .pipe(
        filter(x => x[this.feildData] === item[this.feildData] )
      )
      .subscribe(res => {
        this.showMap = true;
        this.isSelectedItem = true;
        this.tradeFilterData.push(res);
      })
    }
  },
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>