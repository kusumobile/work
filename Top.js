import React, { useState, useEffect, useRef, Component } from 'react'
import { BrowserRouter, Route, Routes, Switch, Link } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable/datatable.esm.js'
import { Column } from 'primereact/column/column.esm.js'
import { FilterMatchMode, FilterOperator, locale, addLocale } from 'primereact/api/api.esm.js'
import { InputText } from 'primereact/inputtext/inputtext.esm.js'
import { InputTextarea } from 'primereact/inputtextarea/inputtextarea.esm.js'
import { InputMask } from 'primereact/inputmask/inputmask.esm.js'
import { Dropdown } from 'primereact/dropdown/dropdown.esm.js'
import { Calendar } from 'primereact/calendar/calendar.esm.js'
import { Button } from 'primereact/button/button.esm.js'
import { InputNumber } from 'primereact/inputnumber/inputnumber.esm.js'
import { Checkbox } from 'primereact/checkbox/checkbox.esm.js'
import { Tag } from 'primereact/tag/tag.esm.js'
import { Toast } from 'primereact/toast/toast.esm.js'
import { FileUpload } from 'primereact/fileupload/fileupload.esm.js'
import { Editor } from 'primereact/editor/editor.esm.js'
import { convert, compile } from 'html-to-text'
import axios from 'axios'
import moment from 'moment'
import 'moment-timezone'
import './Styles.css'
import Excel from 'exceljs'

