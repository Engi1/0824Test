//패키지 생성
var ajax = {}; //객체로 생성

ajax.xhr = {}; //XHR 객체

//XHR요청을 객체화
ajax.xhr.Request = function(url, params, callback, method) { //생성자
   this.url = url;   //생성자의 property 정의
   this.params = params;
   this.callback = callback;
   this.method = method;
   this.send();
}
//추가 메소드 확장
ajax.xhr.Request.prototype = { //통신용 라이브러리 때문에 만듦
	//XHR 객체 흭득
   getXMLHttpRequest: function() {
      return new XMLHttpRequest();
   }, // getXMLHttpRequest
// 요청데이터 전송
   send: function() {
	//개별로 사용할 XHR 객체를 흭득
      this.req = this.getXMLHttpRequest();
      //HTTP메소드가 있으면 사용하고 없으면 GET
      var httpMethod = this.method ? this.method : "GET"; //삼항 연산자 사용
      if (httpMethod != "GET" && httpMethod != "POST") httpMethod = "GET";
	//요청 데이터가 없다면
      var httpParams = (this.params == null || this.params == "") ? null : this.params;
     //url설정
      var httpUrl = this.url;
      //HTTP메소드가 GET일때 URL뒤에 요청데이터 붙인다.
      if (httpMethod == "GET" && httpParams != null) httpUrl = httpUrl + "?" + httpParams;
      //open 수행
      this.req.open(httpMethod, httpUrl, true);
      //클라잉언트가 보내는 데이터가 인코딩된 폼데이터라고 서버에 알려주는 역활
      this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //서버한테 이 컨텐츠가 폼 데이터인데 url 인코딩해서 알려주겠다
      //요청객체가 공유되지 못하도록 지역변수에 저장
      var request = this;
      //콜백함수 정의
      this.req.onreadystatechange = function() {
	//send 함수의 지역변수인 request의 참조변위를 onStateChange로 확장
      //call 함수 형식 : 함수명.call(함수내에서 this가 되어야 하는객채)
         request.onStateChange.call(request); //로컬은 함수 펑션 샌드함수는 지역변수 이다 
      }
      //POST인 경우는 파라미터 , GET인 경우는 주소에 파라미터 붙여서 보냈으므로 안보냄.
      this.req.send(httpMethod == "POST" ? httpParams : null);
   }, //send

   onstateChange: function() {
	//
      this.callback(this.req); // 이부분이 어려운대 이해가 안됨
      //call 함수를 사용했기 때문에
   } //onstateChange

} //ajax.xhr.Request.prototype

ajax.Event = {}; //만든 객체
//이벤트리스너 추가(이벤트타겟객체,이벤트명,리스너,)
ajax.Event.addListener = function(element, name, observer, useCapture) { //만든 객체
   useCapture = useCapture || false;
   //웹 표준브라우져에서 이벤트리스너 추가
   if (element.addEventListener) {  //원래 있던 거
      element.addEventListener(name, observer, useCapture);
   //구버전 IE 5,6에서 이벤트리스너 추가. 요즘은 6쓰질 않는다함.
   } else if (element.attachEvent) { //원래 있던 거
      element.attachEvent('on' + name, observer);
   }
}

//이벤트 타겟 제거
ajax.Event.removeListener = function(element, name, observer, useCapture) {
   useCapture = useCapture || false;
   if (element.removeEventListener) {  //원래 있던 거
      element.removeEventListener(name, observer, useCapture);
   } else if (element.detachEvent) { //원래 있던 거
      element.detachEvent('on' + name, observer);
   }
}
//이벤트 타겟 흑득
ajax.Event.getTarget = function(event) {
   if (event == null) return null;
   if (event.target) return event.target;	//웹표준 브라우져
   else if (event.srcElement) return event.srcElement; //IE 5,6 브라우져
   return null;
}

// 마우스의 XY좌표
ajax.Event.getMouseXY = function(event) {
   var mouseX = event.clientX;
   var mouseY = event.clientY;

   var dd = document.documentElement;
   var db = document.body;
   if (dd) {
      mouseX += dd.scrollLeft;
      mouseY += dd.scrollTop;
   } else if (db) {
      mouseX += db.scrollLeft;
      mouseY += db.scrollTop;
   }
   return { x: mouseX, y: mouseY };
}
//왼쪽 마우스가 눌렸는지
ajax.Event.isLeftButton = function(event) {
   return (event.which) ?
      event.which == 1 && event.button == 0 :
      (event.type == 'click') ? event.button == 0 : event.button == 1;
}
//오른족 마우스가 눌렸는지
ajax.Event.isRightButton = function(event) {
   return event.button == 2;
}
//이벤트 전달을 중지
ajax.Event.stopPropagation = function(event) {
   if (event.stopPropagation) {
      event.stopPropagation() ; //웹표준
   } else {
      event.cancelBubble = true; //IE 5,6
   }
}

//디폴트이벤트 : 웹브라우져가 기본적으로 가지고 있으면서 발생시키는 이벤트,사용자 정의 이벤트와 구분됨
ajax.Event.preventDefault = function(event) {
   if (event.preventDefault) {
      event.preventDefault(); //웹표준
   } else {
      event.returnValue = false; //IE 5,6
   }
}

//편의상 이벤트전달방지와 디폴트이벤트방지를 동시에 하기 위한 메소드
ajax.Event.stopEvent = function(event) {
   ajax.Event.stopPropagation(event);
   ajax.Event.preventDefault(event);
}

//오플라이는 배열을 맞는다.
//객체에 리스너들을 바인딩 한다.
//apply메소드를 사용하여 앞에 있는 func 내에서 this를 정의함.
ajax.Event.bindAsListener = function(func, obj) {
   return function() {
      return func.apply(obj, arguments); //아귀먼트를 펑션에 베이스로 쓰고 싶다!
   }
}