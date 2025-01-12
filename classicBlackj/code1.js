gdjs.blackjack2Code = {};
gdjs.blackjack2Code.localVariables = [];
gdjs.blackjack2Code.GDbgObjects1= [];
gdjs.blackjack2Code.GDbgObjects2= [];
gdjs.blackjack2Code.GDbgObjects3= [];
gdjs.blackjack2Code.GDplayButtonObjects1= [];
gdjs.blackjack2Code.GDplayButtonObjects2= [];
gdjs.blackjack2Code.GDplayButtonObjects3= [];
gdjs.blackjack2Code.GDgoalObjects1= [];
gdjs.blackjack2Code.GDgoalObjects2= [];
gdjs.blackjack2Code.GDgoalObjects3= [];
gdjs.blackjack2Code.GDbackButtonObjects1= [];
gdjs.blackjack2Code.GDbackButtonObjects2= [];
gdjs.blackjack2Code.GDbackButtonObjects3= [];
gdjs.blackjack2Code.GDcardValueObjects1= [];
gdjs.blackjack2Code.GDcardValueObjects2= [];
gdjs.blackjack2Code.GDcardValueObjects3= [];
gdjs.blackjack2Code.GDplayAgainObjects1= [];
gdjs.blackjack2Code.GDplayAgainObjects2= [];
gdjs.blackjack2Code.GDplayAgainObjects3= [];
gdjs.blackjack2Code.GDWithdrawlObjects1= [];
gdjs.blackjack2Code.GDWithdrawlObjects2= [];
gdjs.blackjack2Code.GDWithdrawlObjects3= [];
gdjs.blackjack2Code.GDbotCardValueObjects1= [];
gdjs.blackjack2Code.GDbotCardValueObjects2= [];
gdjs.blackjack2Code.GDbotCardValueObjects3= [];
gdjs.blackjack2Code.GDbettingBoxObjects1= [];
gdjs.blackjack2Code.GDbettingBoxObjects2= [];
gdjs.blackjack2Code.GDbettingBoxObjects3= [];
gdjs.blackjack2Code.GDhaveMoneyObjects1= [];
gdjs.blackjack2Code.GDhaveMoneyObjects2= [];
gdjs.blackjack2Code.GDhaveMoneyObjects3= [];
gdjs.blackjack2Code.GDBackObjects1= [];
gdjs.blackjack2Code.GDBackObjects2= [];
gdjs.blackjack2Code.GDBackObjects3= [];
gdjs.blackjack2Code.GDagainObjects1= [];
gdjs.blackjack2Code.GDagainObjects2= [];
gdjs.blackjack2Code.GDagainObjects3= [];
gdjs.blackjack2Code.GDHitObjects1= [];
gdjs.blackjack2Code.GDHitObjects2= [];
gdjs.blackjack2Code.GDHitObjects3= [];
gdjs.blackjack2Code.GDstandObjects1= [];
gdjs.blackjack2Code.GDstandObjects2= [];
gdjs.blackjack2Code.GDstandObjects3= [];
gdjs.blackjack2Code.GDoneObjects1= [];
gdjs.blackjack2Code.GDoneObjects2= [];
gdjs.blackjack2Code.GDoneObjects3= [];
gdjs.blackjack2Code.GDtwoObjects1= [];
gdjs.blackjack2Code.GDtwoObjects2= [];
gdjs.blackjack2Code.GDtwoObjects3= [];
gdjs.blackjack2Code.GDthreeObjects1= [];
gdjs.blackjack2Code.GDthreeObjects2= [];
gdjs.blackjack2Code.GDthreeObjects3= [];
gdjs.blackjack2Code.GDfourObjects1= [];
gdjs.blackjack2Code.GDfourObjects2= [];
gdjs.blackjack2Code.GDfourObjects3= [];
gdjs.blackjack2Code.GDfiveObjects1= [];
gdjs.blackjack2Code.GDfiveObjects2= [];
gdjs.blackjack2Code.GDfiveObjects3= [];
gdjs.blackjack2Code.GDsixObjects1= [];
gdjs.blackjack2Code.GDsixObjects2= [];
gdjs.blackjack2Code.GDsixObjects3= [];
gdjs.blackjack2Code.GDsevenObjects1= [];
gdjs.blackjack2Code.GDsevenObjects2= [];
gdjs.blackjack2Code.GDsevenObjects3= [];
gdjs.blackjack2Code.GDeightObjects1= [];
gdjs.blackjack2Code.GDeightObjects2= [];
gdjs.blackjack2Code.GDeightObjects3= [];
gdjs.blackjack2Code.GDnineObjects1= [];
gdjs.blackjack2Code.GDnineObjects2= [];
gdjs.blackjack2Code.GDnineObjects3= [];
gdjs.blackjack2Code.GDtenObjects1= [];
gdjs.blackjack2Code.GDtenObjects2= [];
gdjs.blackjack2Code.GDtenObjects3= [];
gdjs.blackjack2Code.GDjackObjects1= [];
gdjs.blackjack2Code.GDjackObjects2= [];
gdjs.blackjack2Code.GDjackObjects3= [];
gdjs.blackjack2Code.GDQueenObjects1= [];
gdjs.blackjack2Code.GDQueenObjects2= [];
gdjs.blackjack2Code.GDQueenObjects3= [];
gdjs.blackjack2Code.GDKingObjects1= [];
gdjs.blackjack2Code.GDKingObjects2= [];
gdjs.blackjack2Code.GDKingObjects3= [];


