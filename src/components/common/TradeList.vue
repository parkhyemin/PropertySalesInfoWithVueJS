<template>
    <div ref="el_list">
        <b-table striped hover :items="tradeListData" :fields="tradeFields"></b-table>
    </div>    
</template>

<script>
import {_} from 'vue-underscore';

export default {
  name: 'TradeList',
  props: ['tradeListData', 'tradeFields'],
  components: { 
        
    },
  data () {
    return {
      data1: [],
      data1Title : '',
      data2: []
    }
  },
  mounted() {
    this.setFocus();
    // console.log(this.tradeListData)
  },
  watch : {
    tradeListData : function(list) {
      // 포커스
      this.setFocus();

      // 전용 면적별로 나눈다(아파트, 연립다세대인 경우)
      // console.log(list)
      // let sortByArea = _.groupBy(list, '전용면적')
      // let arrArea = _.keys(_.groupBy(list, '전용면적'))
      // console.log(sortByArea)
      // console.log(arrArea)
      // this.data1 = sortByArea['57.3']
      // debugger;
      // this.data1Title =this.data1[0]['아파트']+ +'57.3'
      
    }
  },
  methods:{
    setFocus() {
      // 리스트 변경시 focus 맞춤
      this.$refs.el_list.setAttribute('tabindex',-1);
      this.$refs.el_list.focus();
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>