var button = document.querySelector("#my-button");
var rbutton = document.querySelector("#my-rbutton");
var myList = document.querySelector("#my-list");
var completedList = document.querySelector("#completed-list");
var words = [];

button.onclick = function () {

    var textInput = document.querySelector("#my-input");
    var textFromInput = textInput.value;

    newListItem = createCheckboxItem(textFromInput);

    if (textFromInput != "") {
        myList.appendChild(newListItem);

    }
};

rbutton.onclick = function () {
    randomWord = words[Math.floor(Math.random() * words.length)];
    newListItem = createCheckboxItem(randomWord);
    myList.appendChild(newListItem);
}

function createCheckboxItem(labelText) {

    var count = myList.childElementCount + completedList.childElementCount;
    var newListItem = document.createElement("li");

    //create checkbox with unique id
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "cb-" + count;
    checkbox.value = count;
    checkbox.id = "cb-" + count ;

    //create checkbox label with coresponding id
    checkBoxLabel = document.createElement('label');
    checkBoxLabel.id = "cbl-" + count;
    checkBoxLabel.htmlFor = "id";
    checkBoxLabel.appendChild(document.createTextNode(labelText));

    //append checkbox and label to the same node, then insert the node into myList
    newListItem.appendChild(checkbox);
    newListItem.appendChild(checkBoxLabel);
    newListItem.name = 'cbi-' + count;
    console.log("'"+newListItem.name+"' created")

    //call function on click to move to Completed list/ delete if already there
    checkbox.onclick = function () {checkboxfunction(newListItem); };

    return newListItem;
}

//If item (a node containing both checkbox and checkboxlabel elements) is still in myList, move to completed list. next onclick will delete the item
function checkboxfunction(checkitem) {
    myList.removeChild(checkitem);
    checkitem.childNodes[0].onclick = function () {
        completedList.removeChild(checkitem);
        console.log("deleted '" + checkitem.name + "'")
    };
    completedList.appendChild(checkitem);
    console.log("moved '" + checkitem.name + "' to completed list")
};

fetch("https://api.jsonbin.io/b/5f529848514ec5112d164c1a").then(function (response) {

    // when the server eventually responds
    response.json().then(function (data) {

        //when the data is ready for us:
        words = data;

    });

});
