#target "illustrator"

LOG = 0;
//initconsole();

/*------------------------------------------------------
    main
-------------------------------------------------------*/

main();

function main() {

  folderObj = Folder.selectDialog("フォルダを選択してください");
  if (!folderObj) return;

  var fList = getAllFile(folderObj, [".emf", ".wmf"]);
  if(fList.length < 1) return;

  var errList = [];
  for(var i=0;i<fList.length;i++){
    fileObj = new File(fList[i].fsName);
    try{ open(fileObj); }
    catch(e){ errList.push(fList[i].fsName);continue; }
  }

  exportAsPng();

  if(errList.length>0) {
    msg = "";
    for(var m=0;m<errList.length;m++) msg+=errList[m]+"\r\n";
    alert(errList.length-1 +　"件ファイルエラーが発生しました。\r\n\r\n"+ msg);
  }

  alert("done");

  return;

}

function exportAsPng() {

  if( !app.documents || app.documents.length < 1 ) return;

  var targetFile;
  while( app.documents.length > 0 ) {
    doc = app.activeDocument;
    fileName = getOnlyFileName(doc.name);
    imgPath = doc.fullName.parent.fsName.toString().replace(/\\/g, '/');
    targetFile = new File( decodeURI(imgPath+"\/"+fileName+".png") );
    pngExportOpts = getPNGOptions();
    doc.exportFile(targetFile, ExportType.PNG24, pngExportOpts);
    doc.close(SaveOptions.DONOTSAVECHANGES);
  }

}

function getOnlyFileName(target){
  var pattern = /(.+)(\.[^.]+$)/;
  return target.match(pattern)[1];
}

function getPNGOptions() {
  var pngExportOpts = new ExportOptionsPNG24();
  pngExportOpts.antiAliasing = true;
  pngExportOpts.artBoardClipping = false;
  pngExportOpts.saveAsHTML = false;
  pngExportOpts.transparency = true;
  return pngExportOpts;
}

function getAllFile(folderObj, ext){

  if (!folderObj) return; // キャンセルされたら処理しない
  var list = [];
  getFolder(folderObj);
  return list;

  // フォルダ内の一覧を取得
  function getFolder(folderObj){
    var fileList = folderObj.getFiles();
    for (var i=0; i<fileList.length; i++){
      if (fileList[i].getFiles) {
        getFolder(fileList[i]); // サブフォルダがある限り繰り返す
      }else{
        var f = fileList[i].name.toLowerCase();
        for(var j=0; j<ext.length; j++){
          if (f.indexOf(ext[j]) > -1) list.push(fileList[i]);
        }
      }
    }
  }

}

function initconsole() {
  if (LOG) {
    var bt = new BridgeTalk();
    bt.target = 'estoolkit-4.0';
    bt.body = function() { app.clc(); }.toSource() + "()";
    bt.send(5);
  }
}

function conn(whats) {
  if (!LOG) return
  try { $.writeln(whats); }
  catch (e) {　conn("[FNC] faild conn", 1);　}
}