gdjs.blackjack2Code.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(2)) < 17;
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(2).add(gdjs.random(9) + 1);
}}

}


};gdjs.blackjack2Code.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(2)) < 17;
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(2).add(gdjs.random(9) + 1);
}
{ //Subevents
gdjs.blackjack2Code.eventsList0(runtimeScene);} //End of subevents
}

}


};gdjs.blackjack2Code.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(2)) < 17;
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(2).add(gdjs.random(9) + 1);
}
{ //Subevents
gdjs.blackjack2Code.eventsList1(runtimeScene);} //End of subevents
}

}


};gdjs.blackjack2Code.eventsList3 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(4)) > gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(2));
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(2)) > 21;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("cardValue"), gdjs.blackjack2Code.GDcardValueObjects2);
{for(var i = 0, len = gdjs.blackjack2Code.GDcardValueObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDcardValueObjects2[i].getBehavior("Text").setText("You Win!");
}
}{runtimeScene.getGame().getVariables().getFromIndex(4).add(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(5)) * 2);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
{let isConditionTrue_2 = false;
isConditionTrue_2 = false;
isConditionTrue_2 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(4)) <= gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(2));
if (isConditionTrue_2) {
isConditionTrue_2 = false;
isConditionTrue_2 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(2)) <= 21;
}
isConditionTrue_1 = isConditionTrue_2;
}
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("cardValue"), gdjs.blackjack2Code.GDcardValueObjects1);
{for(var i = 0, len = gdjs.blackjack2Code.GDcardValueObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDcardValueObjects1[i].getBehavior("Text").setText("You Lose!");
}
}}

}


};gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDoneObjects2Objects = Hashtable.newFrom({"one": gdjs.blackjack2Code.GDoneObjects2});
gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDtwoObjects2Objects = Hashtable.newFrom({"two": gdjs.blackjack2Code.GDtwoObjects2});
gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDthreeObjects2Objects = Hashtable.newFrom({"three": gdjs.blackjack2Code.GDthreeObjects2});
gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDfourObjects2Objects = Hashtable.newFrom({"four": gdjs.blackjack2Code.GDfourObjects2});
gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDfiveObjects2Objects = Hashtable.newFrom({"five": gdjs.blackjack2Code.GDfiveObjects2});
gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDsixObjects2Objects = Hashtable.newFrom({"six": gdjs.blackjack2Code.GDsixObjects2});
gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDsevenObjects2Objects = Hashtable.newFrom({"seven": gdjs.blackjack2Code.GDsevenObjects2});
gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDeightObjects2Objects = Hashtable.newFrom({"eight": gdjs.blackjack2Code.GDeightObjects2});
gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDnineObjects2Objects = Hashtable.newFrom({"nine": gdjs.blackjack2Code.GDnineObjects2});
gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDtenObjects1Objects = Hashtable.newFrom({"ten": gdjs.blackjack2Code.GDtenObjects1});
gdjs.blackjack2Code.eventsList4 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)) == 1;
if (isConditionTrue_0) {
gdjs.blackjack2Code.GDoneObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDoneObjects2Objects, 96 + 355 * gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), 482, "");
}{for(var i = 0, len = gdjs.blackjack2Code.GDoneObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDoneObjects2[i].getBehavior("Resizable").setSize(317, 450);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)) == 2;
if (isConditionTrue_0) {
gdjs.blackjack2Code.GDtwoObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDtwoObjects2Objects, 96 + 355 * gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), 482, "");
}{for(var i = 0, len = gdjs.blackjack2Code.GDtwoObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDtwoObjects2[i].getBehavior("Resizable").setSize(317, 450);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)) == 3;
if (isConditionTrue_0) {
gdjs.blackjack2Code.GDthreeObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDthreeObjects2Objects, 96 + 355 * gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), 482, "");
}{for(var i = 0, len = gdjs.blackjack2Code.GDthreeObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDthreeObjects2[i].getBehavior("Resizable").setSize(317, 450);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)) == 4;
if (isConditionTrue_0) {
gdjs.blackjack2Code.GDfourObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDfourObjects2Objects, 96 + 355 * gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), 482, "");
}{for(var i = 0, len = gdjs.blackjack2Code.GDfourObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDfourObjects2[i].getBehavior("Resizable").setSize(317, 450);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)) == 5;
if (isConditionTrue_0) {
gdjs.blackjack2Code.GDfiveObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDfiveObjects2Objects, 96 + 355 * gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), 482, "");
}{for(var i = 0, len = gdjs.blackjack2Code.GDfiveObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDfiveObjects2[i].getBehavior("Resizable").setSize(317, 450);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)) == 6;
if (isConditionTrue_0) {
gdjs.blackjack2Code.GDsixObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDsixObjects2Objects, 96 + 355 * gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), 482, "");
}{for(var i = 0, len = gdjs.blackjack2Code.GDsixObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDsixObjects2[i].getBehavior("Resizable").setSize(317, 450);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)) == 7;
if (isConditionTrue_0) {
gdjs.blackjack2Code.GDsevenObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDsevenObjects2Objects, 96 + 355 * gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), 482, "");
}{for(var i = 0, len = gdjs.blackjack2Code.GDsevenObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDsevenObjects2[i].getBehavior("Resizable").setSize(317, 450);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)) == 8;
if (isConditionTrue_0) {
gdjs.blackjack2Code.GDeightObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDeightObjects2Objects, 96 + 355 * gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), 482, "");
}{for(var i = 0, len = gdjs.blackjack2Code.GDeightObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDeightObjects2[i].getBehavior("Resizable").setSize(317, 450);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)) == 9;
if (isConditionTrue_0) {
gdjs.blackjack2Code.GDnineObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDnineObjects2Objects, 96 + 355 * gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), 482, "");
}{for(var i = 0, len = gdjs.blackjack2Code.GDnineObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDnineObjects2[i].getBehavior("Resizable").setSize(317, 450);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)) == 10;
if (isConditionTrue_0) {
gdjs.blackjack2Code.GDtenObjects1.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.blackjack2Code.mapOfGDgdjs_9546blackjack2Code_9546GDtenObjects1Objects, 96 + 355 * gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), 482, "");
}{for(var i = 0, len = gdjs.blackjack2Code.GDtenObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDtenObjects1[i].getBehavior("Resizable").setSize(317, 450);
}
}}

}


};gdjs.blackjack2Code.asyncCallback8715708 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.blackjack2Code.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("bettingBox"), gdjs.blackjack2Code.GDbettingBoxObjects2);

