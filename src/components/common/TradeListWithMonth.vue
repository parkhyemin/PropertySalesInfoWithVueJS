<template>
  <div ref="el_list">
    <b-container>
      <b-row v-for="(obj, index) in list" :key="'obj_'+index">
        <b-col v-if="obj['title'] != undefined">
          <b-row class="bg-green font-bold mt-3">
            <b-col>{{obj['title']}}</b-col>
          </b-row>
          <b-row class="bg-darkgray font-bold">
            <b-col>거래금액</b-col>
            <b-col>연면적</b-col>
            <b-col>건축년도</b-col>
          </b-row>
          <b-row class="bg-darkgray font-bold">
            <b-col>계약일</b-col>
            <b-col>대지면적</b-col>
            <b-col>주택유형</b-col>
          </b-row>
        </b-col>
        <b-col v-else>
          <b-row>
            <b-col>{{obj['거래금액']}}</b-col>
            <b-col>{{obj['연면적']}}</b-col>
            <b-col>{{obj['건축년도']}}</b-col>
          </b-row>
          <b-row class="bt-outset">
            <b-col>{{obj['일']}}</b-col>
            <b-col>{{obj['대지면적']}}</b-col>
            <b-col>{{obj['주택유형']}}</b-col>
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
  name: 'TradeListWithMonth',
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

        // 거래 '월' 에 따라 group by 된 값 (단독/다가구 경우)
        const groupByMonth = _.groupBy(source, '월');
        let groupByList = [];
        
        from([groupByMonth])
        .pipe(
            map(x => _.toArray(x)),
            flatMap(x=> x),
            tap(x => {
                let first = _.first(x);
                let titleObj = {
                                    'title': first['년'] + '년 ' + first['월']+ '월',
                                    '월' : first['월']
                                }
                groupByList.push(titleObj)
                _.each(x, o => groupByList.push(o));
            })
        )
        .subscribe(x => {
           this.list = _.sortBy(groupByList, o =>  parseInt(o['월']) * -1 )
        })

    },
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bg-green{background:#28a745;color:white;}
    .bg-darkgray{background : darkgray}
    .bt-outset{border-bottom:0.5px outset;}
    .bt-dashed{border-bottom:0.5px dashed;}
    .font-bold{font-weight:bold;}
</style>