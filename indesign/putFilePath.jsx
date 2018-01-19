FAST = 1;

/*------------------------------------------------------
    main
-------------------------------------------------------*/

var tmpLayer;
var nowLayer;

if (FAST) {
  app.doScript(main, ScriptLanguage.JAVASCRIPT, [], UndoModes.FAST_ENTIRE_SCRIPT);
} else {
  main();
}

function main() {

  try{
    app.activeDocument.colors.add ({name:"imgLabel",colorValue:[0,100,50,0]});
    app.activeDocument.colors.add ({name:"imgLabelText",colorValue:[0,0,0,0]});
  }catch(e){

  }

  nowLayer = app.activeDocument.activeLayer;
  tmpLayer = app.activeDocument.layers.add();
  tmpLayer.name = "filePath_000";

  var pages = app.activeDocument.pages;

  for(var i=0; i < pages.length; i++)
  {

    var thisPage = pages[i];
    var thisGraphics = thisPage.allGraphics;

    for(var j=0; j < thisGraphics.length; j++)
    {

      if( thisGraphics[j].itemLayer.name != nowLayer.name ) continue;

      linkName = thisGraphics[j].itemLink.name;
      if( linkName.indexOf(".psd") == -1 ) continue;

      getPos = thisGraphics[j].visibleBounds;

      var filepathFrm = thisPage.textFrames.add({
        geometricBounds: [ getPos[0], getPos[1], getPos[0]+24, getPos[1]+90 ],
        contents: linkName,
        itemLayer: tmpLayer
      });

      filepathFrm.paragraphs[0].appliedFont = app.fonts.item("小塚ゴシック Pro\tB");
      filepathFrm.paragraphs[0].pointSize = "9Q";
      filepathFrm.paragraphs[0].fillColor = "imgLabelText";
      filepathFrm.fillColor = "imgLabel";
      filepathFrm.textFramePreferences.insetSpacing = [ 1, 1, 1, 1 ];
      filepathFrm.fit(FitOptions.FRAME_TO_CONTENT );

    }

  }

  alert("done");

}