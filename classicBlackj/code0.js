gdjs.loginCode = {};
gdjs.loginCode.localVariables = [];
gdjs.loginCode.GDemailObjects1= [];
gdjs.loginCode.GDemailObjects2= [];
gdjs.loginCode.GDpasswordObjects1= [];
gdjs.loginCode.GDpasswordObjects2= [];
gdjs.loginCode.GDcreateObjects1= [];
gdjs.loginCode.GDcreateObjects2= [];
gdjs.loginCode.GDloginObjects1= [];
gdjs.loginCode.GDloginObjects2= [];
gdjs.loginCode.GDbgObjects1= [];
gdjs.loginCode.GDbgObjects2= [];
gdjs.loginCode.GDoneObjects1= [];
gdjs.loginCode.GDoneObjects2= [];
gdjs.loginCode.GDtwoObjects1= [];
gdjs.loginCode.GDtwoObjects2= [];
gdjs.loginCode.GDthreeObjects1= [];
gdjs.loginCode.GDthreeObjects2= [];
gdjs.loginCode.GDfourObjects1= [];
gdjs.loginCode.GDfourObjects2= [];
gdjs.loginCode.GDfiveObjects1= [];
gdjs.loginCode.GDfiveObjects2= [];
gdjs.loginCode.GDsixObjects1= [];
gdjs.loginCode.GDsixObjects2= [];
gdjs.loginCode.GDsevenObjects1= [];
gdjs.loginCode.GDsevenObjects2= [];
gdjs.loginCode.GDeightObjects1= [];
gdjs.loginCode.GDeightObjects2= [];
gdjs.loginCode.GDnineObjects1= [];
gdjs.loginCode.GDnineObjects2= [];
gdjs.loginCode.GDtenObjects1= [];
gdjs.loginCode.GDtenObjects2= [];
gdjs.loginCode.GDjackObjects1= [];
gdjs.loginCode.GDjackObjects2= [];
gdjs.loginCode.GDQueenObjects1= [];
gdjs.loginCode.GDQueenObjects2= [];
gdjs.loginCode.GDKingObjects1= [];
gdjs.loginCode.GDKingObjects2= [];


gdjs.loginCode.mapOfGDgdjs_9546loginCode_9546GDcreateObjects1Objects = Hashtable.newFrom({"create": gdjs.loginCode.GDcreateObjects1});
gdjs.loginCode.asyncCallback15810204 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.loginCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("email"), gdjs.loginCode.GDemailObjects2);

gdjs.copyArray(asyncObjectsList.getObjects("password"), gdjs.loginCode.GDpasswordObjects2);

{gdjs.evtTools.firebaseTools.auth.createAccountWithEmail((( gdjs.loginCode.GDemailObjects2.length === 0 ) ? "" :gdjs.loginCode.GDemailObjects2[0].getText()), (( gdjs.loginCode.GDpasswordObjects2.length === 0 ) ? "" :gdjs.loginCode.GDpasswordObjects2[0].getText()), gdjs.VariablesContainer.badVariable);
}{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "countryCreator", false);
}gdjs.loginCode.localVariables.length = 0;
}
gdjs.loginCode.eventsList0 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.loginCode.localVariables);
for (const obj of gdjs.loginCode.GDemailObjects1) asyncObjectsList.addObject("email", obj);
for (const obj of gdjs.loginCode.GDpasswordObjects1) asyncObjectsList.addObject("password", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.3), (runtimeScene) => (gdjs.loginCode.asyncCallback15810204(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.loginCode.mapOfGDgdjs_9546loginCode_9546GDloginObjects1Objects = Hashtable.newFrom({"login": gdjs.loginCode.GDloginObjects1});
gdjs.loginCode.eventsList1 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("create"), gdjs.loginCode.GDcreateObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.loginCode.mapOfGDgdjs_9546loginCode_9546GDcreateObjects1Objects, runtimeScene, true, false);
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("email"), gdjs.loginCode.GDemailObjects1);
gdjs.copyArray(runtimeScene.getObjects("password"), gdjs.loginCode.GDpasswordObjects1);
{gdjs.evtTools.firebaseTools.auth.signInWithEmail((( gdjs.loginCode.GDemailObjects1.length === 0 ) ? "" :gdjs.loginCode.GDemailObjects1[0].getText()), (( gdjs.loginCode.GDpasswordObjects1.length === 0 ) ? "" :gdjs.loginCode.GDpasswordObjects1[0].getText()), runtimeScene.getScene().getVariables().getFromIndex(1));
}
{ //Subevents
gdjs.loginCode.eventsList0(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("login"), gdjs.loginCode.GDloginObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.loginCode.mapOfGDgdjs_9546loginCode_9546GDloginObjects1Objects, runtimeScene, true, false);
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("email"), gdjs.loginCode.GDemailObjects1);
gdjs.copyArray(runtimeScene.getObjects("password"), gdjs.loginCode.GDpasswordObjects1);
{gdjs.evtTools.firebaseTools.auth.signInWithEmail((( gdjs.loginCode.GDemailObjects1.length === 0 ) ? "" :gdjs.loginCode.GDemailObjects1[0].getText()), (( gdjs.loginCode.GDpasswordObjects1.length === 0 ) ? "" :gdjs.loginCode.GDpasswordObjects1[0].getText()), runtimeScene.getScene().getVariables().getFromIndex(1));
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.firebaseTools.auth.isAuthenticated();
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "blackjack2", false);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "x");
if (isConditionTrue_0) {
{firebase.auth().signOut();
}}

}


};

