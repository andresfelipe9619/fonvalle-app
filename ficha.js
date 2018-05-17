function doGet(e) {
    var output = HtmlService.createTemplateFromFile('interfaz').evaluate();
    output.setTitle("Información Porras");
    DriveApp.getFolderById('0B4i7dRhYdahpUmZqaHhZOXNDdTA').setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
    return output;

    //    var email = Session.getActiveUser().getEmail();
    //    if (email == 'losmasporras@correounivalle.edu.co' || email == 'claudia.pelaez@correounivalle.edu.co' || email == 'isabel.garcia.gutierrez@correounivalle.edu.co' ||
    //        email == 'liliana.tenorio@correounivalle.edu.co' || email == 'isabel.santana@correounivalle.edu.co' || email == 'manuela.prada@correounivalle.edu.co' || email == 'villegasjann@gmail.com') {
    //        var output = HtmlService.createTemplateFromFile('interfaz').evaluate();
    //        output.setTitle("Información Porras");
    //        return output;
    //    } else {
    //        var out = HtmlService.createTemplateFromFile('NoPermiso').evaluate();
    //        out.setTitle("Sin Permisos");
    //        return out;
    //    }
}

function getNewHtml(e) {
    var html = HtmlService
        .createTemplateFromFile('interfaz')
        .evaluate()
        .getContent();
    return html;
}


function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function getFolderContents(ced) {
    var topFolder;
    var find = false;

    var cedula = ced + '.jpg';

    topFolder = DriveApp.getFolderById('0B4i7dRhYdahpUmZqaHhZOXNDdTA');

    //contents.rootName = topFolder.getName() + '/';
    var files = topFolder.getFiles();

    while (files.hasNext() || find) {
        var file = files.next();
        var name = file.getName();
        if (name == cedula) {
            return file.getId();
        }
    }
}


function saveSheet(array) {

    var sheetBeneficiarios = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1OxUG2Yx80ieAqLI-U9boYkYnbRzvk6o7TDp7NUKA0jg/edit?ts=5935b919#gid=522681967').getSheetByName('BENEFICIARIOS');
    var estudiantes = sheetBeneficiarios.getRange(2, 1, sheetBeneficiarios.getLastRow() - 1, sheetBeneficiarios.getLastColumn()).getValues();
    var estudiantesCells = sheetBeneficiarios.getRange(2, 1, sheetBeneficiarios.getLastRow() - 1, sheetBeneficiarios.getLastColumn());

    var sheetVocacional = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1vUmtk_p4cYwIaIcxoRH5mCXxV_b4SFBG3HjgJUYnw-M/edit#gid=1789668335').getSheetByName('Base Orientación');
    var estVocacional = sheetVocacional.getRange(2, 1, sheetVocacional.getLastRow() - 1, sheetVocacional.getLastColumn()).getValues();

    var sheetCaracterizacion = SpreadsheetApp.openByUrl('https://docs.google.com/a/correounivalle.edu.co/spreadsheets/d/1SiaaDsEvRvErw7Ej6qxx9u5rulpSpvhHFUahK1v3Od8/edit?usp=sharing_eil&ts=59678042').getSheetByName('Respuestas');
    var estCaracterizacion = sheetCaracterizacion.getRange(2, 1, sheetCaracterizacion.getLastRow() - 1, sheetCaracterizacion.getLastColumn()).getValues();

    for (var estudiante in estudiantes) {
        if (array[3] == estudiantes[estudiante][7]) { //cedula

            estudiantesCells.getCell(Number(estudiante) + 1, 2).setValue(array[4].toUpperCase()); //nodo
            estudiantesCells.getCell(Number(estudiante) + 1, 3).setValue(array[5].toUpperCase()); //ciudad
            var name = array[2].split(" "); //nombre completo

            if (name.length == 2) {
                estudiantesCells.getCell(Number(estudiante) + 1, 10).setValue(name[0].toUpperCase()); //1 nombre
                estudiantesCells.getCell(Number(estudiante) + 1, 12).setValue(name[1].toUpperCase()); //1 apellido
            } else if (name.length == 3) {
                estudiantesCells.getCell(Number(estudiante) + 1, 10).setValue(name[0].toUpperCase()); //1 nombre
                estudiantesCells.getCell(Number(estudiante) + 1, 12).setValue(name[1].toUpperCase()); //1 apellido
                estudiantesCells.getCell(Number(estudiante) + 1, 13).setValue(name[2].toUpperCase()); //2 apellido
            } else if (name.length == 4) {
                estudiantesCells.getCell(Number(estudiante) + 1, 10).setValue(name[0].toUpperCase()); //1 nombre
                estudiantesCells.getCell(Number(estudiante) + 1, 11).setValue(name[1].toUpperCase()); //2 nombre
                estudiantesCells.getCell(Number(estudiante) + 1, 12).setValue(name[2].toUpperCase()); //1 apellido
                estudiantesCells.getCell(Number(estudiante) + 1, 13).setValue(name[3].toUpperCase()); //2 apellido
            }


            estudiantesCells.getCell(Number(estudiante) + 1, 18).setValue(array[10].toUpperCase()); //direccion
            estudiantesCells.getCell(Number(estudiante) + 1, 38).setValue(array[11]); //nacimiento
            //estudiantesCells.getCell(Number(estudiante) + 1, 17).setValue(array[12]); //edad
            estudiantesCells.getCell(Number(estudiante) + 1, 20).setValue(array[15]); //email
            estudiantesCells.getCell(Number(estudiante) + 1, 21).setValue(array[14]); //celular
            estudiantesCells.getCell(Number(estudiante) + 1, 19).setValue(array[13]); //telefono
            estudiantesCells.getCell(Number(estudiante) + 1, 15).setValue(array[16].toUpperCase()); //colegio
            estudiantesCells.getCell(Number(estudiante) + 1, 17).setValue(array[17].toUpperCase()); //sede
            estudiantesCells.getCell(Number(estudiante) + 1, 23).setValue(array[18]); //puntaje
            if (array[6].toUpperCase() == "SI") {
                estudiantesCells.getCell(Number(estudiante) + 1, 30).setValue("UNIVALLE"); //estudia univalle
            } else {
                estudiantesCells.getCell(Number(estudiante) + 1, 30).setValue(""); //estudia univalle
            }
        }
    }
}


