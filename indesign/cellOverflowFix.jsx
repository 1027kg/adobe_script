#target "indesign"

FAST = 1;

/*------------------------------------------------------
    main
-------------------------------------------------------*/

var selectObj = app.activeDocument.selection;
var startTime = new Date();

if( selectObj[0].constructor.name != "Cell") exit();
var cellObj = selectObj[0].cells;
if( cellObj.length < 1 )exit();

if (FAST) {
  app.doScript(main, ScriptLanguage.JAVASCRIPT, [], UndoModes.FAST_ENTIRE_SCRIPT);
} else {
  main();
}

function main() {

  var limitTsume = 51;
  var limitHorizon = 51;
  var iremono = null;
  var iremonoPara = null;

  try{

    cellLen = cellObj.length;

    for (var i = 0; i < cellLen; i++) {

      iremono = null;
      iremonoPara = null;
      iremono = cellObj[i].texts[0];

      if( iremono.contents.length == 0 ) continue;

      //詰めと水平値をリセット
      iremono.tsume = 0;
      iremonoPara = iremono.paragraphs[0];
      iremonoPara.horizontalScale = 100;

      //段落2行かセル内オーバーフロー
      if ( iremonoPara.lines.length == 1 && !cellObj[i].overflows ) continue;

      //文字詰め
      for (var ts = 0; ts < limitTsume; ts+=1) {
        iremono.tsume = ts/100;
        if ( iremonoPara.lines.length == 1 && !cellObj[i].overflows ) break;
      }

      //水平比率
      for (var cho = 0; cho < limitHorizon; cho+=1) {
        iremonoPara.horizontalScale = 100 - cho;
        if ( iremonoPara.lines.length == 1 && !cellObj[i].overflows ) break;
      }

    }

  } catch (e) {
    alert( (i+1) + " 個目のセルは問題があったため処理していません。\n\n" + cellObj[i].contents);
  }

  app.toolBoxTools.currentTool = UITools.SELECTION_TOOL;

}