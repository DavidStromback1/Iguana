/* 
    Created on : 03-Dec-2016, 21:55:38
    Author     : Bernie
*/

    var $modalLog = $(".mainOverLayLog");
    var $modalReg = $(".mainOverLayReg");
    var $LogBtn = $(".loginBtn");
    var $RegBtn = $(".registerBtn");
    var $OverLay = $(".overLay");
    

function btnClickedLog(){
        $modalLog.addClass("active-mainOverLay");
    }
function btnClickedReg(){
        $modalReg.addClass("active-mainOverLay");
    }
    
function overLayDisappearLog(){
        console.log("Hello LOG");
        $modalLog.removeClass("active-mainOverLay");
}

function overLayDisappearReg(){
        console.log("Hello REG");
        $modalReg.removeClass("active-mainOverLay");
}
    
 $(document).ready(function(){
    
     $LogBtn.on("click", btnClickedLog);
     $RegBtn.on("click", btnClickedReg);
     $OverLay.on("click", overLayDisappearLog);
     $OverLay.on("click", overLayDisappearReg);
 });
 
 