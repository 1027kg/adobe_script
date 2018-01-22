var tmpLayer;
var nowLayer;

app.doScript(main, ScriptLanguage.JAVASCRIPT, [], UndoModes.FAST_ENTIRE_SCRIPT);

function main() {

  var imgCnt = 0;
  var nowLayer = app.activeDocument.activeLayer;
  myPage = app.activeDocument.pages;

  try{
    addSwatch("imgPath",0,100,50,0);
    addSwatch("imgPathTxt",0,0,0,0);
  }catch(e){

  }

  tmpLayer = app.activeDocument.layers.add();
  tmpLayer.name = "labeler_" + zeroPadding( Math.floor(Math.random()*30), 2 );

  var imgCnt = 0;
  var graphArry = [];
  for(var k=0; k < myPage.length; k++){

    grS = myPage[k].allGraphics;

    for(var l=0; l < grS.length; l++){

      if( !grS[l].itemLayer ) continue;
      if( grS[l].itemLayer.name != nowLayer.name ) continue;

      linkName = grS[l].itemLink.name;
      if( /.psd/.test(linkName) == false ) continue;

      vPos = grS[l].visibleBounds;

      var pathFrm = myPage[k].textFrames.add({
        geometricBounds: [ vPos[0], vPos[1], vPos[0]+24, vPos[1]+90 ],
        contents: linkName,
        itemLayer: tmpLayer
      });

      pathFrm.paragraphs[0].appliedFont = app.fonts.item("小塚ゴシック Pro\tB");
      pathFrm.paragraphs[0].pointSize = "9Q";
      pathFrm.paragraphs[0].fillColor = "imgPathTxt";
      pathFrm.fillColor = "imgPath";
      pathFrm.textFramePreferences.insetSpacing = [1,1,1,1];
      pathFrm.fit(FitOptions.FRAME_TO_CONTENT );
      pathFrm.transparencySettings.blendingSettings.opacity = 65;

    }
  }

}

function zeroPadding(num, len) {
  return ('0000000000' + num).slice(-len);
}