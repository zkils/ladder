var ladder = {};
$(document).ready(function(e){
    $("input").on("blur",function(e){
        if(parseInt($(this).val()) <= 0){
            $(this).val(1);
        }else{
            return false;
        }
    });
});

function pushLadder(){
    var $row = $("input[name='row']");
    var $col = $("input[name='column']");
    var rowVal = $row.val() , colVal = $col.val();

    if(ladder[colVal]){
        if(checkDuplicate(rowVal,ladder[colVal])){
            ladder[colVal].push(rowVal);
            ladder[colVal].sort();
        }
    }else{
        ladder[colVal] =[rowVal];
    }
    $row.val(null);
    $col.val(null);
};

function checkDuplicate(val,arr){
    for(var i in arr){
        if(val == arr[i]){
            return false;
        }
    }
    return true;
};

function selectLadder(){
    var $startPoint = $("input[name='start-point']");
    var startPoint = [$startPoint.val(),0];
    if(checkAvailable($startPoint.val())){
        searchNextLadder(startPoint);
        $("#result").text("도착지는 " + startPoint[0] + " 입니다.");
    }else{
        $("#result").text("사다리가 없습니다.");
    }
};

function checkAvailable(val){
    if(ladder[val] || ladder[val-1]){
        return true;
    }else{
        return false;
    }
};

function searchNextLadder(startPoint){
    var range = ladder[startPoint[0]];
    var leftMin , rightMin;
    console.log(startPoint);
    for(var i in range){
        if(range[i]>startPoint[1]){
            rightMin = range[i];
            break;
        }
    }
    range = ladder[startPoint[0]-1];
    for(var i in range){
        if(range[i]>startPoint[1]){
            leftMin = range[i];
            break;
        }
    }

    if(typeof leftMin === 'undefined' && typeof rightMin === 'undefined'){
        return startPoint;
    }else if(leftMin > rightMin || typeof leftMin === 'undefined'){ //go right ladder
        startPoint[0]++;
        startPoint[1] = rightMin;
        searchNextLadder(startPoint);
    }else if(leftMin < rightMin || typeof rightMin === 'undefined'){
        startPoint[0]--;
        startPoint[1] = leftMin;
        searchNextLadder(startPoint);
    }

};
