const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector("#phone_button");
const phoneSpan = document.querySelector("#phone_result");

const regExp = /^\+996 [2579] \d{2} \d{2} \d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = "Ok"
        phoneSpan.style.color = "green"
    } else {
        Z
        phoneSpan.innerHTML = "Not Ok"
        phoneSpan.style.color = "red"
    }
}

//TAB SLIDER

const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabItems = document.querySelectorAll(".tab_content_item");
const tabParent = document.querySelector(".tab_content_items");
const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = "none"
    })
    tabItems.forEach((item) => {
        item.classList.remove("tab_content_item_active")
    })
}


const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = "block"
    tabItems[index].classList.add("tab_content_item_active")
}

hideTabContent()
showTabContent()


tabParent.onclick = (event) => {
    if (event.target.classList.contains("tab_content_item")) {
        tabItems.forEach((item, index) => {
            if (event.target === item) {
                hideTabContent()
                showTabContent(index)
            }
        })
    }
}

let intervalId = setInterval(function () {
    let activeIndex = Array.from(tabItems).findIndex(item => item.classList.contains('tab_content_item_active'));

    if (activeIndex < tabItems.length - 1) {
        activeIndex++;
    } else {
        activeIndex = 0;
    }

    tabItems[activeIndex].click();
}, 3000);


//модальное окно
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal_close');
let modalShown = false;

function showModal() {
    if (!modalShown) {
        modal.style.display = 'block';
        modalShown = true;
        removeScrollListener();
    }
}

function removeScrollListener() {
    window.removeEventListener('scroll', handleScroll);
}

function handleScroll() {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        showModal();
    }
}

window.addEventListener('load', () => {
    window.addEventListener('scroll', handleScroll);
    setTimeout(showModal, 10000);
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

//конвертации

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const converter = (element, targetElement) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/converter.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);
            if (element.id === "som") {
                usdInput.value = (element.value / data.usd).toFixed(2);
                eurInput.value = (element.value / data.eur).toFixed(2);
            } else if (element.id === "usd") {
                somInput.value = (element.value * data.usd).toFixed(2);
                eurInput.value = (element.value * data.usd / data.eur).toFixed(2);
            } else if (element.id === "eur") {
                somInput.value = (element.value * data.eur).toFixed(2);
                usdInput.value = (element.value * data.eur / data.usd).toFixed(2);
            }
            element.value === "" && (targetElement.value = "");
        };
    };
};

converter(somInput, usdInput);
converter(usdInput, somInput);
converter(somInput, eurInput);
converter(usdInput, eurInput);
converter(eurInput, somInput);
converter(eurInput, usdInput);
