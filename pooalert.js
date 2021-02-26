var curColorHex;
var targetRGBVals = [];
var rgbIncrement;
var nextRainbowVal = [];
    nextRainbowVal[0]=255;
    nextRainbowVal[1]=0;
    nextRainbowVal[2]=0;//RED

    nextRainbowVal[3]=255;
    nextRainbowVal[4]=165;
    nextRainbowVal[5]=0;//Orange

    nextRainbowVal[6]=255;
    nextRainbowVal[7]=255;
    nextRainbowVal[8]=0;//Yellow

    nextRainbowVal[9]=0;
    nextRainbowVal[10]=255
    nextRainbowVal[11]=0;//Green

    nextRainbowVal[12]=0;
    nextRainbowVal[13]=0;
    nextRainbowVal[14]=255;//Blue

    nextRainbowVal[13]=111;
    nextRainbowVal[14]=0;
    nextRainbowVal[15]=255;//Indigo

    nextRainbowVal[16]=143;
    nextRainbowVal[17]=0;
    nextRainbowVal[18]=255;//Violet

var rgbVals = [];
var curColor = [];
var colorIndex;
var equal = [];

function onPageLoad(){//this is only code specific to my problem, none of the other code
    colorIndex=0;
    equal[0]=true;
    equal[1]=true;
    equal[2]=true;

    rgbIncrement=1;//+1 so increment can't equal 0
    curColor[0]=nextRainbowVal[0];
    curColor[1]=nextRainbowVal[1];
    curColor[2]=nextRainbowVal[2];

    setInterval("backgroundChange();",10);

}//onPageLoad

function backgroundChange(){//all for loops are set to 3 because RGB never goes above 3 different variables (less chance of error)
    for(var i=0;i<3;i++){
    rgbVals[i]=curColor[i];
    }//for

    targetRGBVals[0] = nextRainbowVal[colorIndex];//Initializes the targetRGB val
    targetRGBVals[1] = nextRainbowVal[colorIndex+1];
    targetRGBVals[2] = nextRainbowVal[colorIndex+2];

    for(var i=0; i<3; i++){//for loop to see if it has reached target
        if(targetRGBVals[i] != rgbVals[i]){
            equal[i] = false;
        }//if
        else equal[i]=true;
    }//for

    if(equal[0]&&equal[1]&&equal[2]){//changes setpoints after the RGB vals have reached their target
        if(colorIndex>(nextRainbowVal.length-3)){//this keeps setting the color index to next color when the curColor is at target, if it gets to the last color, it resets at beginning of array
            colorIndex = 0;
        }//if

        for(var g = 0; g<targetRGBVals.length; g++){//this sets the next target RGB vals
            targetRGBVals[g] = nextRainbowVal[colorIndex+g];
        }//for

        colorIndex += 3;
    }//if

    for(var m = 0; m<rgbVals.length; m++){//this loop adds/subtracts from RGB vals by the increment, and also checks if the color is within the amount of the increment (so it doesn't bounce back and forth between colors)                        
        if((rgbVals[m] != targetRGBVals[m])&& !equal[m]){
            if((rgbVals[m]>=(targetRGBVals[m] - rgbIncrement))&&(rgbVals[m]<=(targetRGBVals[m] + rgbIncrement))) rgbVals[m] = targetRGBVals[m];
            else rgbVals[m] += targetRGBVals[m] > rgbVals[m] ? +rgbIncrement : -rgbIncrement;
            if(rgbVals[m]<0) rgbVals[m]=0;
        }//if
    }//for

    curColor = rgbVals;
    console.log(curColor);
    console.log(rgbToHex(curColor[0],curColor[1],curColor[2]));
    hexColor = rgbToHex(curColor[0],curColor[1],curColor[2]);
    document.getElementById("bodyColor").style.backgroundColor=hexColor;
}//backgroundChange

function componentToHex(c){
    console.log(c);
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}//componentToHex

function rgbToHex(r,g,b){
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}//rgbToHex