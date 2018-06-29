<template>
<div>
  <h2 v-if="resultCode != '00' ">{{resultCode}}</h2>
  <h2 v-if="resultCode != '00' ">{{resultMsg}}</h2>
  <h2>총 카운트 : {{totalCount}}</h2>
  <ul v-if="resultCode == '00' ">
    <li v-for="item in data">{{item}}</li>
  </ul>
</div>
</template>

<script>
import xml from 'xml-to-json-promise';

export default {
  name: 'Main',
  data () {
    return {
      data: [],
      resultCode : '',
      resultMsg : '',
      totalCount : 0
    }
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
