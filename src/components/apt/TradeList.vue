<template>
    <div>
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