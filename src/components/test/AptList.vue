<template>
  <b-container fluid>
    <b-row v-for="(data, index) in uniqListData" :key="'o_'+index">
      <b-col>{{data}}</b-col>
      <!--<b-col v-for="(apt, index) in aptArr" :key="index">{{apt.kaptName}}</b-col>-->
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: 'AptList',
  props: ['uniqListData'],
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