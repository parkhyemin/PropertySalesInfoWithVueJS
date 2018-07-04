<template>
    <div>
        <!--<h2>총 카운트 <b-badge>{{totalCount}}</b-badge></h2>
        <b-btn href="/" variant="info" class="m-1">
        메인
        </b-btn>-->
        <b-table striped hover :items="aptTradeListData"></b-table>
    </div>    
</template>

<script>

export default {
  name: 'TradeList',
  props: ['aptTradeListData'],
  components: { 
        
    },
  data () {
    return {
      data: []
    }
  },
  methods:{
    
  },
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>