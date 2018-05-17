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

function getInscritosRange() {
    var inscritosSheet = getSpreadSheet(SPREAD_SHEET_URL);
    return inscritosSheet.getRange(1, 1, inscritosSheet.getLastRow(), inscritosSheet.getLastColumn()).getValues();
}

function buscarPersona(cedula) {
    Logger.log("Cedula: " + cedula);
    var inscritos = getInscritosRange();

    for (var inscrito in inscritos) {
        Logger.log("INSCRITO: " + inscritos[inscrito]);

        if (inscritos[inscrito][2] == cedula) {
            var index = Number(inscrito) + 1;
            var myInscrito = { inscrito: inscritos[inscrito], invitados: inscritos[inscrito][3], index: index, isRegistered: false }
            Logger.log("WHY NULL?" + inscritos[inscrito]);
            if (inscritos[inscrito][4] == "" || inscritos[inscrito][4] == " ") {
                return myInscrito;
            } else {
                myInscrito.isRegistered = true;
                return myInscrito;
            }
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

function actualizaAsistencia(formValues) {
    var inscritosSheet = getSpreadSheet(SPREAD_SHEET_URL);
    var personIndex = formValues.index;
    var invitados = formValues.invitados;
    var adicionales = formValues.adicionales;

    var inscritoRange = inscritosSheet.getRange(personIndex, 1, inscritosSheet.getLastRow(), inscritosSheet.getLastColumn());

    Logger.log('INSCRITO ' + inscritoRange);
    var j = 7;
    for (var i = 1; i <= invitados.length; i++) {
        var invitado = invitados[i - 1];
        if (i > 1) {
            var count = 0;
            inscritoRange.getCell(1, i + j).setValue(invitado.licor);
            j++;
            inscritoRange.getCell(1, i + j).setValue(invitado.cena);
            if (i % 3 == 0) {
                j++;
                inscritoRange.getCell(1, i + j).setValue(adicionales[count]);
                count++;
            }
        } else {
            inscritoRange.getCell(1, i + j).setValue(invitado.licor);
            j++;
            inscritoRange.getCell(1, i + j).setValue(invitado.cena);
        }
    }

    return true;

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
    var asistencia = inscritoRange.getCell(1, 5);
    var numeroInvitados = inscritoRange.getCell(1, 6);


    //Get raw data for displaying ti in the html's js
    var inscritos = inscritosSheet.getSheetValues(1, 1, inscritosSheet.getLastRow(), inscritosSheet.getLastColumn());
    var inscrito = inscritos[personIndex - 1];
    Logger.log('INSCRITO ' + inscrito);

    //if asistence cell is empty, we write the guesses selections
    if (asistencia.getValue() == "" || asistencia.getValue() == " ") {
        var j = 7;
        for (var i = 1; i <= invitados.length; i++) {
            var invitado = invitados[i - 1];
            if (i > 1) {
                var count = 0;
                inscritoRange.getCell(1, i + j).setValue(invitado.licor);
                j++;
                inscritoRange.getCell(1, i + j).setValue(invitado.cena);
                if (i % 3 == 0) {
                    j++;
                    inscritoRange.getCell(1, i + j).setValue(adicionales[count]);
                    count++;
                }
            } else {
                inscritoRange.getCell(1, i + j).setValue(invitado.licor);
                j++;
                inscritoRange.getCell(1, i + j).setValue(invitado.cena);
            }
        }

        asistencia.setValue(mDate);
        numeroInvitados.setValue(invitados.length);
        return inscrito;
    } else {
        return 2;
    }
}