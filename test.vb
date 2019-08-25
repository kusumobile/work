Sub RunSELECT()
    Dim cn As Object, rs As Object, output As String, sql As String
    Dim UseCase
    UseCase = InputBox("Input use case no.", "Use Case#", "1")
    
    '---Connecting to the Data Source---
    Set cn = CreateObject("ADODB.Connection")
    With cn
        .Provider = "Microsoft.ACE.OLEDB.12.0"
        .ConnectionString = "Data Source=" & ThisWorkbook.Path & "\" & ThisWorkbook.Name & ";" & "Extended Properties=""Excel 12.0 Xml;HDR=YES"";"
        .Open
    End With
    
    
    '---Run the SQL SELECT Query---
    sql = "SELECT [Test Case ID], [Scenario], [EBJ Item#] FROM [Sheet1$] WHERE [General Scenario] = 'Item Creation' and [Use Case] = '" & UseCase & "';"
    Set rs = cn.Execute(sql)
    
    Do
       output = output & rs(0) & " ; " & rs(1) & " ; " & rs(2) & vbCrLf
       Debug.Print rs(0); " ; " & rs(1) & " ; " & rs(2)
       rs.Movenext
    Loop Until rs.EOF
    
    UserForm1.TextBox1.Text = output
    UserForm1.Show
    
    '---Clean up---
    rs.Close
    cn.Close
    Set cn = Nothing
    Set rs = Nothing
End Sub
