목적 : 프론트 엔드프레임워크 Vue 습득(vue-cli를 통한 환경 Webpack),
       SpringBoot2 습득 (스프링프레임워크5 기반) 
       자바8 stream 등 기술 습득
       

1. 무엇을 만들것인가?
 부동산 실거래가 조회


2. 어떻게 구현할 것인가
 - 개발환경 : 개발언어, 개발툴 등
 - 서버 : SpringBoot2.0 (SpringFramework 5)
 - 프론트 : Vue2 with RxJS
 - 클라이언트 Android 웹뷰까지 해보면 좋겠음

  - 실거래가는 공공API 사용
  - 시군구 코드는 로컬 DB(oracle)에 저장하여 Springboot2와 JPA를 사용하여 api로 제공
  - 화면은 Vue 프레임워크 사용

3. 형상관리 
 git 사용

===================================================================
# 작업진행 예정

- 상단 네비게이터 분리
  메인목록 이동 기능 추가
  
- css 작업
- 아파트 목록에서 아파트 클릭 시, 지도 API 사용하여 마크 표시(보류)



===================================================================
# 작업진행 완료
- 공공API 크로스도메인 문제 => 보안상 허용안된다고 함
  (https://www.data.go.kr/information/QNA_0000000000014129/qna.do)
- xml 형태의 응답을 Vue 클라이언트로 보낸 후, Parse하는 작업
- router활용하여 메인화면에서 아파트매매 내역화면으로 이동하기
- 법정동 데이터 정리 (시/도, 시/군/구, 읍/면/동)
- STS DevTools 라이브러리 반영(Hot reload 기능)
- 조건 컴포넌트 분리(년, 월, 시/군 등)
- 법정동 코드기준 아파트 목록 API 구현
- 법정동 코드기준 아파트 실거래 목록 API 구현
- 검색, 아파트목록, 거래목록 콤포넌트 분리 작업
- vue-rx 설치 후, 소스 전체적으로 변경(Observable)
- 법정동 코드로 아파트 실거래 필터 걸도록 작업
  구단위로만 데이터 제공하고 있음
  https://www.data.go.kr/information/QNA_0000000000016947/qna.do
- Proxy 설정 : /config/index.js
- 연립/다세대, 단독주택 작업
- Promise -> Observable
- 공통함수, API 서비스 생성 및 분리




===================================================================
# 설치 모듈 목록

# http 통신용
npm install --save axios
index.js에 import

# API로 받은 xml 데이터 json으로 변경
npm install xml2json-light


# bootstrap 적용
참고 : http://hyper-cube.io/2017/07/16/vuejs-with-bootstrap/
 npm install --save bootstrap-vue
    (main.js)
    import BootstrapVue from 'bootstrap-vue';
    Vue.use(BootstrapVue);

    // using style-loader
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

# Underscore 적용
 참고 : https://www.npmjs.com/package/vue-underscore
  npm install vue-underscore
  (main.js)
  import underscore from 'vue-underscore';
  Vue.use(underscore);
 
  new Vue({
    ...App
  }).$mount('#app');

# RxJS(vue-rx) 적용
  참고 : https://github.com/vuejs/vue-rx
  npm install vue-rx rxjs --save
  (main.js)
  import Vue from 'vue';
  import VueRx from 'vue-rx';

  Vue.use(VueRx)

  추가 모듈 설치
  npm install --save rxjs-compat

===================================================================

# 참고사이트
- 시군구 코드
  다운로드 파일 중 KIKcd_H.20180122(말소코드포함) 사용
  http://www.mois.go.kr/frt/bbs/type001/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000052&nttId=61552

- 국토교통부 실거래가 정보 공공API
  https://www.data.go.kr/dataset/3050988/openapi.do

 개발기 인증키(활용기간2018-06-28 ~ 2020-06-28 ):
 AI9qcEoaK35mGSnhjGyfzEBVkfoS14LZFAn7BgBQbI5FwHzxJe1%2BNwPz0GcB%2F0JsMXpFLic28nDyRorftIW8yg%3D%3D

ex) 아파트 매매가 공공API
http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?ServiceKey=AI9qcEoaK35mGSnhjGyfzEBVkfoS14LZFAn7BgBQbI5FwHzxJe1%2BNwPz0GcB%2F0JsMXpFLic28nDyRorftIW8yg%3D%3D&LAWD_CD=11110&DEAL_YMD=201512

- Vue 참고사이트
https://kr.vuejs.org/v2/guide/

- Vuejs with Bootstrap (Bootstrap4)
 https://bootstrap-vue.js.org
 http://hyper-cube.io/2017/07/16/vuejs-with-bootstrap/

- 법정동코드로 공동주택 단지 목록정보 공공API
 https://www.data.go.kr/dataset/3039714/openapi.do?mypageFlag=Y (공동주택 단지 목록제공 서비스)

 ex)
 도로명
 http://apis.data.go.kr/1611000/AptListService/getRoadnameAptList?ServiceKey=AI9qcEoaK35mGSnhjGyfzEBVkfoS14LZFAn7BgBQbI5FwHzxJe1%2BNwPz0GcB%2F0JsMXpFLic28nDyRorftIW8yg%3D%3D&loadCode=263802006002&pageNo=1&numOfRows=10

 법정동
 http://apis.data.go.kr/1611000/AptListService/getLegaldongAptList?ServiceKey=AI9qcEoaK35mGSnhjGyfzEBVkfoS14LZFAn7BgBQbI5FwHzxJe1%2BNwPz0GcB%2F0JsMXpFLic28nDyRorftIW8yg%3D%3D&loadCode=1126010200&pageNo=1&numOfRows=10

