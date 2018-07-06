<template>
  <!--<ul class="list-group">
      <li class="list-group-item" v-for="(arr, index) in aptListData" :key="'arr_'+index">
          <span v-for="(apt, index) in arr" :key="'apt_'+index">{{apt.kaptName}}</span>
      </li>
  </ul>-->
  <b-container fluid>
    <b-row v-for="(aptArr, index) in aptListData" :key="'apt_'+index">
      <b-col v-for="(apt, index) in aptArr" :key="index">{{apt.kaptName}}</b-col>
    </b-row>
  </b-container>
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
    console.log('++++++++++++++++++++++++AptList mounted');
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