//メニューアコーディオン
window.addEventListener('load', () => {
    document.querySelectorAll('.my-page_nav__menu').forEach((accordion) => {
        let activeIndex = null;

        const accordionToggle = accordion.querySelectorAll('.my-page_nav__item--ac');
        const accordionList = accordion.querySelectorAll('.my-page_nav__menu > li.my-page_nav__items');


        // autoはアニメーション設定できない為height取得
        accordion.querySelectorAll('.my-page_nav__submenu').forEach((submenu) => {
            submenu.style.height = submenu.clientHeight + 'px';
            submenu.parentNode.classList.add('close');
        });

        accordionToggle.forEach((toggleBtn, index) => {
            toggleBtn.addEventListener('click', (e) => {
                if (activeIndex !== null && activeIndex !== index) {
                    accordionList[activeIndex].classList.add('close');
                }
                e.target.parentNode.classList.toggle('close');

                activeIndex = index;
            });
        });
    });
});

//マイページハンバーガーメニュー
document.querySelector('.menu-icon').addEventListener('click', function () {
    document.querySelector('.my-page_nav').classList.toggle('my-page_nav--open');
});

//25チェックボックスハイライト
function showTxt() {
    if (document.getElementById('chkbx').checked) {
        $("#txt").show();
    } else {
        $("#txt").hide();
    }
}

//05アコーディオン
const dt_tags = document.querySelectorAll('.toggle_contents dt');
const height = 0;
dt_tags.forEach(dt => {


    dt.addEventListener('click', () => {
        dt.classList.toggle('close');
        dt.nextElementSibling.classList.toggle('close');
        dt.nextElementSibling.style.minheight = dt.nextElementSibling.clientHeight + 'px';
    })
});

