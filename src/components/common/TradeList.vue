<template>
    <div>
        <b-table striped hover :items="tradeListData"></b-table>
    </div>    
</template>

<script>

export default {
  name: 'TradeList',
  props: ['tradeListData'],
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