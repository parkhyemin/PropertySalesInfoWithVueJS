목적 : 프론트 엔드프레임워크 Vue 습득(vue-cli를 통한 환경 Webpack),
       스프링프레임워크5 습득 
       자바8 신규기술 습득(stream 등)
       

1. 무엇을 만들것인가?
 부동산 실거래가 조회


2. 어떻게 구현할 것인가
 - 개발환경 : 개발언어, 개발툴 등
 - 서버 : SpringBoot2.0 (SpringFrameworkd5)
 - 프론트 : Vue
 - 클라이언트 Android 웹뷰까지 해보면 좋겠음

  a. 실거래가는 공공API 사용
  b. 시군구 코드는 로컬 DB(oracle)에 저장하여 Springboot2와 JPA를 사용하여 api로 제공
  c. 화면은 Vue 프레임워크 사용

3. 형상관리 
 git 사용

===================================================================
작업진행 예정

1.router활용하여 메인화면에서 아파트매매 내역화면으로 이동하기

2.아파트매매 내역확인 화면에 bootstrap 적용(작업예정)
 # 아래 bootstrap 참고



===================================================================
작업진행 완료
1.공공API 크로스도메인 문제 => 보안상 허용안된다고 함(https://www.data.go.kr/information/QNA_0000000000014129/qna.do)
 - URL호출 샘플
   (D:\workspace\ajaxproxy)
 - 크로스 도메인 허용 샘플
   (D:\workspace\STS_workspace\springbootByMaven\src\main\java\com\example\springboot\WelcomeController.java)

2.xml 형태의 응답을 Vue 클라이언트로 보낸 후, Parse하는 작업 필요
my-chatbot 소스 참고 Footer.vue



===================================================================
#설치 모듈 목록

# http 통신용
npm install --save axios
index.js에 import

# API로 받은 xml 데이터 json으로 변경
npm install --save xml-to-json-promise
import xml from 'xml-to-json-promise';

# bootstrap 적용(작업진행중 2018.06.29)
참고 : http://hyper-cube.io/2017/07/16/vuejs-with-bootstrap/
 npm install --save bootstrap-vue
    (main.js)
    import BootstrapVue from 'bootstrap-vue';
    Vue.use(BootstrapVue);

    // using style-loader
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

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
 