<template>
  <b-container fluid>
    <b-row v-for="(aptArr, index) in aptListData" :key="'apt_'+index">
      <b-col v-for="(apt, index) in aptArr" :key="index">{{apt.kaptName}}</b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: 'AptList',
  props: ['aptListData'],
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