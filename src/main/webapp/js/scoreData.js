var xhr;  //함수 밖은 전역변수다

window.onload = function() {
	xhr = new XMLHttpRequest();      // var 넣으면 전역변수가 된다.
}

function processJSCSV() {
	var responseText;
	if (xhr != null) {
		xhr.open("GET", "/WEBTest/csv/scoreData.csv", true);   //비동기
		// 1. 이벤트명 : readystatechange
		// 2. 이벤트핸들러 property(변수)명 : onreadystatechange
		// 3. 이벤트콜백함수 : function() { ... }
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {   // 객체(클라이언트)상태 && 서버(응답)상태
				responseText = xhr.responseText;

				var resultArray = responseText.split(",");

				var rowIndex = 0;            //문자 앞자리
				var columnIndex = 0;      //문자 뒷자리
				for (i = 0; i < resultArray.length; i++) {
					columnIndex = i % 3;

					if (columnIndex == 0)
						rowIndex++;
					document.getElementById("" + rowIndex + columnIndex).innerHTML = resultArray[i];      // "" => 문자열로 만든다는 뜻.


				}
				z = document.getElementById("13");
				x = document.getElementById("23");
				c = document.getElementById("33");
				
				
				// 1번과 2번을 뽑아와야된다.
			 	z.innerHTML=eval(resultArray[1]+"+"+resultArray[2]);
			 	x.innerHTML=eval(resultArray[4]+"+"+resultArray[5]);
			 	c.innerHTML=eval(resultArray[7]+"+"+resultArray[8]);
//이새끼잘되나 확인하는거			 	console.log(z);
//			 	console.log(x);
//			 	console.log(c);

				getTotalJSCSV(responseText);
				
				a = document.getElementBsyId("14");
				s = document.getElementById("24");
				d = document.getElementById("34");
				
				a.innerHTML=eval(resultArray[1]+"+"+resultArray[2])+"/"+"2";
				console.log(a);
				getTotalJSCSV(responseText);
				
			}
		}
		xhr.send();
	}
}

function getTotalJSCSV(responseText) {
	if (xhr != null) {
		xhr.open("GET", "/WEBTest/jsp/scoreDataProcess.jsp?responseText=" + responseText, true); //비동기
		//false 이거 넣으면 동기
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var totalArray = eval("(" + xhr.responseText + ")");//([260,230])
				document.getElementById("41").innerHTML = totalArray[0];
				document.getElementById("42").innerHTML = totalArray[1];
			}
		}
		xhr.send();
	}
}

function processJSJSON() {
	if (xhr != null) {
		xhr.open("GET", "/WEBTest_/json/scoreData.json", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {

			}
		}
		xhr.send();
	}
}

function processJSXML() {
	if (xhr != null) {
		xhr.open("GET", "/WEBTest_/xml/scoreData.xml", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {

			}
		}
		xhr.send();
	}
}



