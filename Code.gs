function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('NLP Menu')
  .addItem('칼럼 숨기기(발표모드)', 'hideWorkhours')
  .addItem('칼럼 나타내기 (작성모드)', 'unHideWorkhours')
  .addSeparator() //구분자
  //.addSubMenu(ui.createMenu('Sub-menu')
    //          .addItem('Second item', 'menuItem2'))
  .addToUi();
}

// sheetname과 headername으로 해당 헤더의 데이터 배열을 반환한다 (헤더는 첫번재열로 생각
function getValuesByHeader(sheetname, headername) {
  var values = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetname).getDataRange().getValues();
  var index = values[0].indexOf(headername);
  values.splice(0, 1);
  var values = values.map(function(val){
    return val[index];
  }).filter(Boolean);
  return values
}

function hideWorkhours() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var members = getValuesByHeader('configure','팀원');
  members.forEach(function(member) {
    if(ss.getSheetByName(member)) {
      ss.getSheetByName(member).hideColumns(7, 10);  
    }    
  }) 
}

function unHideWorkhours() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var members = getValuesByHeader('configure','팀원');
  members.forEach(function(member){
    var sheet = ss.getSheetByName(member);
    if(sheet){
      sheet.unhideColumn(sheet.getRange("G1:P1"));
    }    
  });
}