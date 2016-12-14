/* 
 Created on : 03-Dec-2016, 21:55:38
 Author     : Bernie
 */
var $helpBlock = $(".help-block");
var $hasError = $(".has-error");
var visited = localStorage.visited;
var $modalLog = $(".mainOverLayLog");
var $modalReg = $(".mainOverLayReg");
var $LogBtn = $(".loginBtn");
var $RegBtn = $(".registerBtn");
var $OverLay = $(".overLay");
var $FormClearName = $("#name");
var $FormClearEmail = $("#email");
var $FormClearEmailREG = $modalReg.find("#email");
var $replayBtn = $("#replayBtn");


function btnClickedLog() {
    $FormClearEmail.val("");
    localStorage.setItem("visited", "login");
    $modalLog.addClass("active-mainOverLay");

}
function btnClickedReg() {
    $FormClearName.val("");
    $FormClearEmailREG.val("");
    localStorage.setItem("visited", "register");
    $modalReg.addClass("active-mainOverLay");
}

function overLayDisappearLog() {
    $modalLog.removeClass("active-mainOverLay");
    $helpBlock.remove();
    $hasError.removeClass("has-error");
}

function overLayDisappearReg() {
    $modalReg.removeClass("active-mainOverLay");
    $helpBlock.remove();
    $hasError.removeClass("has-error");
}

function rerereplay(){
    console.log("In replay");
    init();
}

function removeInstructions(){
     $(".Instructions").hide();
}

$(document).ready(function () {
    checkErrorState();
    $LogBtn.on("click", btnClickedLog);
    $RegBtn.on("click", btnClickedReg);
    $OverLay.on("click", overLayDisappearLog);
    $OverLay.on("click", overLayDisappearReg);
    $replayBtn.on("click", rerereplay);
});

function checkErrorState() {
    if ($(".help-block").length >= 1 && visited === "login") {
        btnClickedLog();
    } else if ($(".help-block").length >= 1 && visited === "register") {
        btnClickedReg();
    }
}

 