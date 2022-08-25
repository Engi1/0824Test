/*
	model : 데이터.데이터 처리 담당하는 MVC의 M

*/
//채크상태, 표시될레이블을 인자로 하는 모델 생성자
CheckButtonModel = function(checked, label) {
   this.listeners = new Array();
   this.checked = checked;
   this.label = label;
}

CheckButtonModel.prototype = {
	//리스너는 모델의 변화를 감지하는 기능
	//리스너 추가
   addListener: function(listener) {
      this.listeners[this.listeners.length] = listener;
   }, //addListener

	//리스너 제거
   removeListener: function(listener) {
      if (this.listeners.length == 0) return; //listener가 없다면 리턴하겠다
// 새로운 배열을 생성함.
      var newListeners = new Array();
      //입력한 만큼 돌겠다.
      for (var i = 0; i < this.listeners.length; i++) {
         if (this.listeners[i] != listener) { //각배열의 리스널이 받아온 리스널이 아니면
            newListeners[newListeners.length] = this.listeners[i]; //추가해준다~
         }
      }
      this.listeners = newListeners;
   }, //removeListener

//뷰의 변경을 위해서 모델의 변화를 통보 다른애가 변경됬따 뷰너도 바꿔야됨 이런느낌이라는거 같음 
   notify: function() { 
      for (var i = 0; i < this.listeners.length; i++) {
         //this는 모델,리스너들에게 변화를 통보
         this.listeners[i].changed(this);
      }
   }, //notify
//체크가 된다면 통보한다. 
   setChecked: function(checked) {
      this.checked = checked; //체크 상태로 변화시키고 알려준다
      this.notify();
   }, //setChecked 
//채크 상태를 변경한다
   toggle: function() {
      if (this.checked) checked = false; //체크가 돼있으면 체크 해제하겠다
      else this.checked = true; //안 되어있으면 체크
   }, //toggle
//채크 되어 있는지를 확인한다.
   isChecked: function() {
      return this.checked; //체크 돼있는지 확인 후 결과를 this.checked로 넘겨준다
   }, //isChecked
//레이블의 값을 가져옴
   getLabel: function() {
      return this.label; //label 값을 리턴
   } //getLabel

} // CheckButtonModel.prototype

//컨트롤러 : 모델과 뷰를 인자로 받아서MVC의 처리를 담당
CheckButton = function(model, ui) {
   this.model = model;
   this.ui = ui;
   //모델에 리스너를 추가 (리스너===컨트롤러)
   this.model.addListener(this); 
   //뷰에 리스너를 추가(리스너==컨트롤러)
   this.ui.setCheckButton(this);
   //뷰 렌더링
   this.ui.render();
}

CheckButton.prototype = { //모델의 체크상태를 설정
   setChecked: function(checked) {  
      this.model.setChecked(checked); //모델의 토글
   },
   toggle: function() {
      this.model.toggle();
   }, //모델의 체크상태를 확인
   isChecked: function() {
      this.model.isChecked();
   }, // 모델의 레이블 가져오기
   getLabel: function() {
      this.model.getLabel();
   },// 뷰 업데이트
   changed: function() {
      this.ui.changed();
   }
}
/*
	View : MOdel 을 표현하는 역활, MVC의 V
*/

//뷰 생성자
CheckButtonUI = function(elementId) {
   this.element = document.getElementById(elementId); 
   this.checkButton = null;  // 컨트롤러
}
//뷰 메소드 확장
CheckButtonUI.prototype = {
	//컨트롤러 설정 
   setCheckButton: function(checkButton) {
      this.checkButton = checkButton;
   }, // setCheckButton
   
	//화면에 렌더링
   render: function() {
	
	//html 문자열 생성.
      var html = "<img src='";
      if (this.checkButton.isChecked()) {
         html += "/WEBTest/images/check_on.gif'>";
      } else {
         html += "/WEBTest/images/check_off.gif'>";
      }
      
      html += "&nbsp;" + this.checkButton.model.getLabel();
      
      this.element.style.cursor = 'hand';
      this.element.innerHTML = html;
	//이벤트리스너 추가
      ajax.Event.addListener(this.element, "click", ajax.Event.bindAsListener(this.doClick, this))
   }, // render
   
	// 토글행위를 컨트롤러에게 전달한다
   doClick: function() {
      this.checkButton.toggle(); //클릭이 일어난 버튼을 토글하겠다
   }, //doClick

	// 이미지를 변경
   update: function() {
      var img = this.element.getElementByTagName("img").item(0); //img 태그 중에서 첫번째
      if (this.checkButton.isChecked()) {
         img.src = "/WEBTest/images/check_on.gif";
      } else {
         img.src = "/WEBTest/images/check_off.gif"
      }

   }

} //CheckButtonUI