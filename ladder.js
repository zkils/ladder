var ladder = {};
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


function validateLadder(){
    var $input = $("input[type='number']");
    if(parseInt($input.val()) <= 0){
        $input.val(1);
    }else{
        return false;
    }
};

function selectLadder(){
    var $startPoint = $("input[name='start-point']");
    var startPoint = [$startPoint.val(),0];
    searchNextLadder(startPoint);
    $("#result").text("도착지는 " + startPoint[0] + " !");
};

function searchNextLadder(startPoint){
    var range = ladder[startPoint[0]];
    var leftMin = 999 , rightMin = 999;
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
    if(leftMin > rightMin){ //go right ladder
        startPoint[0]++;
        startPoint[1] = rightMin;
        searchNextLadder(startPoint);
    }else if(leftMin < rightMin){
        startPoint[0]--;
        startPoint[1] = leftMin;
        searchNextLadder(startPoint);
    }else{
        return startPoint;
    }
};