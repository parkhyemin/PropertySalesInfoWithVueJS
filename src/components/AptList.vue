<template>
  <ul class="list-group">
      <li class="list-group-item" v-for="(apt, index) in aptListData" :key="'apt_'+index">
          <span>{{apt.kaptName[0]}}</span>
      </li>
  </ul>
<!--<b-container fluid>
  <b-row v-for="(aptArr, index) in aptListData" :key="'apt_'+index">
    <b-col v-for="(apt, index) in aptArr" :key="index">{{apt.kaptName}}</b-col>
  </b-row>
</b-container>-->
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
    //console.log('++++++++++++++++++++++++AptList mounted');
    // console.log(this._props.aptListData);
    // this._props.aptListData
    // .map(x => {
    //   x.kaptCode.push('xxxxxx')
    // })
    // .subscribe(x => console.log(x))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>