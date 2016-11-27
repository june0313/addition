$(document).ready(function () {
	// 숫자 목록 초기화
	initializeNumbers();

	// 컴포넌트에 이벤트 바인딩
	bindEvents();
});

function initializeNumbers() {
	var operands = $("#operands"), answers = $("#answers"), numberCount;
	operands.empty();
	answers.empty();
	numberCount = $("#count-select option:selected").val();

	for (var i = 0; i < numberCount; i++) {
		// 1 ~ 9 까지의 랜덤한 숫자 생성
		var number = getRandomNumber(0, 9);
		operands.append("<div class='operand'>" + number + "</div>");

		// 연산자(+) 출력
		if (i !== numberCount - 1) {
			operands.append("<span class='operator'>+</span class='ui label'>");
		}
	}

	$(".operand").fadeIn("slow").css("display","inline-block");

	// 총 합이 19를 넘어가면 다시 초기화 한다.
	var answer = calculateAnswer();
	if (answer > 19) {
		initializeNumbers();
	}
}

function getRandomNumber(min, max) {
	max = max + 1;
	return Math.floor(Math.random() * (max - min) + min);
}

function bindEvents() {
	bindMakeNumberEvent();
	bindShowAnswerEvent();
	bindSelectBoxEvent();
}
function bindMakeNumberEvent() {
	// 숫자 만들기 버튼 클릭 이벤트
	$("#refresh").on('click', function () {
		initializeNumbers();
	});
}

function calculateAnswer() {
	var answer = 0;

	$('.operand').each(function () {
		answer += Number($(this).text());
	});
	return answer;
}
function bindShowAnswerEvent() {
	$('#show-answer').on('click', function () {
		var answer = calculateAnswer();
		var answers = $("#answers");
		answers.empty();
		answers.append("<span class='answer'>" + answer + "</span>");

		$(".answer").fadeIn("slow").css("display", "inline-block");
	});
}

function bindSelectBoxEvent() {
	var selectBox = $('#count-select');

	selectBox.dropdown();
	selectBox.change(function () {
		initializeNumbers();
	});
}


