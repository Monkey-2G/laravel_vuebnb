require('./bootstrap');

import Vue from 'vue';
import sample from './sample';

const app = new Vue({
    /*  
    el : '#app' 을 설정했다는 것은, Vue 문법이 마운트 된 (허용하는) 범위를 이야기한다.
    즉, id가 app인 HTML tag 안에서만 사용 및 컨트롤 가능한 문법이 바로 var app이다.
    */

   el : '#app',            
   /*
   data : {
       title : 'My apartment',
       address : '12 Nt Street, My City, My Country',
       about : 'This is a description of my apartment.'
   }
   */

   /*
   위 주석 처리된 data는  직접 넣을 단어를 사용했지만, 
   아래 사용된 data는 index page에서 선언한 sample/data.js 파일 안에 있는
   var sample에 선언된 데이터들을 가져온 것이다.
   하지만 이렇게 여러 스크립트 파일로 분할된 전역변수를 사용하는 것은 효율적이지 못하다.
   */

   data : {
       title : sample.title,
       address : sample.address,
       about : sample.about,

       /*
        index.html page에서 v-bind:style="headerImageStyle" 로 지정했다.
       Vue로 연결된 style은 headerImageStyle에서 지정한다 라고 해석할 수 있다.
       headerImageStyle에서 배경 이미지를 url 경로에 있는 것으로 style을 지정했기 때문에, url 경로의 image가 나온다.
       */
       headerImageStyle : {
           'background-image' : 'url(sample/header.jpg)'
       },

       /* 
       index page에서 선언한 sample.data.js 파일 안에 있는 var sample에 선언된 데이터 중
       amenities 배열의 title이라는 key의 value값을 index page에서 v-for를 하면서 반복적으로 렌더링을 한다.
       마찬가지로 amenities 배열의 icon이라는 key의 value값을 <i> 태그안에서 class에 v-bind를 시켜서 반복적으로 넣어준다.

       index.html에 v-for부분에 amenity in amenities라고 작성된 부분이 있다.
       amenities라는 실제 배열은 아래에 sample.amenities로 선언된 amenities가 존재한다.
       amenity는 key값의 이름을 지정해준 것이다. 그래서 해당 key값의 value를 사용하려고 {{ amenity.title }}과 amenity.icon을 사용한 것이다.
       title과 icon은 amenities 배열 안에 있는 key 값들이다.
       */
       amenities : sample.amenities,
       prices : sample.prices,

       /*
       index.html에서 v-bind:class="{contracted:contracted}"로 작성을 했다.
       = Vue로 연결된 것들 중에서 contracted(뒤) 로 선언된 것이 ture일 때, class를 contracted(앞)로 bind한다. false면 bind 하지 않음.
       v-if, v-on:click에서 contracted가 요구하는 값은 모두 Vue에 작성된 contracted = true의 값이다.   
       */

       contracted : true,
       modalOpen : false
   },

   /*
   모달 창이 열려있고, ESC를 눌렀을 때, modalOpen을 false 값으로 바꿔서 모달창을 종료시킨다.
   false로 바뀌게 되면, #modal의 vind된 class로 지정되었는 show가 삭제된다.
   */
   methods: {
       escapeKeyListener: function(evt) {
         if (evt.keyCode === 27 && this.modalOpen) {
           this.modalOpen = false;
         }
       }
     },

   /*
   watch 문법은 특정 대상을 보고 있는 감시자 역할이다. 아래 문법을 확인하면
   modalOpen 값을 주시하고 있다가 변경될 경우, 아래 조건을 실행하는 것이다.
   */
   watch : {
       modalOpen : function () {
           var className = 'modal-open';
           if(this.modalOpen){
               document.body.classList.add(className);
           }
           else{
               document.body.classList.remove(className);
           }
       }
   },

   // 라이프 사이클에서 created 부분에 해당할 때 생성이 된다.
   created: function() {
       document.addEventListener('keyup', this.escapeKeyListener);
   },

   // 메모리 낭비 방지를 위해서, 제거될 때, 이벤트 리스너도 제거한다.
   destroyed : function() {
       document.removeEventListener('keyup', this.escapeKeyListener);
   }
});
