const weeks = ["日", "月", "火", "水", "木", "金", "土"];
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let today = new Date(year + "-" + month + "-" + day);
const config = {
    show: 3
};

function showCalendar(year, month) {
    for (i = 0; i < config.show; i++) {
        const calendarHtml = createCalendar(year, month);
        const sec = document.createElement("section");
        sec.id = "calendar_" + i;
        sec.className = "calendar-container";
        sec.innerHTML = calendarHtml;
        document.querySelector("#calendar").appendChild(sec);

        month++;
        if (month > 12) {
            year++;
            month = 1;
        }
    }
}

function createCalendar(year, month) {
    const startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
    const endDate = new Date(year, month, 0); // 月の最後の日を取得
    const endDayCount = endDate.getDate(); // 月の末日
    const lastMonthEndDate = new Date(year, month - 1, 0); // 前月の最後の日の情報
    const lastMonthendDayCount = lastMonthEndDate.getDate(); // 前月の末日
    const startDay = startDate.getDay(); // 月の最初の日の曜日を取得
    let dayCount = 1; // 日にちのカウント
    let calendarHtml = ""; // HTMLを組み立てる変数

    calendarHtml += "<h2 class='calendar_head'>" + year + "/<span class='calender_day'>" + month + "</span></h1>";
    calendarHtml += "<table class='calendar'><tr class='week'>";

    // 曜日の行を作成
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += "<th>" + weeks[i] + "</th>";
    }

    for (let w = 0; w < 6; w++) {
        calendarHtml += "</tr><tr class='day'>";

        for (let d = 0; d < 7; d++) {


            let tdDay = new Date(year + "-" + month + "-" + dayCount);

            if (w == 0 && d < startDay) {
                // 1行目で1日の曜日の前
                let num = lastMonthendDayCount - startDay + d + 1;
                calendarHtml += '<td class="is-disabled">' + num + "</td>";
            } else if (dayCount > endDayCount) {
                // 末尾の日数を超えた
                let num = dayCount - endDayCount;
                calendarHtml += '<td class="is-disabled">' + num + "</td>";
                dayCount++;
            } else if (today < tdDay) {//依頼日の可能日の判定
                calendarHtml += "<td><input data-micromodal-trigger='time_modal' id='item_list_id_" + year + month + dayCount + "' class='calender_date__input' type='radio' name='calender_date'><label for='item_list_id_" + year + month + dayCount + "'>" + dayCount + "</label></td>";
                dayCount++;
            } else {
                calendarHtml += "<td class='disabled_day'>" + dayCount + "</td>";
                dayCount++;
            }
        }
        calendarHtml += "</tr>";
    }
    calendarHtml += "</table>";

    return calendarHtml;
}

function moveCalendar(e) {
    document.querySelector("#calendar").innerHTML = "";

    if (e.target.id === "prev") {
        month--;

        if (month < 1) {
            year--;
            month = 12;
        }
    }

    if (e.target.id === "next") {
        month++;

        if (month > 12) {
            year++;
            month = 1;
        }
    }

    showCalendar(year, month);
}

document.querySelector("#prev").addEventListener("click", moveCalendar);
document.querySelector("#next").addEventListener("click", moveCalendar);

showCalendar(year, month);


//時間選択モーダル
MicroModal.init({
    openClass: 'is-open',
    disableScroll: true,
});
