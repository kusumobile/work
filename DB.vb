Private AccessCn As Object  'ADOコネクション用オブジェクトの宣言
Private ExcelCn As Object
Private Const adStateOpen = 1  'レコードセットが開いている場合の設定値
Private Const adOpenKeyset = 1  'レコードセットカーソルタイプの設定値

Private Sub ExcelConnectDB()
  '## Excel接続
  
  Set ExcelCn = CreateObject("ADODB.Connection") 'ADOコネクションを作成
  ExcelCn.Open "Provider=Microsoft.ACE.OLEDB.12.0;" & _
      "Data Source=" & ThisWorkbook.Path & "\" & ThisWorkbook.Name & ";" & "Extended Properties=""Excel 12.0 Xml;HDR=YES"";"  'このExcelブックを指定してコネクションを開く
End Sub

Private Sub AcessConnectDB()
  '## Access接続
  Set AccessCn = CreateObject("ADODB.Connection") 'ADOコネクションを作成
  AccessCn.Open "Provider=Microsoft.ACE.OLEDB.12.0;" & _
      "Data Source=C:\Users\kusumoto.ryotaro\Downloads\KOEI_DWM_RULE.accdb;"  'Accessファイルを指定してコネクションを開く
End Sub

Private Sub ExcelDisconnectDB()
  '## 接続解除

  If Not AccessCn Is Nothing Then
    AccessCn.Close
    Set AccessCn = Nothing
  End If
  
End Sub

Private Sub AccessDisconnectDB()
  '## 接続解除

  If Not AccessCn Is Nothing Then
    AccessCn.Close
    Set AccessCn = Nothing
  End If
  
End Sub

Public Sub putRsOnSheet(ByVal AcessSql As String, ByVal ws As Worksheet, ByVal rng As Range)
  '## レコードセットをシートへ展開

  On Error GoTo Err_Handler  'エラーが起きたら「ErrorHandler」にジャンプする指示

  Call AcessConnectDB  '接続

  'レコードセットのオープン
  Dim rs As Object  'レコードセット用変数宣言
  Set rs = CreateObject("ADODB.RecordSet")  'ADOレコードセットオブジェクトを作成
  rs.Open AcessSql, AccessCn, ExcelCn  'レコードセットを開く

  '空だったら最終処理へ
  If rs Is Nothing Or (rs.BOF And rs.EOF) Then  'レコードセットやレコードが存在しなかった場合
    MsgBox "対象レコードがありません", vbInformation, "確認"  'メッセージ出力
    GoTo Finally  '最終処理へジャンプ
  End If

  'シートに展開
  Dim tgtRow As Long
  tgtRow = rng.Row  'スタートの行
  Dim tgtCol As Long
  tgtCol = rng.Column  'スタートの列
  Application.ScreenUpdating = False  '画面更新OFF
  Do Until rs.EOF  'レコードセットが終了するまで処理を繰り返す
    Dim fldNum As Long  'フィールドの繰り返し用変数
    For fldNum = 0 To rs.Fields.Count - 1  'フィールドの数だけ繰り返す
      ws.Cells(tgtRow, tgtCol + fldNum).Value = rs(fldNum)  'フィールドの並び順でセルに書き込む
    Next fldNum  '次のフィールドへ
    tgtRow = tgtRow + 1  '行をカウントアップする
    rs.Movenext  '次のレコードに移動する
  Loop
  Application.ScreenUpdating = True  '画面更新ON

  GoTo Finally  '正常に終了したら最終処理へジャンプ

Err_Handler:  '例外処理
  Dim msgTxt As String
  msgTxt = "Error #: " & Err.Number & vbNewLine & vbNewLine & Err.Description  'エラーメッセージが入る
  MsgBox msgTxt, vbOKOnly + vbCritical, "エラー"  'メッセージ出力

Finally:  '最終処理
  If Not rs Is Nothing Then  'レコードセットオブジェクトが存在している場合のみ
    If rs.State = adStateOpen Then rs.Close  'レコードセットが開いていたら閉じる
    Set rs = Nothing
  End If

  Call AccessDisconnectDB  '接続解除
End Sub

Public Function tryExecute(ByVal sqlList As Collection) As Boolean
  '## SQLの実行

  On Error GoTo ErrorHandler  'エラーが起きたら「ErrorHandler」にジャンプする指示

  Call AcessConnectDB  '接続

  AccessCn.BeginTrans  'トランザクション開始

  '実行
  Dim AcessSql As Variant
  For Each AcessSql In sqlList  'SQL文リストをループ
    AccessCn.Execute AcessSql  '1行ずつ実行
  Next AcessSql

  AccessCn.CommitTrans  '確定

  tryExecute = True  '成功だった場合、関数の結果にTrueを入れる
  GoTo Finally  '正常に終了したら最終処理へジャンプ

ErrorHandler:  '例外処理
  AccessCn.RollbackTrans  '元の状態へ戻す
  
  Dim msgTxt As String
  msgTxt = "Error #: " & Err.Number & vbNewLine & vbNewLine & Err.Description  'エラーメッセージが入る
  MsgBox msgTxt, vbOKOnly + vbCritical, "エラー"  'メッセージ出力

Finally:  '最終処理
  Call AccessDisconnectDB  '接続解除
End Function

Public Sub loadRecord()
  '## レコードをシートへ

  '対象シートを設定
  Dim ws As Worksheet
  Set ws = Sheets("RESULT")

  'SQL文の作成
  Dim AcessSql As String
  AcessSql = "SELECT * FROM KOEI_DWM_RULE WHERE JAPANESE IN (" & ExcelCn.Execute(SELECT [TransText] FROM [Sheet1$];) & ");"

  'レコードセットをシートへ展開
  Call putRsOnSheet(AcessSql, ws, ws.Range("A1"))
End Sub
