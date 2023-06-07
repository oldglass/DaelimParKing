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

function changeFromFile() {
    for (let i = 0; i < blanks.length; i++) {
        change_parking_state(i, blanks[i]);
    }
}

const parking_lots = document.getElementsByClassName("parking_lots");
const parking_disabled_lots = document.getElementsByClassName("parking_disabled_lots");
const parking_blanks_count = document.getElementById("blanks_count");
const parking_disabled_blanks_count = document.getElementById("disabled_blanks_count");
const reqUrl = "/parking/info";
const resUrl = "/parking/update";
const color_red = "#FF3636";
const color_green = "#6dcc60";


// const blank_list = {"parkingInfo": [1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0]};  // 전송 테스트 용

// let blanks = [];
// responseAjax(); // 전송 테스트
// requestAjax();

// setInterval(() => {
//     requestAjax();    
// }, 60000);   

let test = JSON.parse(JSON.stringify(Parking));
let blanks = test.parkingInfo.slice(1);

changeFromFile();
setInterval(() => {
    changeFromFile();
}, 6000);

let blanks_count = blanks.filter(element => 0 === element).length;
let disabled_blanks_count = blanks.slice(0, 2).filter(element => 0 === element).length;

parking_blanks_count.innerText += ` ${blanks_count - disabled_blanks_count}개`;
parking_disabled_blanks_count.innerText += ` ${disabled_blanks_count}개`;