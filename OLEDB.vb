Public Sub GetSales()

Dim targetList As String

'Get list of target customers
Range("A2").Select
Range(Selection, Selection.End(xlDown)).Select
counter = Selection.Rows.Count

targetList = "'" & Range("A2").Value & "'"
For x = 2 To counter
    targetList = targetList + ",'" + CStr(Range("A" & CStr(3)).Value) + "'"
Next x


'Query I want to run
'SalesData is the ListObject in the the Sales Data workbook
sqlQuery = "Select * From SalesData WHERE Customer IN " & targetList


    With ActiveWorkbook.Connections("SalesData").OLEDBConnection
        .BackgroundQuery = True
        .CommandText = sqlQuery
        .CommandType = xlCmdSql
        .Connection = Array(something in here??)
        .RefreshOnFileOpen = False
        .SavePassword = False
        .SourceConnectionFile = ""
        .ServerCredentialsMethod = xlCredentialsMethodIntegrated
        .AlwaysUseConnectionFile = False
    End With


'Return the queried sales data into a list object _
'on a new sheet in the Target Customers workbook
ActiveWorkbook.Worksheets.Add().Name = "Sales History"
Worksheets("Sales History").Activate

With ActiveSheet.ListObjects.Add '(results of query)
    .DisplayName = "SalesHistory"
End With

End Sub
