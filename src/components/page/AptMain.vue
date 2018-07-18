<template>
<div>
  <!-- 네비게이션 -->
  <Navigation :svcData="svcData"/>

  <!--검색영역-->
  <Condition :svcData="svcData" :feildData="feildData" @callApi="callApi" @callTradeApi="callTradeApi" @callKakaoApi="callKakaoApi"/>

  <!-- 지역 정보-->
  <AddressList v-if="isValidation" :addressData="addressData" :feildData="feildData" :itemNm="itemNm" @showFilterData="showFilterData" />

  <!-- 다음 맵 -->
  <DaumMap v-if="showMap" :mapCenter="mapCenter" :mapMarkerList="mapMarkerList" :feildData="feildData" @showFilterData="showFilterData"/>

  <!-- 거래내역 (group by 전용면적) -->
  <TradeListWithArea v-if="isValidation && isSelectedItem" :tradeListData="tradeFilterData" :feildData="feildData"/>
</div>
</template>

<script>
import Navigation from '../common/Navigation';
import Condition from '../common/Condition';
import TradeListWithArea from '../common/TradeListWithArea';
import AddressList from '../common/AddressList';
import DaumMap from '../common/DaumMap';

import { from } from 'rxjs';
import { tap, bufferCount, filter } from 'rxjs/operators'

import {_} from 'vue-underscore';

export default {
  name: 'AptMain',
  components: { 
    Navigation, Condition, AddressList, DaumMap, TradeListWithArea
  },
  data () {
    return {
      svcData         : 'Apt',
      feildData       : '아파트',/* API 필드명 */
      isValidation    : false,  /* 검색조건 validation */
      isSelectedItem  : false,  /* 아파트 선택 여부 */
      itemNm          : '',     /* 선택된 아파트 명 */
      showMap         : false,  /* 다음맵 표출 여부*/
      addressData     : [],     /* 기간내에 거래된 아파트 목록 */
      tradeListData   : [],     /* 아파트 선택 전, 전체데이터 */
      tradeFilterData : [],     /* 아파트 선택 후, 필터링된 데이터 */    
      curDong         : {},     /* 검색조건에서 선택된 동 정보 */
      mapCenter       : {},     /* 다음맵 초기 경도 정보 */
      mapMarkerList   : []      /* 다음맵 거래된 아파트 마커 정보 */
    }
  },
  methods:{
    callApi(result){
      this.addressData = [];
      this.tradeListData = [];
      this.isValidation = result;
      this.showMap = false;
      this.isSelectedItem = false;
    },
    callTradeApi(tradeList, uniqList){
      // 거래된 아파트 정보(group by 아파트명)
      from(_.sortBy(uniqList, this.feildData))
      .pipe(
        tap(() => {
            // 초기화
            this.uniqList = [];
          }
        ),
        bufferCount(3)  // 하나의 row에 3개의 아이템을 뿌려주기 위해
      )
      .subscribe(res => {
        this.addressData.push(res);
      });
      
      // 거래 내역 전체 리스트
      this.tradeListData = tradeList;
    },
    showFilterData(itemNm) {
      this.isSelectedItem = true;
      let list = Object.assign([], this.tradeListData);
      this.tradeFilterData = [];
      from(list)
      .pipe(
        filter(x => x[this.feildData] === itemNm )
      )
      .subscribe(res => {
        this.isSelectedItem = true;
        this.itemNm = itemNm;
        this.tradeFilterData.push(res);
      })
    },
    callKakaoApi(addressList) {
      if( addressList.length == 0 )
        return;

      this.showMap = true;
      let centerObj = addressList[0];
      this.mapCenter = {lat:centerObj.y, lng:centerObj.x}
      this.mapMarkerList = addressList;
    }
  },
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>