{for(var i = 0, len = gdjs.blackjack2Code.GDbettingBoxObjects2.length ;i < len;++i) {
    gdjs.blackjack2Code.GDbettingBoxObjects2[i].setFillColor("255;255;255");
}
}gdjs.blackjack2Code.localVariables.length = 0;
}
gdjs.blackjack2Code.eventsList5 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.blackjack2Code.localVariables);
for (const obj of gdjs.blackjack2Code.GDbettingBoxObjects1) asyncObjectsList.addObject("bettingBox", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.3), (runtimeScene) => (gdjs.blackjack2Code.asyncCallback8715708(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.blackjack2Code.eventsList6 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("again"), gdjs.blackjack2Code.GDagainObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.blackjack2Code.GDagainObjects1.length;i<l;++i) {
    if ( gdjs.blackjack2Code.GDagainObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.blackjack2Code.GDagainObjects1[k] = gdjs.blackjack2Code.GDagainObjects1[i];
        ++k;
    }
}
gdjs.blackjack2Code.GDagainObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "blackjack2", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Back"), gdjs.blackjack2Code.GDBackObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.blackjack2Code.GDBackObjects1.length;i<l;++i) {
    if ( gdjs.blackjack2Code.GDBackObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.blackjack2Code.GDBackObjects1[k] = gdjs.blackjack2Code.GDBackObjects1[i];
        ++k;
    }
}
gdjs.blackjack2Code.GDBackObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.popScene(runtimeScene);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(2).add(gdjs.random(9) + 1);
}{runtimeScene.getScene().getVariables().getFromIndex(2).add(gdjs.random(9) + 1);
}
{ //Subevents
gdjs.blackjack2Code.eventsList2(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("stand"), gdjs.blackjack2Code.GDstandObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.blackjack2Code.GDstandObjects1.length;i<l;++i) {
    if ( gdjs.blackjack2Code.GDstandObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.blackjack2Code.GDstandObjects1[k] = gdjs.blackjack2Code.GDstandObjects1[i];
        ++k;
    }
}
gdjs.blackjack2Code.GDstandObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Hit"), gdjs.blackjack2Code.GDHitObjects1);
gdjs.copyArray(runtimeScene.getObjects("again"), gdjs.blackjack2Code.GDagainObjects1);
gdjs.copyArray(runtimeScene.getObjects("botCardValue"), gdjs.blackjack2Code.GDbotCardValueObjects1);
/* Reuse gdjs.blackjack2Code.GDstandObjects1 */
{gdjs.evtTools.sound.playSound(runtimeScene, "Pen Clicking .mp3", false, 100, 1);
}{for(var i = 0, len = gdjs.blackjack2Code.GDHitObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDHitObjects1[i].deleteFromScene(runtimeScene);
}
}{for(var i = 0, len = gdjs.blackjack2Code.GDstandObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDstandObjects1[i].deleteFromScene(runtimeScene);
}
}{for(var i = 0, len = gdjs.blackjack2Code.GDbotCardValueObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDbotCardValueObjects1[i].getBehavior("Text").setText("Bot Card Value: " + gdjs.evtTools.common.toString(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(2))));
}
}{for(var i = 0, len = gdjs.blackjack2Code.GDagainObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDagainObjects1[i].setPosition(1252,32);
}
}
{ //Subevents
gdjs.blackjack2Code.eventsList3(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Hit"), gdjs.blackjack2Code.GDHitObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.blackjack2Code.GDHitObjects1.length;i<l;++i) {
    if ( gdjs.blackjack2Code.GDHitObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.blackjack2Code.GDHitObjects1[k] = gdjs.blackjack2Code.GDHitObjects1[i];
        ++k;
    }
}
gdjs.blackjack2Code.GDHitObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)) <= 4;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(5)) == 0;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)) >= 0;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(4)) >= gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(5));
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(11793420);
}
}
}
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("again"), gdjs.blackjack2Code.GDagainObjects1);
gdjs.copyArray(runtimeScene.getObjects("cardValue"), gdjs.blackjack2Code.GDcardValueObjects1);
gdjs.copyArray(runtimeScene.getObjects("stand"), gdjs.blackjack2Code.GDstandObjects1);
{runtimeScene.getScene().getVariables().getFromIndex(1).setNumber(gdjs.random(9) + 1);
}{gdjs.evtTools.sound.playSound(runtimeScene, "Pen Clicking .mp3", false, 100, 1);
}{runtimeScene.getScene().getVariables().getFromIndex(0).add(1);
}{runtimeScene.getScene().getVariables().getFromIndex(4).add(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(1)));
}{for(var i = 0, len = gdjs.blackjack2Code.GDcardValueObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDcardValueObjects1[i].getBehavior("Text").setText("Card Value: " + gdjs.evtTools.common.toString(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(4))));
}
}{for(var i = 0, len = gdjs.blackjack2Code.GDagainObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDagainObjects1[i].setPosition(9999,9999);
}
}{for(var i = 0, len = gdjs.blackjack2Code.GDstandObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDstandObjects1[i].setPosition(388,32);
}
}
{ //Subevents
gdjs.blackjack2Code.eventsList4(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(4)) > 21;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(7952948);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Hit"), gdjs.blackjack2Code.GDHitObjects1);
gdjs.copyArray(runtimeScene.getObjects("again"), gdjs.blackjack2Code.GDagainObjects1);
gdjs.copyArray(runtimeScene.getObjects("cardValue"), gdjs.blackjack2Code.GDcardValueObjects1);
gdjs.copyArray(runtimeScene.getObjects("stand"), gdjs.blackjack2Code.GDstandObjects1);
{gdjs.evtTools.sound.playSound(runtimeScene, "Wooden Bat Hits Baseball Run.mp3", false, 100, 1);
}{for(var i = 0, len = gdjs.blackjack2Code.GDcardValueObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDcardValueObjects1[i].getBehavior("Text").setText("Bust");
}
}{runtimeScene.getScene().getVariables().getFromIndex(0).setNumber(5);
}{for(var i = 0, len = gdjs.blackjack2Code.GDstandObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDstandObjects1[i].deleteFromScene(runtimeScene);
}
}{for(var i = 0, len = gdjs.blackjack2Code.GDHitObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDHitObjects1[i].deleteFromScene(runtimeScene);
}
}{for(var i = 0, len = gdjs.blackjack2Code.GDagainObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDagainObjects1[i].setPosition(1248,32);
}
}}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("bettingBox"), gdjs.blackjack2Code.GDbettingBoxObjects1);
gdjs.copyArray(runtimeScene.getObjects("haveMoney"), gdjs.blackjack2Code.GDhaveMoneyObjects1);
{runtimeScene.getScene().getVariables().getFromIndex(5).setNumber(gdjs.evtTools.common.toNumber((( gdjs.blackjack2Code.GDbettingBoxObjects1.length === 0 ) ? "" :gdjs.blackjack2Code.GDbettingBoxObjects1[0].getText())));
}{for(var i = 0, len = gdjs.blackjack2Code.GDhaveMoneyObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDhaveMoneyObjects1[i].getBehavior("Text").setText("You have $" + gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(4)));
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Hit"), gdjs.blackjack2Code.GDHitObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.blackjack2Code.GDHitObjects1.length;i<l;++i) {
    if ( gdjs.blackjack2Code.GDHitObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.blackjack2Code.GDHitObjects1[k] = gdjs.blackjack2Code.GDHitObjects1[i];
        ++k;
    }
}
gdjs.blackjack2Code.GDHitObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)) < 0;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(5)) <= 0;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(4)) < gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(5));
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("bettingBox"), gdjs.blackjack2Code.GDbettingBoxObjects1);
{for(var i = 0, len = gdjs.blackjack2Code.GDbettingBoxObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDbettingBoxObjects1[i].setFillColor("228;30;30");
}
}{gdjs.evtTools.sound.playSound(runtimeScene, "Wooden Bat Hits Baseball Run.mp3", false, 100, 1);
}
{ //Subevents
gdjs.blackjack2Code.eventsList5(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(5)) > 100000;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("bettingBox"), gdjs.blackjack2Code.GDbettingBoxObjects1);
{for(var i = 0, len = gdjs.blackjack2Code.GDbettingBoxObjects1.length ;i < len;++i) {
    gdjs.blackjack2Code.GDbettingBoxObjects1[i].getBehavior("Text").setText("100000");
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)) >= 0;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(14404916);
}
}
if (isConditionTrue_0) {
{runtimeScene.getGame().getVariables().getFromIndex(4).sub(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(5)));
}{gdjs.evtTools.firebaseTools.database.updateField("/" + gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(13)), "money", gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(4)), gdjs.VariablesContainer.badVariable);
}}

}


};

