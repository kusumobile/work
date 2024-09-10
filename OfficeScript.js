function main(workbook: ExcelScript.Workbook) {

    const ws = workbook.getActiveWorksheet();

    const range = ws.getRange('A10:A22').getValues();

    const result = ws.getRange('B3:J3').getValues();

    const name = ws.getCell(2, 0).getValue();

    range.forEach((r, i) => {
        if (r == name) {
            ws.getRangeByIndexes(i + 9, 1, 1, 9).setValues(result);
        }
    });
}


function main(workbook: ExcelScript.Workbook) {

  const ws = workbook.getActiveWorksheet();

  const result = ws.getRange('A3:H3').getValues();

  for (let i = 0; i < 6; i++) {
    ws.getCell(2, i).setValue(null);
  }
  ws.getCell(2, 7).setValue(null);
}