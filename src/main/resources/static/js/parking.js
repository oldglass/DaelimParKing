function change_parking_state(lot_num, isBlank) {
    if (lot_num > 20) {
        if (isBlank) {
            parking_disabled_lots[lot_num - 21].style.backgroundColor = color_red;
        } else {
            parking_disabled_lots[lot_num - 21].style.backgroundColor = color_green;
        }
    } else {
        if (isBlank) {
            parking_lots[lot_num].style.backgroundColor = color_red;
        } else {
            parking_lots[lot_num].style.backgroundColor = color_green;
        }
    }
}

function requestAjax() {
    $.ajax({
        type: "POST",
        url: reqUrl,
        async: false,  // 동기 처리
        success:function(res){
            console.log(`성공!\n${res.isBlanks}`);
            blanks = res.isBlanks;

            for (let i = 0; i < blanks.length; i++) {
                change_parking_state(i, blanks[i]);
            }
        },
        error:function(res){
            console.log("에러");
        }
    })
}

function responseAjax() {
    $.ajax({
        type: "POST",
        url: resUrl,
        data: JSON.stringify(blank_list),
        dataType: "json",
        contentType : "application/json",
        async: false,  // 동기 처리
        success:function(res){
            console.log(`성공!, ${res.code}`);
        },
        error:function(res){
            console.log("에러");
        }
    })
}

/* html에서 json파일을 javascript형태로 불러올 때 사용한다.
function changeFromFile() {
    for (let i = 0; i < blanks.length; i++) {
        change_parking_state(i, blanks[i]);
    }
} */

function changeFromFile() {
    fetch("../json/result.json")
    .then((response) => response.json())
    .then((json) => {
        let blanks = json.parkingInfo.slice(1);
        
        for (let i = 0; i < blanks.length; i++) {
            change_parking_state(i, blanks[i]);
        }

        let blanks_count = blanks.filter(element => 0 === element).length;
        let disabled_blanks_count = blanks.slice(21, 23).filter(element => 0 === element).length;

        parking_blanks_count.innerText = `빈 주차 자리 개수: ${blanks_count - disabled_blanks_count}개`;
        parking_disabled_blanks_count.innerText = `빈 장애인 주차 자리 개수: ${disabled_blanks_count}개`;
    })
}

const parking_lots = document.getElementsByClassName("parking_lots");
const parking_disabled_lots = document.getElementsByClassName("parking_disabled_lots");
const parking_blanks_count = document.getElementById("blanks_count");
const parking_disabled_blanks_count = document.getElementById("disabled_blanks_count");
const reqUrl = "/parking/info";
const resUrl = "/parking/update";
const color_red = "#FF3636";
const color_green = "#6dcc60";

changeFromFile();

setInterval(() => {
    changeFromFile();
}, 10000);

/* ajax로 DTO에 값을 보낼 때 사용한다. 
const blank_list = {"parkingInfo": [1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0]};  // 전송 테스트 용
let blanks = [];
responseAjax(); // 전송 테스트
requestAjax(); */

/* html에서 json파일을 javascript형태로 불러올 때 사용한다.
let data = JSON.parse(JSON.stringify(Parking));
let blanks = data.parkingInfo.slice(1);
setInterval(() => {
    data = JSON.parse(JSON.stringify(Parking));
    blanks = data.parkingInfo.slice(1);
    changeFromFile();
    console.log("running...");
}, 10000); */
