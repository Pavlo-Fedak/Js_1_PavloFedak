"use strict";

const pairInput = document.getElementById("pair-input");

const addButton = document.getElementById("add-button");

const pairsList = document.getElementById("pairs-list");

const selectAllCheckbox = document.getElementById("select-all");

const sortNameButton = document.getElementById("sort-name-button");

const sortValueButton = document.getElementById("sort-value-button");

const deleteButton = document.getElementById("delete-button");

/* Масив у якому будемо зберігати об'єкти з даними користувача */
const pairs = [];
let nextId = 1;

/*-------------------------------------------------------*/

/* Функція для перевірки введення інформації користувачем */

function parsePair(input){
    const pattern = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/;

     const match = input.match(pattern);

     if (!match) {
         return null;
     }

     return{
         name: match[1],
         value: match[2],
     };

}
/*-------------------------------------------------------*/

/* функція для кнопки Add*/

function addPair() {
    const parsedPair = parsePair(pairInput.value);

    if (!parsedPair) {
        alert("Неправильний ввід. Будь ласка, використовуйте такий формат: Name=Value")
        return;
    }

    const newPair = {
        id: nextId,
        name: parsedPair.name,
        value: parsedPair.value
    };

    pairs.push(newPair);

    nextId++;

    pairInput.value = "";

     console.log(pairs)
    renderPairs();
}

pairInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addPair();
    }
});


addButton.addEventListener("click", addPair);

/*-------------------------------------------------------*/

/* Функція яка додає контент в список*/

function renderPairs() {
    pairsList.innerHTML = "";
    selectAllCheckbox.checked = false;
    if (pairs.length === 0) {
        pairsList.innerHTML = "<li>No pairs added yet</li>"
        return;
    }

    pairs.forEach((pair) =>{
        const listItem = document.createElement("li");

        listItem.classList.add("pair-list__item");

        listItem.innerHTML =`
                    <label>
                        <input type="checkbox"
                        class="pair-checkbox"
                        data-id="${pair.id}">
                        <span>${pair.name}=${pair.value}</span>
                    </label>`;
            pairsList.appendChild(listItem);
    });

}

/*-------------------------------------------------------*/

selectAllCheckbox.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll(".pair-checkbox");

    checkboxes.forEach((checkbox) =>{
        checkbox.checked = selectAllCheckbox.checked;
    });

});

/*-------------------------------------------------------*/

/*Функція для видалення вибраних елементів*/

function deleteSelectedPairs(){
    const checkedCheckboxes = document.querySelectorAll(".pair-checkbox:checked");

    checkedCheckboxes.forEach((checkbox) =>{
        const id = Number(checkbox.dataset.id);

        const pairIndex = pairs.findIndex((pair) =>{
            return pair.id === id;
        });

        if (pairIndex !== -1){
            pairs.splice(pairIndex, 1);
        }
    });
    selectAllCheckbox.checked = false;

    renderPairs();

}

deleteButton.addEventListener("click", deleteSelectedPairs);


/*-------------------------------------------------------*/

function sortByName() {
    pairs.sort((a, b) => {
        return a.name.localeCompare(b.name)
    });
    renderPairs();
}

sortNameButton.addEventListener("click", sortByName);

/*-------------------------------------------------------*/

function sortByValue() {
    pairs.sort((a, b) => {
        return a.value.localeCompare(b.value);
    });

    renderPairs();
}

sortValueButton.addEventListener("click", sortByValue);