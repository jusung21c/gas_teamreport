function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('NLP Menu')
  .addItem('시간 숨키기', 'hideWorkhours')
  .addItem('시간 안숨키기', 'unHideWorkhours')
  .addSeparator() //구분자
  .addSubMenu(ui.createMenu('Sub-menu')
              .addItem('Second item', 'menuItem2'))
  .addToUi();
}

// row or column의 마지막 데이터 index 반환 (예: A:A, 1:1, ["A:A","1:1"])
function getLast(range) {
    var getResult = function(range) {
        if (!((range.getNumRows() > 1 && range.getNumColumns() == 1) || (range.getNumRows() == 1 && range.getNumColumns() > 1))) {
            throw new Error("Please input one row or one column.");
        }
        var v = Array.prototype.concat.apply([], range.getValues());
        var f = Array.prototype.concat.apply([], range.getFormulas());
        var i;
        for (i = v.length - 1; i >= 0; i--) {
            if (v[i] != "" || f[i] != "") break;
        }
        return i + 1;
    };
    if (Array.isArray(range)) {
        return range.map(function(e) {
            return getResult(e);
        });
    } else {
        try {
            range.getA1Notation();
        } catch (e) {
            throw new Error("Inputted value is not a range.");
        }
        return getResult(range);
    }
}

//시트 네임과 헤더 네임으로 해당 헤더의 데이터를 반환한다 (헤더는 첫번재열로 생각)
function getValuesByHeader(sheetname, headername) {
  var values = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetname).getDataRange().getValues();
  var index = values[0].indexOf(headername);
  values.splice(0, 1);
  var values = values.map(function(val){
    return val[index];
  }).filter(Boolean);
  return values
}

function test(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("이주성");
  // sheet.hideColumns(10, 7);
  var range = sheet.getRange("J1:P1");
  sheet.unhideColumn(range)
}

function hideWorkhours() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var members = getValuesByHeader('configure','팀원');
  members.forEach(function(member) {
    if(ss.getSheetByName(member)) {
      ss.getSheetByName(member).hideColumns(10, 7);  
    }    
  }) 
}

function unHideWorkhours() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var members = getValuesByHeader('configure','팀원');
  members.forEach(function(member){
    var sheet = ss.getSheetByName(member);
    if(sheet){
      sheet.unhideColumn(sheet.getRange("J1:P1"));
    }    
  });
}