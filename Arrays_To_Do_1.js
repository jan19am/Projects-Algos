// Push Front

var myArr = [1,2,3,4];

i = myArr.length;
while (i-- > 0)
    myArr[i + 1] = myArr[i];
myArr[0] = 5;
console.log(myArr);


// Pop Front

var popArr = [23,16,11,7];
for (var i=1; i< popArr.length; i++){
    popArr[i-1] = popArr[i];
}
popArr.pop();
console.log(popArr)


// Function for Insert At
var myArr = [1,2,3,5];
function pushFront(num, val) {
    i = myArr.length;
    while (i-- > 0)
        myArr[i + 1] = myArr[i];
    myArr[num] = val;
    console.log(myArr);
}

pushFront(1,45)



