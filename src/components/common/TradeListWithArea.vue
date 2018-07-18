<template>
  <div ref="el_list">
    <!--<b-table striped hover :items="tradeListData" :fields="tradeFields"></b-table>-->
    <b-container>
      <b-row v-for="(obj, index) in list" :key="'obj_'+index">
        <b-col v-if="obj['title'] != undefined">
          <b-row class="bg-green font-bold mt-3">
            <b-col>{{obj['title']}}</b-col>
          </b-row>
          <b-row class="bg-darkgray font-bold">
            <b-col>월</b-col>
            <b-col>계약기간</b-col>
            <b-col>거래금액</b-col>
            <b-col>층</b-col>
          </b-row>
        </b-col>
        <b-col v-else>
          <b-row class="bt-outset">
            <b-col>{{obj['월']}}</b-col>
            <b-col>{{obj['일']}}</b-col>
            <b-col>{{obj['거래금액']}}</b-col>
            <b-col>{{obj['층']}}</b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>    
</template>

<script>
import { from } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators'

import {_} from 'vue-underscore';

export default {
  name: 'TradeListWithArea',
  props: ['tradeListData', 'feildData'],
  components: { 
        
    },
  data () {
    return {
      list: [],
    }
  },
  mounted() {
    this.setFocus();
      this.displayGoupByData(this.tradeListData);
  },
  watch : {
    tradeListData : function(list) {
      this.setFocus();
      this.displayGoupByData(list);
    }
  },
  methods:{
    setFocus() {
      // 리스트 변경시 focus 맞춤
      this.$refs.el_list.setAttribute('tabindex',-1);
      this.$refs.el_list.focus();
    },
      displayGoupByData(source){
        // 전용면적에 따라 group by 된 값 (아파트, 연립다세대인 경우)
        let groupByArea = _.groupBy(source, '전용면적')
        let groupByList = [];
        from([groupByArea])
        .pipe(
          map(x => _.toArray(x)),
          flatMap(x=> x),
          tap(x => {
            let first = _.first(x);
            let titleObj ={
                            'title': first[this.feildData] + ' ' + first['전용면적'] + '㎡',
                            '전용면적':first['전용면적']
                          }
            groupByList.push(titleObj)
            _.each(x, o => groupByList.push(o));
          })
        )
      // ApiService.js의 getMergeData함수에서 '월'로 정렬 후, '전용면적'으로 추가적인 정렬 작업
      .subscribe(x => this.list = _.sortBy(groupByList, o => parseInt(o['전용면적']))) 
    },
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bg-green{background:#28a745;color:white;}
    .bg-darkgray{background : darkgray}
    .bt-outset{border-bottom:0.5px outset;}
    .font-bold{font-weight:bold;}
</style>