function uploadFiles(form) {

    try {
        var folder = DriveApp.getFolderById('0B4i7dRhYdahpUmZqaHhZOXNDdTA');
        var content = form.myFile;
        content.setName(form.cedd + ".jpeg");
        var file = folder.createFile(content);
        return "File uploaded successfully " + file.getUrl();

    } catch (error) {
        return error.toString();
    }
}

function cargarInfo(cedula) {

    try {
        var sheetBeneficiarios = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1OxUG2Yx80ieAqLI-U9boYkYnbRzvk6o7TDp7NUKA0jg/edit?ts=5935b919#gid=522681967').getSheetByName('BENEFICIARIOS');
        var estudiantes = sheetBeneficiarios.getRange(2, 1, sheetBeneficiarios.getLastRow() - 1, sheetBeneficiarios.getLastColumn()).getValues();

        var sheetVocacional = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1vUmtk_p4cYwIaIcxoRH5mCXxV_b4SFBG3HjgJUYnw-M/edit#gid=1789668335').getSheetByName('Base Orientación');
        var estVocacional = sheetVocacional.getRange(2, 1, sheetVocacional.getLastRow() - 1, sheetVocacional.getLastColumn()).getValues();

        var sheetCaracterizacion = SpreadsheetApp.openByUrl('https://docs.google.com/a/correounivalle.edu.co/spreadsheets/d/1SiaaDsEvRvErw7Ej6qxx9u5rulpSpvhHFUahK1v3Od8/edit?usp=sharing_eil&ts=59678042').getSheetByName('Respuestas');
        var estCaracterizacion = sheetCaracterizacion.getRange(2, 1, sheetCaracterizacion.getLastRow() - 1, sheetCaracterizacion.getLastColumn()).getValues();

        var sheetDiagnostico = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1uo-LgBzi5sdSQLd6CUNEZk619ivalOXPYLHRJcfBBgg/edit#gid=1230705223').getSheetByName('Respuestas');
        var estDiagnostico = sheetDiagnostico.getRange(2, 1, sheetDiagnostico.getLastRow() - 1, sheetDiagnostico.getLastColumn()).getValues();

        var sheetSeguimiento = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1PYEwN5h8qaskcnVGgHWNl28mAdM7aXO8-hhnk38BCKQ/edit#gid=0').getSheetByName('ESTADO ACTUAL');
        var estSeguimiento = sheetSeguimiento.getRange(2, 1, sheetSeguimiento.getLastRow() - 1, sheetSeguimiento.getLastColumn()).getValues();

        var esta;
        var ESTUDIANTE = [];



        for (var estudiante in estudiantes) {
            if (estudiantes[estudiante][7] == cedula) {
                esta = true;
                console.log(estudiante);
                ESTUDIANTE.push(estudiantes[estudiante][1]); //sede
                ESTUDIANTE.push(estudiantes[estudiante][2]); //municipio
                ESTUDIANTE.push(estudiantes[estudiante][9] + " " + estudiantes[estudiante][10] + " " + estudiantes[estudiante][11] + " " + estudiantes[estudiante][12]); //nombre completo
                ESTUDIANTE.push(estudiantes[estudiante][7]); //cedula
                ESTUDIANTE.push(estudiantes[estudiante][17]); //direccion
                ESTUDIANTE.push(estudiantes[estudiante][18]); //telefono
                ESTUDIANTE.push(estudiantes[estudiante][19]); //celular
                ESTUDIANTE.push(estudiantes[estudiante][20]); //email
                ESTUDIANTE.push(estudiantes[estudiante][14]); //colegio
                ESTUDIANTE.push(estudiantes[estudiante][16]); //Sede colegio
                ESTUDIANTE.push(estudiantes[estudiante][22]); //Puntaje Icfes...10
                ESTUDIANTE.push(estudiantes[estudiante][27]); //Estudia
                ESTUDIANTE.push(estudiantes[estudiante][29]); //Universidad
                ESTUDIANTE.push(estudiantes[estudiante][37]); //nacimiento
            }
        }
        for (var estudianteV in estVocacional) {
            if (estVocacional[estudianteV][5] == cedula) {
                ESTUDIANTE.push(estVocacional[estudianteV][23]); //quiere estudiar...14
                ESTUDIANTE.push(estVocacional[estudianteV][24]); //opcion2
                ESTUDIANTE.push(estVocacional[estudianteV][25]); //opcion3
                ESTUDIANTE.push(estVocacional[estudianteV][26]); //pin1
                ESTUDIANTE.push(estVocacional[estudianteV][27]); //cod-pin1
                ESTUDIANTE.push(estVocacional[estudianteV][28]); //programa1
                ESTUDIANTE.push(estVocacional[estudianteV][29]); //excepcion1
                ESTUDIANTE.push(estVocacional[estudianteV][31]); //pin2
                ESTUDIANTE.push(estVocacional[estudianteV][32]); //cod-pin2
                ESTUDIANTE.push(estVocacional[estudianteV][33]); //programa2...23
                ESTUDIANTE.push(estVocacional[estudianteV][34]); //excepcion2
                ESTUDIANTE.push(estVocacional[estudianteV][36]); //pin3
                ESTUDIANTE.push(estVocacional[estudianteV][37]); //cod-pin3
                ESTUDIANTE.push(estVocacional[estudianteV][38]); //programa3
                ESTUDIANTE.push(estVocacional[estudianteV][39]); //excepcion3
                ESTUDIANTE.push(estVocacional[estudianteV][41]); //pin4
                ESTUDIANTE.push(estVocacional[estudianteV][42]); //cod-pin4
                ESTUDIANTE.push(estVocacional[estudianteV][43]); //programa4...31
                ESTUDIANTE.push(estVocacional[estudianteV][44]); //excepcion4
                ESTUDIANTE.push(estVocacional[estudianteV][47]); //resultado pin1
                ESTUDIANTE.push(estVocacional[estudianteV][49]); //resultado pin2
            }
            // else if (estVocacional[127][5] != cedula) {
            //     Logger.log('no esta!');
            //     for (var i = 0; i < 21; i++) {
            //         ESTUDIANTE.push('');

            //     }
            // }
        }

        for (var estudianteC in estCaracterizacion) {
            if (estCaracterizacion[estudianteC][4] == cedula) {

                ESTUDIANTE.push(estCaracterizacion[estudianteC][5]); //sexo...35
                ESTUDIANTE.push(estCaracterizacion[estudianteC][7]); //#hijos
                ESTUDIANTE.push(estCaracterizacion[estudianteC][8]); //municipio actual
                ESTUDIANTE.push(estCaracterizacion[estudianteC][9]); //zona actual
                ESTUDIANTE.push(estCaracterizacion[estudianteC][10]); //tipo zona la flia ha vivido
                ESTUDIANTE.push(estCaracterizacion[estudianteC][11]); //estrato
                ESTUDIANTE.push(estCaracterizacion[estudianteC][12]); //años residiendo 
                ESTUDIANTE.push(estCaracterizacion[estudianteC][13]); //con quien vive
                ESTUDIANTE.push(estCaracterizacion[estudianteC][14]); //depende de familia
                ESTUDIANTE.push(estCaracterizacion[estudianteC][15]); //depende gastos transporte
                ESTUDIANTE.push(estCaracterizacion[estudianteC][16]); //gastos alimentacion
                ESTUDIANTE.push(estCaracterizacion[estudianteC][17]); //gastos estudiantiles...45
                ESTUDIANTE.push(estCaracterizacion[estudianteC][18]); //trabaja?
                ESTUDIANTE.push(estCaracterizacion[estudianteC][19]); //horas de trabajo
                ESTUDIANTE.push(estCaracterizacion[estudianteC][20]); //colegio bachiller
                ESTUDIANTE.push(estCaracterizacion[estudianteC][21]); //año
                ESTUDIANTE.push(estCaracterizacion[estudianteC][22]); //tipo titulo
                ESTUDIANTE.push(estCaracterizacion[estudianteC][23]); //ubicacion
                ESTUDIANTE.push(estCaracterizacion[estudianteC][24]); //jornada clase
                ESTUDIANTE.push(estCaracterizacion[estudianteC][25]); //zona colegio..53

            }
            //  else if (estCaracterizacion[103][4] != cedula) {
            //     for (var k = 0; k < 20; k++) {
            //         ESTUDIANTE.push('');

            //     }
            // }
        }

        for (var estudianteD in estDiagnostico) {
            if (estDiagnostico[estudianteD][2] == cedula) {
                ESTUDIANTE.push(estDiagnostico[estudianteD][6]); //icfes
                ESTUDIANTE.push(estDiagnostico[estudianteD][7]); //aspira central
                ESTUDIANTE.push(estDiagnostico[estudianteD][8]); //aspira regional
                ESTUDIANTE.push(estDiagnostico[estudianteD][9]); //expectativa ...57
                ESTUDIANTE.push(estDiagnostico[estudianteD][10]); // fenomeno
                ESTUDIANTE.push(estDiagnostico[estudianteD][11]); //capital familiar
                ESTUDIANTE.push(estDiagnostico[estudianteD][12]); //capital academico
                ESTUDIANTE.push(estDiagnostico[estudianteD][13]); // apoyo
                ESTUDIANTE.push(estDiagnostico[estudianteD][14]); //observaciones ...62
            }
            //  else if (estudianteD == (estDiagnostico.length--) && estDiagnostico[estudianteD][5] != cedula) {
            //     for (var j = 0; j < 9; j++) {
            //         ESTUDIANTE.push('');

            //     }
            // }
        }

        for (var estudianteS in estSeguimiento) {
            if (estSeguimiento[estudianteS][3] == cedula) {
                ESTUDIANTE.push(estSeguimiento[estudianteS][9]); //estado ingreso
                ESTUDIANTE.push(estSeguimiento[estudianteS][10]); //carrera actual

            }
        }

        if (esta) {
            return ESTUDIANTE;
        } else {
            return false;
        }

    } catch (error) {
        return error.toString();
    }
}