gdjs.loginCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.loginCode.GDemailObjects1.length = 0;
gdjs.loginCode.GDemailObjects2.length = 0;
gdjs.loginCode.GDpasswordObjects1.length = 0;
gdjs.loginCode.GDpasswordObjects2.length = 0;
gdjs.loginCode.GDcreateObjects1.length = 0;
gdjs.loginCode.GDcreateObjects2.length = 0;
gdjs.loginCode.GDloginObjects1.length = 0;
gdjs.loginCode.GDloginObjects2.length = 0;
gdjs.loginCode.GDbgObjects1.length = 0;
gdjs.loginCode.GDbgObjects2.length = 0;
gdjs.loginCode.GDoneObjects1.length = 0;
gdjs.loginCode.GDoneObjects2.length = 0;
gdjs.loginCode.GDtwoObjects1.length = 0;
gdjs.loginCode.GDtwoObjects2.length = 0;
gdjs.loginCode.GDthreeObjects1.length = 0;
gdjs.loginCode.GDthreeObjects2.length = 0;
gdjs.loginCode.GDfourObjects1.length = 0;
gdjs.loginCode.GDfourObjects2.length = 0;
gdjs.loginCode.GDfiveObjects1.length = 0;
gdjs.loginCode.GDfiveObjects2.length = 0;
gdjs.loginCode.GDsixObjects1.length = 0;
gdjs.loginCode.GDsixObjects2.length = 0;
gdjs.loginCode.GDsevenObjects1.length = 0;
gdjs.loginCode.GDsevenObjects2.length = 0;
gdjs.loginCode.GDeightObjects1.length = 0;
gdjs.loginCode.GDeightObjects2.length = 0;
gdjs.loginCode.GDnineObjects1.length = 0;
gdjs.loginCode.GDnineObjects2.length = 0;
gdjs.loginCode.GDtenObjects1.length = 0;
gdjs.loginCode.GDtenObjects2.length = 0;
gdjs.loginCode.GDjackObjects1.length = 0;
gdjs.loginCode.GDjackObjects2.length = 0;
gdjs.loginCode.GDQueenObjects1.length = 0;
gdjs.loginCode.GDQueenObjects2.length = 0;
gdjs.loginCode.GDKingObjects1.length = 0;
gdjs.loginCode.GDKingObjects2.length = 0;

gdjs.loginCode.eventsList1(runtimeScene);
gdjs.loginCode.GDemailObjects1.length = 0;
gdjs.loginCode.GDemailObjects2.length = 0;
gdjs.loginCode.GDpasswordObjects1.length = 0;
gdjs.loginCode.GDpasswordObjects2.length = 0;
gdjs.loginCode.GDcreateObjects1.length = 0;
gdjs.loginCode.GDcreateObjects2.length = 0;
gdjs.loginCode.GDloginObjects1.length = 0;
gdjs.loginCode.GDloginObjects2.length = 0;
gdjs.loginCode.GDbgObjects1.length = 0;
gdjs.loginCode.GDbgObjects2.length = 0;
gdjs.loginCode.GDoneObjects1.length = 0;
gdjs.loginCode.GDoneObjects2.length = 0;
gdjs.loginCode.GDtwoObjects1.length = 0;
gdjs.loginCode.GDtwoObjects2.length = 0;
gdjs.loginCode.GDthreeObjects1.length = 0;
gdjs.loginCode.GDthreeObjects2.length = 0;
gdjs.loginCode.GDfourObjects1.length = 0;
gdjs.loginCode.GDfourObjects2.length = 0;
gdjs.loginCode.GDfiveObjects1.length = 0;
gdjs.loginCode.GDfiveObjects2.length = 0;
gdjs.loginCode.GDsixObjects1.length = 0;
gdjs.loginCode.GDsixObjects2.length = 0;
gdjs.loginCode.GDsevenObjects1.length = 0;
gdjs.loginCode.GDsevenObjects2.length = 0;
gdjs.loginCode.GDeightObjects1.length = 0;
gdjs.loginCode.GDeightObjects2.length = 0;
gdjs.loginCode.GDnineObjects1.length = 0;
gdjs.loginCode.GDnineObjects2.length = 0;
gdjs.loginCode.GDtenObjects1.length = 0;
gdjs.loginCode.GDtenObjects2.length = 0;
gdjs.loginCode.GDjackObjects1.length = 0;
gdjs.loginCode.GDjackObjects2.length = 0;
gdjs.loginCode.GDQueenObjects1.length = 0;
gdjs.loginCode.GDQueenObjects2.length = 0;
gdjs.loginCode.GDKingObjects1.length = 0;
gdjs.loginCode.GDKingObjects2.length = 0;


return;

}

gdjs['loginCode'] = gdjs.loginCode;