gdjs.blackjack2Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.blackjack2Code.GDbgObjects1.length = 0;
gdjs.blackjack2Code.GDbgObjects2.length = 0;
gdjs.blackjack2Code.GDbgObjects3.length = 0;
gdjs.blackjack2Code.GDplayButtonObjects1.length = 0;
gdjs.blackjack2Code.GDplayButtonObjects2.length = 0;
gdjs.blackjack2Code.GDplayButtonObjects3.length = 0;
gdjs.blackjack2Code.GDgoalObjects1.length = 0;
gdjs.blackjack2Code.GDgoalObjects2.length = 0;
gdjs.blackjack2Code.GDgoalObjects3.length = 0;
gdjs.blackjack2Code.GDbackButtonObjects1.length = 0;
gdjs.blackjack2Code.GDbackButtonObjects2.length = 0;
gdjs.blackjack2Code.GDbackButtonObjects3.length = 0;
gdjs.blackjack2Code.GDcardValueObjects1.length = 0;
gdjs.blackjack2Code.GDcardValueObjects2.length = 0;
gdjs.blackjack2Code.GDcardValueObjects3.length = 0;
gdjs.blackjack2Code.GDplayAgainObjects1.length = 0;
gdjs.blackjack2Code.GDplayAgainObjects2.length = 0;
gdjs.blackjack2Code.GDplayAgainObjects3.length = 0;
gdjs.blackjack2Code.GDWithdrawlObjects1.length = 0;
gdjs.blackjack2Code.GDWithdrawlObjects2.length = 0;
gdjs.blackjack2Code.GDWithdrawlObjects3.length = 0;
gdjs.blackjack2Code.GDbotCardValueObjects1.length = 0;
gdjs.blackjack2Code.GDbotCardValueObjects2.length = 0;
gdjs.blackjack2Code.GDbotCardValueObjects3.length = 0;
gdjs.blackjack2Code.GDbettingBoxObjects1.length = 0;
gdjs.blackjack2Code.GDbettingBoxObjects2.length = 0;
gdjs.blackjack2Code.GDbettingBoxObjects3.length = 0;
gdjs.blackjack2Code.GDhaveMoneyObjects1.length = 0;
gdjs.blackjack2Code.GDhaveMoneyObjects2.length = 0;
gdjs.blackjack2Code.GDhaveMoneyObjects3.length = 0;
gdjs.blackjack2Code.GDBackObjects1.length = 0;
gdjs.blackjack2Code.GDBackObjects2.length = 0;
gdjs.blackjack2Code.GDBackObjects3.length = 0;
gdjs.blackjack2Code.GDagainObjects1.length = 0;
gdjs.blackjack2Code.GDagainObjects2.length = 0;
gdjs.blackjack2Code.GDagainObjects3.length = 0;
gdjs.blackjack2Code.GDHitObjects1.length = 0;
gdjs.blackjack2Code.GDHitObjects2.length = 0;
gdjs.blackjack2Code.GDHitObjects3.length = 0;
gdjs.blackjack2Code.GDstandObjects1.length = 0;
gdjs.blackjack2Code.GDstandObjects2.length = 0;
gdjs.blackjack2Code.GDstandObjects3.length = 0;
gdjs.blackjack2Code.GDoneObjects1.length = 0;
gdjs.blackjack2Code.GDoneObjects2.length = 0;
gdjs.blackjack2Code.GDoneObjects3.length = 0;
gdjs.blackjack2Code.GDtwoObjects1.length = 0;
gdjs.blackjack2Code.GDtwoObjects2.length = 0;
gdjs.blackjack2Code.GDtwoObjects3.length = 0;
gdjs.blackjack2Code.GDthreeObjects1.length = 0;
gdjs.blackjack2Code.GDthreeObjects2.length = 0;
gdjs.blackjack2Code.GDthreeObjects3.length = 0;
gdjs.blackjack2Code.GDfourObjects1.length = 0;
gdjs.blackjack2Code.GDfourObjects2.length = 0;
gdjs.blackjack2Code.GDfourObjects3.length = 0;
gdjs.blackjack2Code.GDfiveObjects1.length = 0;
gdjs.blackjack2Code.GDfiveObjects2.length = 0;
gdjs.blackjack2Code.GDfiveObjects3.length = 0;
gdjs.blackjack2Code.GDsixObjects1.length = 0;
gdjs.blackjack2Code.GDsixObjects2.length = 0;
gdjs.blackjack2Code.GDsixObjects3.length = 0;
gdjs.blackjack2Code.GDsevenObjects1.length = 0;
gdjs.blackjack2Code.GDsevenObjects2.length = 0;
gdjs.blackjack2Code.GDsevenObjects3.length = 0;
gdjs.blackjack2Code.GDeightObjects1.length = 0;
gdjs.blackjack2Code.GDeightObjects2.length = 0;
gdjs.blackjack2Code.GDeightObjects3.length = 0;
gdjs.blackjack2Code.GDnineObjects1.length = 0;
gdjs.blackjack2Code.GDnineObjects2.length = 0;
gdjs.blackjack2Code.GDnineObjects3.length = 0;
gdjs.blackjack2Code.GDtenObjects1.length = 0;
gdjs.blackjack2Code.GDtenObjects2.length = 0;
gdjs.blackjack2Code.GDtenObjects3.length = 0;
gdjs.blackjack2Code.GDjackObjects1.length = 0;
gdjs.blackjack2Code.GDjackObjects2.length = 0;
gdjs.blackjack2Code.GDjackObjects3.length = 0;
gdjs.blackjack2Code.GDQueenObjects1.length = 0;
gdjs.blackjack2Code.GDQueenObjects2.length = 0;
gdjs.blackjack2Code.GDQueenObjects3.length = 0;
gdjs.blackjack2Code.GDKingObjects1.length = 0;
gdjs.blackjack2Code.GDKingObjects2.length = 0;
gdjs.blackjack2Code.GDKingObjects3.length = 0;

