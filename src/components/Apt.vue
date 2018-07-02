<template>
<div>
  <h2 v-if="resultCode != '00' ">{{resultCode}}</h2>
  <h2 v-if="resultCode != '00' ">{{resultMsg}}</h2>
  <h2>총 카운트 <b-badge>{{totalCount}}</b-badge></h2>
  <b-btn href="/" variant="info" class="m-1">
      메인
    </b-btn>
  <b-list-group v-if="resultCode == '00' ">
    <b-list-group-item v-for="item in data" :key="item.id">{{item}}</b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
import xml from 'xml-to-json-promise';
export default {
  name: 'Apt',
  data () {
    return {
      data: [],
      resultCode : '',
      resultMsg : '',
      totalCount : 0
    }
  },
  methods:{
    
  },
  mounted() {
    let lawdCd = '11110';
    let dealYmd = '201806';
     this.$http.get('http://localhost:18081/api/data?lawdCd='+lawdCd+'&dealYmd='+dealYmd)
     .then((result) => {
        // console.log(result.data);
        xml.xmlDataToJSON(result.data)
        .then(json =>  {
          let body = json.response.body[0];
          let header = json.response.header[0];
          console.log(body);
          console.log(header);
          this.resultCode = header.resultCode;
          this.resultMsg = header.resultMsg;
          this.totalCount = body.totalCount;
          this.data = body.items[0].item;
          // this.data = json;
          // console.log(json);
        })
      })
      .catch(err => console.log(err));   
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>