//On page load
$(document).ready(function () {
    localStorage.getItem('inventory')?void(0):localStorage.setItem("inventory", JSON.stringify([]))
    console.log("ready")
    checkSave();
    markFoundItems(true);
});
//Navigate to chapters
function goto(x) {
    if (x === "main") {
        checkSave();
    } else {
        localStorage.setItem("lastChapter", localStorage.getItem("currentChapter"))
        localStorage.setItem("currentChapter", x)
        new Audio('assets/sound/pageTurn.wav').play()
    }
    $(".show").addClass("hide");
    $(".show").removeClass("show");
    $("#" + x).addClass("show");
}
function goback() {
    let last=localStorage.getItem("lastChapter");
    localStorage.setItem("currentChapter", last);
    new Audio('assets/sound/pageTurn.wav').play()
    $(".show").addClass("hide");
    $(".show").removeClass("show");
    $("#" + last).addClass("show");
}
// Game functions
function checkSave() {
    if (localStorage.getItem("currentChapter")) {
        $("#continue").addClass("unlocked");
        $("#continue").removeClass("locked");
        return true
    } else {
        $("#continue").addClass("locked");
        $("#continue").removeClass("unlocked");
        return false
    }
}
function load() {
    if (checkSave()) {
        let chapter = localStorage.getItem("currentChapter")
        $(".charName").text(localStorage.getItem("charName"))
        $(".show").addClass("hide");
        $(".show").removeClass("show");
        $("#" + chapter).addClass("show");
    }
}
function newGame() {
    function startNew() {
        let name = prompt("Come ti chiami?", "Stephen Wardell");
        markFoundItems(false);
        localStorage.setItem("charName", name)
        $(".charName").text(localStorage.getItem("charName"))
        localStorage.setItem("inventory", JSON.stringify([]))
        goto(1)
        localStorage.setItem("lastChapter", 1)
    }
    if (checkSave()) {
        if (confirm('Esistono dati salvati. Vuoi iniziare una nuova partita e sovrascriverli?')) {
            startNew()
        }
    } else {
        startNew()
    }
}
//Inventory Functions
function checkItem(x) {
    var inventory = JSON.parse(localStorage.getItem("inventory"))
    function checkInv(item) {
        return item == x;
    }
    return inventory.find(checkInv) ? true : false
}
function markFoundItems(bool) {
    var inventory = JSON.parse(localStorage.getItem("inventory"))
    if (bool) {
        for (i = 0; i < inventory.length; i++) {
            $("#" + inventory[i]).addClass("taken")
        }
    } else {
        for (i = 0; i < inventory.length; i++) {
            $("#" + inventory[i]).removeClass("taken")
        }
    }

}
function addItem(x) {
    var inventory = JSON.parse(localStorage.getItem("inventory"))
    checkItem(x) ? void (0) : inventory.push(x)
    $("#" + x).addClass("taken")
    localStorage.setItem("inventory", JSON.stringify(inventory))
}
function useItem(item, consume, success, fail) {
    if (checkItem(item)) {
        goto(success)
        if (consume) {
            removeItem(item)
        }
    } else {
        if (fail) {
            goto(fail)
        } else {
            $("#use-" + item).addClass("shake")
            setTimeout(() => $("#use-" + item).removeClass("shake"), 600)
        }
    }
}
function removeItem(x) {
    var inventory = JSON.parse(localStorage.getItem("inventory"))
    function checkInv(item) {
        return item == x;
    }
    inventory.splice(inventory.findIndex(checkInv), 1)
    localStorage.setItem("inventory", JSON.stringify(inventory))
}