export const Top = () => {
    addLocale('ja', {
        "startsWith": "始まる",
        "contains": "含む",
        "notContains": "含まない",
        "endsWith": "終わる",
        "equals": "等しい",
        "notEquals": "等しくない",
        "noFilter": "フィルターなし",
        "filter": "フィルター",
        "lt": "未満",
        "lte": "以下",
        "gt": "超える",
        "gte": "以上",
        "dateIs": "等しい",
        "dateIsNot": "等しくない",
        "dateBefore": "指定日より過去",
        "dateAfter": "指定日より未来",
        "custom": "カスタム",
        "clear": "クリア",
        "apply": "適用",
        "matchAll": "全て一致",
        "matchAny": "いずれかが一致",
        "addRule": "条件追加",
        "removeRule": "条件削除",
        "accept": "はい",
        "reject": "いいえ",
        "choose": "選択",
        "upload": "アップロード",
        "cancel": "キャンセル",
        "completed": "完了済",
        "pending": "保留",
        "fileSizeTypes": ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        "dayNames": ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
        "dayNamesShort": ["日", "月", "火", "水", "木", "金", "土"],
        "dayNamesMin": ["日", "月", "火", "水", "木", "金", "土"],
        "monthNames": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        "monthNamesShort": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        "chooseYear": "年を選択",
        "chooseMonth": "月を選択",
        "chooseDate": "日を選択",
        "prevDecade": "前の10年",
        "nextDecade": "後の10年",
        "prevYear": "前年",
        "nextYear": "翌年",
        "prevMonth": "先月",
        "nextMonth": "翌月",
        "prevHour": "前の時間",
        "nextHour": "次の時間",
        "prevMinute": "前の分",
        "nextMinute": "次の分",
        "prevSecond": "前の秒",
        "nextSecond": "次の秒",
        "am": "午前",
        "pm": "午後",
        "today": "今日",
        "now": "今",
        "weekHeader": "週",
        "firstDayOfWeek": 0,
        "showMonthAfterYear": true,
        "dateFormat": "yy/mm/dd",
        "weak": "弱い",
        "medium": "普通",
        "strong": "強い",
        "passwordPrompt": "パスワードを入力",
        "emptyFilterMessage": "オプションなし",
        "searchMessage": "{0} 件の結果",
        "selectionMessage": "{0} 件選択済み",
        "emptySelectionMessage": "選択なし",
        "emptySearchMessage": "該当なし",
        "emptyMessage": "結果なし",
        "aria": {
          "trueLabel": "True",
          "falseLabel": "False",
          "nullLabel": "未選択",
          "star": "1件のスター",
          "stars": "{star}件のスター",
          "selectAll": "全て選択",
          "unselectAll": "すべての選択を解除",
          "close": "閉じる",
          "previous": "前",
          "next": "次",
          "navigation": "ナビゲーション",
          "scrollTop": "トップへスクロール",
          "moveTop": "トップへ移動",
          "moveUp": "上へ",
          "moveDown": "下へ",
          "moveBottom": "一番下へ",
          "moveToTarget": "ターゲットへ移動",
          "moveToSource": "ソースへ移動",
          "moveAllToTarget": "ターゲットへ全て移動",
          "moveAllToSource": "ソースへ全て移動",
          "pageLabel": "{page}ページ",
          "firstPageLabel": "最初のページ",
          "lastPageLabel": "最後のページ",
          "nextPageLabel": "次のページ",
          "previousPageLabel": "前のページ",
          "rowsPerPageLabel": "行/ページ",
          "jumpToPageDropdownLabel": "ページドロップダウンへ",
          "jumpToPageInputLabel": "ページ入力へ",
          "selectRow": "選択済み行",
          "unselectRow": "未選択行",
          "expandRow": "展開済行",
          "collapseRow": "折りたたみ行",
          "showFilterMenu": "フィルターメニューを表示",
          "hideFilterMenu": "フィルターメニューを非表示",
          "filterOperator": "フィルター操作",
          "filterConstraint": "フィルター成約",
          "editRow": "行編集",
          "saveEdit": "保存",
          "cancelEdit": "キャンセル",
          "listView": "リストビュー",
          "gridView": "グリッドビュー",
          "slide": "スライド",
          "slideNumber": "{slideNumber}",
          "zoomImage": "画像を拡大",
          "zoomIn": "拡大",
          "zoomOut": "縮小",
          "rotateRight": "右に回転",
          "rotateLeft": "左に回転"
        }
      });
    
      locale('ja');
    
      const statuses = [
        { name: '監修依頼中', code: 0 },
        { name: 'KOEI一次チェック済み', code: 1 },
        { name: 'KOEI二次チェック済み', code: 2 },
        { name: '監修済み', code: 3 },
        { name: 'NEXON回答済み', code: 4 },
        { name: 'NEXON実機反映済み', code: 5 }
      ];
    
      const [value1, setValue1] = useState({
        CATEGORY: "",
        CHINESE: "",
        DETAIL: "",
        EDITED_BY: "",
        JAPANESE: "",
        KEYVAL: null,
        KOEI_COMMENT: "",
        KOEI_FIX: "",
        KOREAN: "",
        NEXON_COMMENT: "",
        NEXON_FIX: "",
        OBSOLETE: false,
        SPEAKER_INFO: "",
        STAT: null,
        SV: null,
        UPDATED: "",
        VER: null
      });
      const [value2, setValue2] = useState('');
      const [value3, setValue3] = useState('');
      const [value4, setValue4] = useState(Date('2024-02-01'));
    
      const [globalFilterValue, setGlobalFilterValue] = useState('');
      const [filters, setFilters] = useState(null);
    
      const initFilters = () => {
        setFilters({
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
          KEYVAL: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          CATEGORY: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          JAPANESE: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          KOREAN: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          CHINESE: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          SPEAKER_INFO: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          KOEI_FIX: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          KOEI_COMMENT_SHOW: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          NEXON_FIX: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          NEXON_COMMENT: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          SV: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          VER: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          STAT_NAME: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          OBSOLETE_DESC: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
          UPDATED: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
          EDITED_BY: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        });
        setGlobalFilterValue('');
      };
    
      const [logFilterValue, setLogFilterValue] = useState('');
      const [logFilters, setLogFilters] = useState({
        KEYVAL: { value: null, matchMode: FilterMatchMode.EQUALS },
      });
    
      const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
    
        _filters['global'].value = value;
    
        setFilters(_filters);
        setGlobalFilterValue(value);
      }
    
      const onLogFilterChange = (e) => {
        const value = e;
        let _filters = { ...logFilters };
        //_filters['KEYVAL'].value = null;
        //setLogFilters(_filters);
    
        _filters['KEYVAL'].value = value;
        setLogFilters(_filters);
        //setLogFilterValue(value);
      };
    
      const [posts, setPosts] = useState([]);
    
      const [logs, setLog] = useState([]);
    
      const fetchTable = async () => {
        try {
          const res = await axios.get("http://10.10.0.244:8800/inspection")
            .then((res) => setPosts(mergeData(res.data)));
        } catch (err) {
          console.log(err)
        }
      }
      useEffect(() => {
        fetchTable()
        initFilters()
      }, []);
    
      const mergeData = (data) => {
        const options = {
          wordwrap: null
        }
        return [...(data || [])].map((d) => {
          d.UPDATED = new Date(d.UPDATED);
          d.KOEI_COMMENT_SHOW = convert(d.KOEI_COMMENT, options)
          //d.KOEI_COMMENT_LOG = convert(d.KOEI_COMMENT_LOG, options)
    
          return d;
        });
      };
    
      const fetchLog = async () => {
        try {
          const res = await axios.get("http://10.10.0.244:8800/log")
            .then((res) => setLog(mergeData(res.data)));
        } catch (err) {
          console.log(err)
        }
      }
      useEffect(() => {
        fetchLog()
      }, []);
    
      useEffect(() => {
        onLogFilterChange(value1.KEYVAL)
        //console.log(value1.KOEI_FIX)
      }, [value1]);
    
      const handleChange = (e) => {
        setValue1((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      }
    
      const handleEditorChange = (e, name) => {
        setValue1((prev) => ({ ...prev, [name] : e.htmlValue }))
      }
    
      const handleClick = async (e) => {
    
        const key = value1.KEYVAL
        //console.log(key)
    
        e.preventDefault()
        value1.VER++
        setValue1({ ...value1, [e.VER]: e.target.value })
        value1.UPDATED = moment().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss.ssssss')
        console.log(value1)
        try {
          await axios.put(`http://10.10.0.244:8800/inspection/${key}`, value1)
            .then(res => console.log(res.data))
        } catch (err) {
          console.log(err)
        }
        let logValue = { KEYVAL: null, KOEI_FIX_LOG: "", KOEI_COMMENT_LOG: "", NEXON_FIX_LOG: "", NEXON_COMMENT_LOG: "", UPDATED: "1900-01-01 00:00:00", EDITED_BY: "", VER: null }
        logValue = { KEYVAL: value1.KEYVAL, KOEI_FIX_LOG: value1.KOEI_FIX, KOEI_COMMENT_LOG: value1.KOEI_COMMENT, NEXON_FIX_LOG: value1.NEXON_FIX, NEXON_COMMENT_LOG: value1.NEXON_COMMENT, UPDATED: value1.UPDATED, EDITED_BY: value1.EDITED_BY, VER: value1.VER }
        //console.log(logValue)
        try {
          await axios.post("http://10.10.0.244:8800/log/", logValue)
            .then(res => console.log(res.data))
        } catch (err) {
          console.log(err)
        }
    
        fetchTable()
        fetchLog()
      }
    
    
      const JST = (e) => {
        const jst = e.UPDATED
    
        const time = moment(jst).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')
    
        return time;
      }
    
      const setStat = (e) => {
        setValue1({ ...value1, STAT: e.target.value })
      }
    
      const [statusMenuOptions] = useState(["監修依頼中", "KOEI一次チェック済み", "KOEI二次チェック済み", "監修済み", "NEXON回答済み", "NEXON実機反映済み"]);
    
      const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />
      }
    
    
      const statusRowFilter = (options) => {
        return (
          <Dropdown value={options.value} options={statusMenuOptions} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="選択" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        )
      }
    
      const getSeverity = (status) => {
        switch (status) {
          case "監修依頼中":
            return 'danger';
    
          case "KOEI一次チェック済み":
            return 'success';
    
          case "KOEI二次チェック済み":
            return 'info';
    
          case "監修済み":
            return 'warning';
    
          case "NEXON回答済み":
            return 'primary';
    
          case "NEXON実機反映済み":
            return 'secondary';
    
          default:
            return 'light';
        }
      };
    
      const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)}
          dateFormat="yy/mm/dd" placeholder="yy/mm/dd" mask="9999/99/99" />;
      };
    
      const [excelData, setExcelData] = useState([]);
    
      const fileUploader = async (event) => {
        // parse xlsx file to JSON
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
    
        reader.readAsBinaryString(blob);
    
        reader.onload = (e) => {
          const buffer = e.target.result;
          const wb = new Excel.Workbook();
          wb.xlsx.load(buffer).then(() => {
            const workSheet = wb.getWorksheet(1);
            const json = [];
            let firstRow = [];
    
            workSheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
              firstRow[colNumber - 1] = cell.value;
            });
    
            workSheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
              if (rowNumber > 1) {
                const rowObject = {};
    
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                  rowObject[firstRow[colNumber - 1]] = cell.value;
                });
    
                json.push(rowObject);
              }
            });
            setExcelData(json);
          });
    
    
        }
    
        try {
          await axios.post("http://10.10.0.244:8800/inspection/", excelData)
            .then(res => { console.log(res.data); onUpload() })
        } catch (err) {
          console.log(err)
        }
      };
    
    
      const toast = useRef(null);
    
      const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
      };
    
      const exportExcel = () => {
        const wb = new Excel.Workbook();
        const sheet = wb.addWorksheet("Sheet1")
        //sheet.properties.defaultRowHeight = 80;
        /* sheet.getRow(1).border = {
          top: { style: "thick", color: { argb: "FFFF0000" } },
          left: { style: "thick", color: { argb: "000000FF" } },
          bottom: { style: "thick", color: { argb: "F08080" } },
          right: { style: "thick", color: { argb: "FF00FF00" } },
        };
    
        sheet.getRow(1).fill = {
          type: "pattern",
          pattern: "darkVertical",
          fgColor: { argb: "FFFF00" },
        };
    
        sheet.getRow(1).font = {
          name: "Comic Sans MS",
          family: 4,
          size: 16,
          bold: true,
        }; */
        sheet.columns = [
          {
            header: "キー",
            key: "KEYVAL",
            width: 8.43,
          },
          {
            header: "カテゴリー",
            key: "CATEGORY",
            width: 8.43
          },
          {
            header: "日本語",
            key: "JAPANESE",
            width: 8.43,
          },
          {
            header: "韓国語",
            key: "KOREAN",
            width: 8.43,
          },
          {
            header: "中国語",
            key: "CHINESE",
            width: 8.43,
          },
          {
            header: "話者情報",
            key: "SPEAKER_INFO",
            width: 8.43,
          },
          {
            header: "詳細",
            key: "DETAIL",
            width: 8.43,
          },
          {
            header: "KOEI監修",
            key: "KOEI_FIX",
            width: 8.43,
          },
          {
            header: "KOEIコメント",
            key: "KOEI_COMMENT",
            width: 8.43
          },
          {
            header: "NEXON修正",
            key: "NEXON_FIX",
            width: 8.43,
          },
          {
            header: "NEXONコメント",
            key: "NEXON_COMMENT",
            width: 8.43,
          },
          {
            header: "SV",
            key: "SV",
            width: 8.43,
          },
          {
            header: "バージョン",
            key: "VER",
            width: 8.43,
          },
          {
            header: "ステータス",
            key: "STAT",
            width: 8.43,
          },
          {
            header: "削除フラグ",
            key: "OBSOLETE",
            width: 8.43,
          },
          {
            header: "更新日時",
            key: "UPDATED",
            width: 8.43,
          },
          {
            header: "ユーザー",
            key: "EDITED_BY",
            width: 8.43,
          },
        ];
    
        const promise = Promise.all(
          posts.map(async (record, index) => {
            sheet.addRow({
              KEYVAL: record.KEYVAL,
              CATEGORY: record.CATEGORY,
              JAPANESE: record.JAPANESE,
              KOREAN: record.KOREAN,
              CHINESE: record.CHINESE,
              SPEAKER_INFO: record.SPEAKER_INFO,
              DETAIL: record.DETAIL,
              KOEI_FIX: record.KOEI_FIX,
              KOEI_COMMENT: record.KOEI_COMMENT,
              NEXON_FIX: record.NEXON_FIX,
              NEXON_COMMENT: record.NEXON_COMMENT,
              SV: record.SV,
              VER: record.VER,
              STAT: record.STAT,
              OBSOLETE: record.OBSOLETE,
              UPDATED: record.UPDATED,
              EDITED_BY: record.EDITED_BY,
            })
          })
        )
    
        promise.then(() => {
          /* const priceCol = sheet.getColumn(5);
     
          // iterate over all current cells in this column
          priceCol.eachCell((cell) => {
            const cellValue = sheet.getCell(cell?.address).value;
            // add a condition to set styling
            if (cellValue > 50 && cellValue < 1000) {
              sheet.getCell(cell?.address).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF0000" },
              };
            }
          }); */
    
          wb.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "download.xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);
          })
        })
      }
    
      const cellHtmlConvert = (text) => {
        const options = { wordwrap: null }
        return convert(text, options)
      }
    
    
      return (
        <div>
          <section className="input_wrapper"> {/*style={{float: 'left'}}>*/}
            {/*<InputMask value={ value4 } onChange={(e) => { setValue3(e.target.value)} mask="999/999/999"/>*/}
            <div className='input_left_container'>
              <p>KOEI監修</p>
              <InputTextarea value={value1.KOEI_FIX} name="KOEI_FIX" onChange={handleChange} rows={5} cols={40} style={{ fontSize: '0.6rem' }} />
              <p>KOEIコメント</p>
              <Editor value={value1.KOEI_COMMENT} onTextChange={(e) => handleEditorChange(e, "KOEI_COMMENT")} style={{ fontSize: '0.6rem', height: '150px'}} />
              <p>NEXON修正</p>
              <InputTextarea value={value1.NEXON_FIX} name="NEXON_FIX" onChange={handleChange} rows={5} cols={40} style={{ fontSize: '0.6rem' }} />
              <p>NEXONコメント</p>
              <InputTextarea value={value1.NEXON_COMMENT} name="NEXON_COMMENT" onChange={handleChange} rows={5} cols={40} style={{ fontSize: '0.6rem' }} />
              <p>日本語テキスト表示</p>
              <InputTextarea value={value1.JAPANESE} rows={5} cols={40} style={{ fontSize: '0.6rem' }} />
              <p>中国語テキスト表示</p>
              <InputTextarea value={value1.CHINESE} rows={5} cols={40} style={{ fontSize: '0.6rem' }} />
            </div>
    
            <div className='input_right_container'>
              <p>韓国語テキスト表示</p>
              <InputTextarea value={value1.KOREAN} rows={5} cols={40} style={{ fontSize: '0.6rem' }} />
              <p>キー</p>
              <InputNumber value={value1.KEYVAL} rows={1} cols={40} disabled style={{ fontSize: '0.6rem' }} />
              <p>バージョン</p>
              <InputNumber value={value1.VER} rows={1} cols={40} disabled style={{ fontSize: '0.6rem' }} />
              <p>更新日時</p>
              <InputTextarea value={value1.UPDATED ? moment(value1.UPDATED).format('YYYY/MM/DD HH:mm:ss') : ""} rows={1} cols={40} style={{ fontSize: '0.6rem' }} />
              {/*<Calendar value={value4} onChange={(e) => setValue4(e.value)} />*/}
              <p>監修ステータス変更</p>
              <Dropdown value={value1.STAT} onChange={setStat} options={statuses} optionLabel="name" optionValue="code"
                className="md:w-20rem w-mid" placeholder="監修ステータス" style={{ fontSize: '0.6rem' }} />
              {/*<InputText value={logFilterValue} onInput = {onLogFilterChange}/>*/}
              <p>削除フラグ</p>
              <Checkbox onChange={e => setValue1(e.value1.OBSOLETE)} checked={value1.OBSOLETE} />
              <p>検索</p>
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="全体フリーワード検索" style={{ fontSize: '0.6rem' }} />
              <br /><br />
              <Button label="保存" icon="pi pi-save" raised rounded onClick={handleClick} />
    
              <br /><br />
              <div className="card flex justify-content-center">
                <Toast ref={toast}></Toast>
                <FileUpload mode="basic" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" customUpload uploadHandler={fileUploader} />
              </div>
    
              <br />
              <Button label="Excel出力" icon="pi pi-file-excel" raised rounded onClick={exportExcel} />
    
              <br />
              <Link to='/progress'><h1>進捗</h1></Link>
    
            </div>
    
          </section>
    
          <section className='table_wrapper'>
            <h3>カレントレコード</h3>
            <DataTable value={posts} sortMode="multiple"
              scrollable={true}
              scrollHeight="20rem"
              globalFilterFields={['KEYVAL', 'CATEGORY', 'JAPANESE', 'KOREAN', 'CHINESE', 'SPEAKER_INFO', 'DETAIL', 'KOEI_FIX', 'KOEI_COMMENT', 'NEXON_FIX', 'NEXON_COMMENT', 'EDITED_BY']}
              filters={filters}
              //cellSelection = {true}
              //showGridlines = {true}
              //tableStyle={{ minWidth: '50rem' }}
              //paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              //dataKey="KEYVAL"
              removableSort
              stripedRows={true}
              paginator={true}
              rowsPerPageOptions={[5, 10, 15, 20, 25]}
              //responsiveLayout = "scroll"
              //emptyMessage="No data found."
              //className="datatable-responsive"
              //currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
              rows={10}
              rowHover
              dataKey="KEYVAL"
              selectionMode="single"
              selection={value1} onSelectionChange={e => setValue1(e.value)}
              metaKeySelection={true}
              emptyMessage="見つかりませんでした"
              //filterDisplay="row"
              //frozenValue={lockedUsers}
              style={{ fontSize: '0.6rem' }}
              size="small"
            >
    
              <Column field="KEYVAL" sortable header="キー" filter filterPlaceholder="キー" style={{ minWidth: '12rem' }} />
              <Column field="CATEGORY" sortable header="カテゴリー" filter filterPlaceholder="カテゴリー" style={{ minWidth: '12rem' }} />
              <Column field="JAPANESE" sortable header="日本語" filter filterPlaceholder="日本語" style={{ minWidth: '12rem' }} />
              <Column field="KOREAN" sortable header="韓国語" filter filterPlaceholder="韓国語" style={{ minWidth: '12rem' }} />
              <Column field="CHINESE" sortable header="中国語" filter filterPlaceholder="中国語" style={{ minWidth: '12rem' }} />
              <Column field="SPEAKER_INFO" sortable header="話者情報" filter filterPlaceholder="話者情報" style={{ minWidth: '12rem' }} />
              <Column field="DETAIL" sortable header="詳細" filter filterPlaceholder="詳細" style={{ minWidth: '12rem' }} />
              <Column field="KOEI_FIX" sortable header="KOEI修正" filter filterPlaceholder="KOEI修正" style={{ minWidth: '12rem' }} />
              <Column field="KOEI_COMMENT_SHOW" sortable header="KOEIコメント" filter filterPlaceholder="KOEIコメント" style={{ minWidth: '12rem' }} />
              <Column field="NEXON_FIX" sortable header="NEXON修正" filter filterPlaceholder="NEXON修正" style={{ minWidth: '12rem' }} />
              <Column field="NEXON_COMMENT" sortable header="NEXONコメント" filter filterPlaceholder="NEXONコメント" style={{ minWidth: '12rem' }} />
              <Column field="SV" sortable header="SV" filter filterPlaceholder="SV" />
              <Column field="VER" sortable header="バージョン" filter filterPlaceholder="バージョン" />
              {/*<Column field="STAT" body={status} showFilterMenu={true} sortable header="ステータス" filter filterPlaceholder="ステータス" filterElement={statusRowFilterTemplate} style={{ minWidth: '12rem' }}/>*/}
              <Column field="STAT_NAME" sortable header="ステータス" filter filterPlaceholder="ステータス" filterElement={statusRowFilter} showFilterMatchModes={false} style={{ minWidth: '12rem' }} />
              <Column field="OBSOLETE_DESC" sortable header="削除フラグ" filter filterPlaceholder="削除フラグ" />
              <Column field="UPDATED" dataType="date" sortable header="更新日時" filter filterPlaceholder="更新日時" style={{ minWidth: '12rem' }} body={JST} filterElement={dateFilterTemplate} />
              <Column field="EDITED_BY" sortable header="ユーザー" filter filterPlaceholder="ユーザー" style={{ minWidth: '12rem' }} />
    
            </DataTable>
    
            <h3>ログ</h3>
            <DataTable value={logs} sortMode="multiple" filters={logFilters}
              scrollable={true}
              scrollHeight="20rem"
              //cellSelection = {true}
              //showGridlines = {true}
              //tableStyle={{ minWidth: '50rem' }}
              //paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              removableSort
              stripedRows={true}
              paginator={true}
              rowsPerPageOptions={[5, 10, 15, 20, 25]}
              //responsiveLayout = "scroll"
              //emptyMessage="No data found."
              //className="datatable-responsive"
              //currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
              rows={10}
              rowHover
              dataKey="LOG_NO"
              selectionMode="single"
              //selection={value1} onSelectionChange={e => setValue1(e.value)}
              metaKeySelection={true}
              emptyMessage="見つかりませんでした"
              //filterDisplay="row"
              //frozenValue={lockedUsers}
              style={{ fontSize: '0.6rem' }}
              size="small"
            >
    
              <Column field="LOG_NO" sortable header="ログ番号" />
              <Column field="KEYVAL" sortable header="キー" />
              <Column field="KOEI_FIX_LOG" sortable header="KOEI修正ログ" />
              <Column field="KOEI_COMMENT_LOG" sortable header="KOEIコメントログ" body={(e) => cellHtmlConvert(e.KOEI_COMMENT_LOG)}/>
              <Column field="NEXON_FIX_LOG" sortable header="NEXON修正ログ" />
              <Column field="NEXON_COMMENT_LOG" sortable header="NEXONコメントログ" />
              <Column body={JST} sortable header="更新日時" />
              <Column field="EDITED_BY" sortable header="ユーザー" />
              <Column field="VER" sortable header="バージョン" />
            </DataTable>
    
            {/*<DataTable value={excelData} sortMode="multiple" filters={logFilters}
              scrollable = {true}
              scrollHeight="20rem"
              //cellSelection = {true}
              //showGridlines = {true}
              //tableStyle={{ minWidth: '50rem' }}
              //paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              removableSort 
              stripedRows = {true}
              paginator = {true}
              rowsPerPageOptions={[5,10,15,20,25]}
              //responsiveLayout = "scroll"
              //emptyMessage="No data found."
              //className="datatable-responsive"
              //currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
              rows={10}
              rowHover
              dataKey="KEYVAL"
              selectionMode="single"
              //selection={value1} onSelectionChange={e => setValue1(e.value)}
              metaKeySelection={true}
              emptyMessage="見つかりませんでした"
              //filterDisplay="row"
              //frozenValue={lockedUsers}
              style={{fontSize:'0.6rem'}}
              >
    
              <Column field="KEYVAL" sortable header="キー" style={{ minWidth: '12rem' }}/>
              <Column field="CATEGORY" sortable header="カテゴリー" style={{ minWidth: '12rem' }}/>
              <Column field="JAPANESE" sortable header="日本語"style={{ minWidth: '12rem' }}/>
              <Column field="KOREAN" sortable header="韓国語" style={{ minWidth: '12rem' }}/>
              <Column field="CHINESE" sortable header="中国語" style={{ minWidth: '12rem' }}/>
              <Column field="SPEAKER_INFO" sortable header="話者情報" style={{ minWidth: '12rem' }}/>
              <Column field="DETAIL" sortable header="詳細" style={{ minWidth: '12rem' }}/>
              <Column field="KOEI_FIX" sortable header="KOEI修正" style={{ minWidth: '12rem' }}/>
              <Column field="KOEI_COMMENT" sortable header="KOEIコメント" style={{ minWidth: '12rem' }}/>
              <Column field="NEXON_FIX" sortable header="NEXON修正" style={{ minWidth: '12rem' }}/>
              <Column field="NEXON_COMMENT" sortable header="NEXONコメント" style={{ minWidth: '12rem' }}/>
              <Column field="SV" sortable header="SV" />
              <Column field="VER" sortable header="バージョン" />
              <Column field="STAT" sortable header="ステータス" style={{ minWidth: '12rem' }}/>
              <Column field="OBSOLETE" sortable header="削除フラグ" />
              <Column field="UPDATED" dataType="date" sortable header="更新日時" style={{ minWidth: '12rem' }} body={JST}/>
              <Column field="EDITED_BY" sortable header="ユーザー" style={{ minWidth: '12rem' }}/>
              
            </DataTable>*/}
    
          </section>
        </div>
    
      );
}