gdjs.blackjack2Code.eventsList6(runtimeScene);
gdjs.blackjack2Code.GDbgObjects1.length = 0;
gdjs.blackjack2Code.GDbgObjects2.length = 0;
gdjs.blackjack2Code.GDbgObjects3.length = 0;
gdjs.blackjack2Code.GDplayButtonObjects1.length = 0;
gdjs.blackjack2Code.GDplayButtonObjects2.length = 0;
gdjs.blackjack2Code.GDplayButtonObjects3.length = 0;
gdjs.blackjack2Code.GDgoalObjects1.length = 0;
gdjs.blackjack2Code.GDgoalObjects2.length = 0;
gdjs.blackjack2Code.GDgoalObjects3.length = 0;
gdjs.blackjack2Code.GDbackButtonObjects1.length = 0;
gdjs.blackjack2Code.GDbackButtonObjects2.length = 0;
gdjs.blackjack2Code.GDbackButtonObjects3.length = 0;
gdjs.blackjack2Code.GDcardValueObjects1.length = 0;
gdjs.blackjack2Code.GDcardValueObjects2.length = 0;
gdjs.blackjack2Code.GDcardValueObjects3.length = 0;
gdjs.blackjack2Code.GDplayAgainObjects1.length = 0;
gdjs.blackjack2Code.GDplayAgainObjects2.length = 0;
gdjs.blackjack2Code.GDplayAgainObjects3.length = 0;
gdjs.blackjack2Code.GDWithdrawlObjects1.length = 0;
gdjs.blackjack2Code.GDWithdrawlObjects2.length = 0;
gdjs.blackjack2Code.GDWithdrawlObjects3.length = 0;
gdjs.blackjack2Code.GDbotCardValueObjects1.length = 0;
gdjs.blackjack2Code.GDbotCardValueObjects2.length = 0;
gdjs.blackjack2Code.GDbotCardValueObjects3.length = 0;
gdjs.blackjack2Code.GDbettingBoxObjects1.length = 0;
gdjs.blackjack2Code.GDbettingBoxObjects2.length = 0;
gdjs.blackjack2Code.GDbettingBoxObjects3.length = 0;
gdjs.blackjack2Code.GDhaveMoneyObjects1.length = 0;
gdjs.blackjack2Code.GDhaveMoneyObjects2.length = 0;
gdjs.blackjack2Code.GDhaveMoneyObjects3.length = 0;
gdjs.blackjack2Code.GDBackObjects1.length = 0;
gdjs.blackjack2Code.GDBackObjects2.length = 0;
gdjs.blackjack2Code.GDBackObjects3.length = 0;
gdjs.blackjack2Code.GDagainObjects1.length = 0;
gdjs.blackjack2Code.GDagainObjects2.length = 0;
gdjs.blackjack2Code.GDagainObjects3.length = 0;
gdjs.blackjack2Code.GDHitObjects1.length = 0;
gdjs.blackjack2Code.GDHitObjects2.length = 0;
gdjs.blackjack2Code.GDHitObjects3.length = 0;
gdjs.blackjack2Code.GDstandObjects1.length = 0;
gdjs.blackjack2Code.GDstandObjects2.length = 0;
gdjs.blackjack2Code.GDstandObjects3.length = 0;
gdjs.blackjack2Code.GDoneObjects1.length = 0;
gdjs.blackjack2Code.GDoneObjects2.length = 0;
gdjs.blackjack2Code.GDoneObjects3.length = 0;
gdjs.blackjack2Code.GDtwoObjects1.length = 0;
gdjs.blackjack2Code.GDtwoObjects2.length = 0;
gdjs.blackjack2Code.GDtwoObjects3.length = 0;
gdjs.blackjack2Code.GDthreeObjects1.length = 0;
gdjs.blackjack2Code.GDthreeObjects2.length = 0;
gdjs.blackjack2Code.GDthreeObjects3.length = 0;
gdjs.blackjack2Code.GDfourObjects1.length = 0;
gdjs.blackjack2Code.GDfourObjects2.length = 0;
gdjs.blackjack2Code.GDfourObjects3.length = 0;
gdjs.blackjack2Code.GDfiveObjects1.length = 0;
gdjs.blackjack2Code.GDfiveObjects2.length = 0;
gdjs.blackjack2Code.GDfiveObjects3.length = 0;
gdjs.blackjack2Code.GDsixObjects1.length = 0;
gdjs.blackjack2Code.GDsixObjects2.length = 0;
gdjs.blackjack2Code.GDsixObjects3.length = 0;
gdjs.blackjack2Code.GDsevenObjects1.length = 0;
gdjs.blackjack2Code.GDsevenObjects2.length = 0;
gdjs.blackjack2Code.GDsevenObjects3.length = 0;
gdjs.blackjack2Code.GDeightObjects1.length = 0;
gdjs.blackjack2Code.GDeightObjects2.length = 0;
gdjs.blackjack2Code.GDeightObjects3.length = 0;
gdjs.blackjack2Code.GDnineObjects1.length = 0;
gdjs.blackjack2Code.GDnineObjects2.length = 0;
gdjs.blackjack2Code.GDnineObjects3.length = 0;
gdjs.blackjack2Code.GDtenObjects1.length = 0;
gdjs.blackjack2Code.GDtenObjects2.length = 0;
gdjs.blackjack2Code.GDtenObjects3.length = 0;
gdjs.blackjack2Code.GDjackObjects1.length = 0;
gdjs.blackjack2Code.GDjackObjects2.length = 0;
gdjs.blackjack2Code.GDjackObjects3.length = 0;
gdjs.blackjack2Code.GDQueenObjects1.length = 0;
gdjs.blackjack2Code.GDQueenObjects2.length = 0;
gdjs.blackjack2Code.GDQueenObjects3.length = 0;
gdjs.blackjack2Code.GDKingObjects1.length = 0;
gdjs.blackjack2Code.GDKingObjects2.length = 0;
gdjs.blackjack2Code.GDKingObjects3.length = 0;


return;

}

gdjs['blackjack2Code'] = gdjs.blackjack2Code;
