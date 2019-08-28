Sub ListAllFilesInAllFolders()
 
    Dim MyPath As String, MyFolderName As String, MyFileName As String, DateStamp As Date
    Dim i As Integer, F As Boolean
    Dim objShell As Object, objFolder As Object, AllFolders As Object, AllFilesPath As Object, AllFilesName As Object, AllFilesDate As Object
    Dim MySheet As Worksheet
     
    On Error Resume Next
     
    '************************
    'Select folder
    Set objShell = CreateObject("Shell.Application")
    Set objFolder = objShell.BrowseForFolder(0, "", 0, 0)
    If Not objFolder Is Nothing Then
        MyPath = objFolder.self.Path & "\"
    Else
        Exit Sub
       'MyPath = "G:\BackUp\"
    End If
    Set objFolder = Nothing
    Set objShell = Nothing
     
    '************************
    'List all folders
     
    Set AllFolders = CreateObject("Scripting.Dictionary")
    Set AllFilesPath = CreateObject("Scripting.Dictionary")
    Set AllFilesName = CreateObject("Scripting.Dictionary")
    Set AllFilesDate = CreateObject("Scripting.Dictionary")
    AllFolders.Add (MyPath), ""
    i = 0
    Do While i < AllFolders.Count
        Key = AllFolders.keys
        MyFolderName = Dir(Key(i), vbDirectory)
        Do While MyFolderName <> ""
            If MyFolderName <> "." And MyFolderName <> ".." Then
                If (GetAttr(Key(i) & MyFolderName) And vbDirectory) = vbDirectory Then
                    AllFolders.Add (Key(i) & MyFolderName & "\"), ""
                End If
            End If
            MyFolderName = Dir
        Loop
        i = i + 1
    Loop
     
    'List all files
    For Each Key In AllFolders.keys
        MyFileName = Dir(Key & "*.*")
        'MyFileName = Dir(Key & "*.PDF")    'only PDF files
        Do While MyFileName <> ""
            DateStamp = FileDateTime(Key & MyFileName)
            AllFilesPath.Add (Key), ""
            AllFilesName.Add (MyFileName), ""
            AllFilesDate.Add (DateStamp), ""
            MyFileName = Dir
        Loop
    Next
     
    '************************
    'List all files in Files sheet
     
    For Each MySheet In ThisWorkbook.Worksheets
        If MySheet.Name = "Files" Then
            Sheets("Files").Cells.Delete
            F = True
            Exit For
        Else
            F = False
        End If
    Next
    If Not F Then Sheets.Add.Name = "Files"
 
    'Sheets("Files").[A1].Resize(AllFolders.Count, 1) = WorksheetFunction.Transpose(AllFolders.keys)
    Sheets("Files").[A1].Resize(AllFilesPath.Count, 1) = WorksheetFunction.Transpose(AllFilesPath.keys)
    Sheets("Files").[B1].Resize(AllFilesName.Count, 1) = WorksheetFunction.Transpose(AllFilesName.keys)
    Sheets("Files").[C1].Resize(AllFilesDate.Count, 1) = WorksheetFunction.Transpose(AllFilesDate.keys)
    Set AllFolders = Nothing
    Set AllFilesPath = Nothing
    Set AllFilesName = Nothing
    Set AllFilesDate = Nothing
End Sub
