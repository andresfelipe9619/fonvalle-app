function doGet(e) {
    return HtmlService
        .createTemplateFromFile("index.html")
        .evaluate() // evaluate MUST come before setting the Sandbox mode
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

var SPREAD_SHEET_URL = "https://docs.google.com/spreadsheets/d/1r2DHdQLqpTci3hffseIdE4gezhQNksZeatEZWCeHQa8/edit#gid=0"


function getSpreadSheet(url) {
    var Spreedsheet = SpreadsheetApp.openByUrl(url);
    return Spreedsheet.getSheetByName("asistentes");
}

function getInscritosFromSheet() {
    var inscritosSheet = getSpreadSheet(SPREAD_SHEET_URL);
    return inscritosSheet.getSheetValues(1, 1, inscritosSheet.getLastRow(), inscritosSheet.getLastColumn());
}

function buscarPersona(cedula) {
    Logger.log("Cedula: " + cedula);
    var inscritos = getInscritosFromSheet();

    for (var i = 0; i < inscritos.length; i++) {
        Logger.log("fila" + inscritos[i][0]);
        if (inscritos[i][2] == cedula) {
            Logger.log(inscritos[i]);
            var index = i + 1;
            return { inscrito: inscritos[i], index: index };
        } else {
            continue;
        }
    }
    return false;
}

// function registrarVinoEnSheet(persona, valor) {}
function myHour(date) {
    var h = addZero(date.getHours() - 1);
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());
    var time = h + ":" + m + ":" + s;
    return time;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function registrarAsistencia(formValues) {
    var personIndex = formValues.index;
    var invitados = formValues.invitados;
    var adicionales = formValues.adicionales;
    var today = new Date();
    var hour = today.getHours();
    var mDate = myHour(today);

    var inscritosSheet = getSpreadSheet(SPREAD_SHEET_URL);

    //Get range for editing spreadsheet
    var inscritoRange = inscritosSheet.getRange(personIndex, 1, inscritosSheet.getLastRow(), inscritosSheet.getLastColumn());
    var asistencia = inscritoRange.getCell(1, 4);
    var numeroInvitados = inscritoRange.getCell(1, 5);


    //Get raw data for displaying ti in the html's js
    var inscritos = inscritosSheet.getSheetValues(1, 1, inscritosSheet.getLastRow(), inscritosSheet.getLastColumn());
    var inscrito = inscritos[personIndex - 1];
    Logger.log('INSCRITO ' + inscrito);

    if (asistencia.getValue() == "" || asistencia.getValue() == " ") {

        invitados.map(function(invitado,i) {
            inscritoRange.getCell(1, i+7).setValue(invitado.licor);
            inscritoRange.getCell(1, i+8).setValue(invitado.cena);
            
        });

        asistencia.setValue(mDate);
        numeroInvitados.setValue(invitados.length);
        return inscrito;
    } else {
        return 2;
    }
}