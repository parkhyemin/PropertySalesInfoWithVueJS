<template>
    <div ref="el_list">
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
  watch : {
    tradeListData : function(val) {
      // 리스트 변경시 focus 맞춤
      this.$refs.el_list.setAttribute('tabindex',-1);
      this.$refs.el_list.focus();
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