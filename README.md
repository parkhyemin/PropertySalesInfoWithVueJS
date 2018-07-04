목적 : 프론트 엔드프레임워크 Vue 습득(vue-cli를 통한 환경 Webpack),
       SpringBoot2 습득 (스프링프레임워크5 기반) 
       자바8 stream 등 기술 습득
       

1. 무엇을 만들것인가?
 부동산 실거래가 조회


2. 어떻게 구현할 것인가
 - 개발환경 : 개발언어, 개발툴 등
 - 서버 : SpringBoot2.0 (SpringFramework 5)
 - 프론트 : Vue
 - 클라이언트 Android 웹뷰까지 해보면 좋겠음

  - 실거래가는 공공API 사용
  - 시군구 코드는 로컬 DB(oracle)에 저장하여 Springboot2와 JPA를 사용하여 api로 제공
  - 화면은 Vue 프레임워크 사용

3. 형상관리 
 git 사용

===================================================================
작업진행 예정

1.법정동 코드로 아파트 실거래 API 있는지 확인
 - 현재 사용중인 API는 구단위임..

2.법정동 아파트 목록 리스트 작업
 - 한 row에 3개씩 리스트 되도록
 


===================================================================
작업진행 완료
ㅇ공공API 크로스도메인 문제 => 보안상 허용안된다고 함(https://www.data.go.kr/information/QNA_0000000000014129/qna.do)
 - URL호출 샘플
   (D:\workspace\ajaxproxy)
 - 크로스 도메인 허용 샘플
   (D:\workspace\STS_workspace\springbootByMaven\src\main\java\com\example\springboot\WelcomeController.java)

ㅇxml 형태의 응답을 Vue 클라이언트로 보낸 후, Parse하는 작업
ㅇrouter활용하여 메인화면에서 아파트매매 내역화면으로 이동하기
ㅇ법정동 데이터 정리 (시/도, 시/군/구, 읍/면/동)
ㅇSTS DevTools 라이브러리 반영(Hot reload 기능)
ㅇ조건 컴포넌트 분리(년, 월, 시/군 등)
ㅇ법정동 코드기준 아파트 목록 API 구현
ㅇ법정동 코드기준 아파트 실거래 목록 API 구현
ㅇ검색, 아파트목록, 거래목록 콤포넌트 분리 작업




===================================================================
#설치 모듈 목록

# http 통신용
npm install --save axios
index.js에 import

# API로 받은 xml 데이터 json으로 변경
npm install --save xml-to-json-promise
import xml from 'xml-to-json-promise';

# bootstrap 적용
참고 : http://hyper-cube.io/2017/07/16/vuejs-with-bootstrap/
 npm install --save bootstrap-vue
    (main.js)
    import BootstrapVue from 'bootstrap-vue';
    Vue.use(BootstrapVue);

    // using style-loader
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

#Underscore 적용
 참고 : https://www.npmjs.com/package/vue-underscore
  npm install vue-underscore
  (main.js)
  import underscore from 'vue-underscore';
  Vue.use(underscore);
 
  new Vue({
    ...App
  }).$mount('#app');

===================================================================

**참고사이트
1.시군구 코드
  다운로드 파일 중 KIKcd_H.20180122(말소코드포함) 사용
  http://www.mois.go.kr/frt/bbs/type001/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000052&nttId=61552

2.국토교통부 실거래가 정보 공공API
  https://www.data.go.kr/dataset/3050988/openapi.do

 개발기 인증키(활용기간2018-06-28 ~ 2020-06-28 ):
 AI9qcEoaK35mGSnhjGyfzEBVkfoS14LZFAn7BgBQbI5FwHzxJe1%2BNwPz0GcB%2F0JsMXpFLic28nDyRorftIW8yg%3D%3D

ex) 아파트 매매가 공공API
http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?ServiceKey=AI9qcEoaK35mGSnhjGyfzEBVkfoS14LZFAn7BgBQbI5FwHzxJe1%2BNwPz0GcB%2F0JsMXpFLic28nDyRorftIW8yg%3D%3D&LAWD_CD=11110&DEAL_YMD=201512

3.Vue 참고사이트
https://kr.vuejs.org/v2/guide/

4.Vuejs with Bootstrap (Bootstrap4)
 https://bootstrap-vue.js.org
 http://hyper-cube.io/2017/07/16/vuejs-with-bootstrap/

5.법정동코드로 공동주택 단지 목록정보 공공API
 https://www.data.go.kr/dataset/3039714/openapi.do?mypageFlag=Y (공동주택 단지 목록제공 서비스)

 ex)
 도로명
 http://apis.data.go.kr/1611000/AptListService/getRoadnameAptList?ServiceKey=AI9qcEoaK35mGSnhjGyfzEBVkfoS14LZFAn7BgBQbI5FwHzxJe1%2BNwPz0GcB%2F0JsMXpFLic28nDyRorftIW8yg%3D%3D&loadCode=263802006002&pageNo=1&numOfRows=10

 법정동
 http://apis.data.go.kr/1611000/AptListService/getLegaldongAptList?ServiceKey=AI9qcEoaK35mGSnhjGyfzEBVkfoS14LZFAn7BgBQbI5FwHzxJe1%2BNwPz0GcB%2F0JsMXpFLic28nDyRorftIW8yg%3D%3D&loadCode=1126010200&pageNo=1&numOfRows=10

