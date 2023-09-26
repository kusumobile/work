Private cn As Object  'ADOコネクション用オブジェクトの宣言
Private SubQuery As String  'サブクエリ用文字列
Private Const adStateOpen = 1  'レコードセットが開いている場合の設定値
Private Const adOpenKeyset = 1  'レコードセットカーソルタイプの設定値

Public Sub RunSubQuery()
    Dim ExcelRs As Range
    
    
    Dim LRow As Integer
    LRow = Worksheets("Sheet1").Cells(Rows.Count, 1).End(xlUp).Row
    
    'E列のItemをオブジェクトに代入
    Set ExcelRs = Worksheets("Sheet1").Range("E2:E" & LRow)
    
    '副問い合わせ文作成
    Dim item As Variant
    For Each item In ExcelRs
       SubQuery = SubQuery & "'" & item & "'" & ","
    Next item
    
    SubQuery = Left(SubQuery, Len(SubQuery) - 1)
    
    SubQuery = "(" & SubQuery & ")"
    
    UserForm1.TextBox1.Text = SubQuery
    UserForm1.Show
    
End Sub

Private Sub connectDB()
  '## Access接続
  Set cn = CreateObject("ADODB.Connection") 'ADOコネクションを作成
  cn.Open "Provider=Microsoft.ACE.OLEDB.12.0;" & _
      "Data Source=C:\Users\kusumoto.ryotaro\Downloads\KOEI_DWM_RULE.accdb;"  'Accessファイルを指定してコネクションを開く
End Sub

Private Sub disconnectDB()
  '## 接続解除

  If Not cn Is Nothing Then
    cn.Close
    Set cn = Nothing
  End If
End Sub

Public Sub putRsOnSheet(ByVal sql As String, ByVal ws As Worksheet, ByVal rng As Range)
  '## レコードセットをシートへ展開

  On Error GoTo Err_Handler  'エラーが起きたら「ErrorHandler」にジャンプする指示

  Call connectDB  '接続

  'レコードセットのオープン
  Dim rs As Object  'レコードセット用変数宣言
  Set rs = CreateObject("ADODB.RecordSet")  'ADOレコードセットオブジェクトを作成
  rs.Open sql, cn  'レコードセットを開く

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
    rs.MoveNext  '次のレコードに移動する
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

  Call disconnectDB  '接続解除
End Sub

Public Function tryExecute(ByVal sqlList As Collection) As Boolean
  '## SQLの実行

  On Error GoTo ErrorHandler  'エラーが起きたら「ErrorHandler」にジャンプする指示

  Call connectDB  '接続

  cn.BeginTrans  'トランザクション開始

  '実行
  Dim sql As Variant
  For Each sql In sqlList  'SQL文リストをループ
    cn.Execute sql  '1行ずつ実行
  Next sql

  cn.CommitTrans  '確定

  tryExecute = True  '成功だった場合、関数の結果にTrueを入れる
  GoTo Finally  '正常に終了したら最終処理へジャンプ

ErrorHandler:  '例外処理
  cn.RollbackTrans  '元の状態へ戻す
  Dim msgTxt As String
  msgTxt = "Error #: " & Err.Number & vbNewLine & vbNewLine & Err.Description  'エラーメッセージが入る
  MsgBox msgTxt, vbOKOnly + vbCritical, "エラー"  'メッセージ出力

Finally:  '最終処理
  Call disconnectDB  '接続解除
End Function

Public Sub loadRecord()
  '## レコードをシートへ

  Call RunSubQuery

  '対象シートを設定
  Dim ws As Worksheet
  Set ws = Sheets("RESULT")

  'SQL文の作成
  Dim sql As String
  
  sql = "SELECT * FROM KOEI_DWM_RULE WHERE JAPANESE IN " & SubQuery & ";"

  'レコードセットをシートへ展開
  Call putRsOnSheet(sql, ws, ws.Range("A1"))
End Sub


