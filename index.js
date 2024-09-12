import express from "express"
import mysql from "mysql"
import cors from "cors"
import moment from 'moment'
import 'moment-timezone'

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    acquireTimeout: 60000
})

app.use(express.json())
app.use(cors())

//app.get("/", (req,res) => {
//    res.json("hello this is the backend")
//})

app.get("/inspection", (req,res) => {
    const q = "SELECT i.* , s.STAT_NAME, o.OBSOLETE_DESC FROM inspection i INNER JOIN stat s ON i.STAT = s.STAT_NO INNER JOIN obsolete o ON i.OBSOLETE = o.OBSOLETE_NO;"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/inspection", (req,res) => {
    const q = "INSERT INTO inspection (`KEYVAL`, `CATEGORY`, `JAPANESE`, `KOREAN`, `CHINESE`, `SPEAKER_INFO`, `DETAIL`, `KOEI_FIX`, `KOEI_COMMENT`, `NEXON_FIX`, `NEXON_COMMENT`, `SV`, `VER`, `STAT`, `OBSOLETE`, `UPDATED`, `EDITED_BY`) VALUES ?"
    //console.log(req.body[0].KEYVAL);
    let values = [];

    for (let i = 0; i < req.body.length; i++){
        values.push([
            req.body[i].KEYVAL,
            req.body[i].CATEGORY,
            req.body[i].JAPANESE,
            req.body[i].KOREAN,
            req.body[i].CHINESE,
            req.body[i].SPEAKER_INFO,
            req.body[i].DETAIL,
            req.body[i].KOEI_FIX,
            req.body[i].KOEI_COMMENT,
            req.body[i].NEXON_FIX,
            req.body[i].NEXON_COMMENT,
            req.body[i].SV,
            req.body[i].VER,
            req.body[i].STAT,
            req.body[i].OBSOLETE,
            moment(req.body[i].UPDATED).tz('Europe/London').format('YYYY-MM-DD HH:mm:ss.ssssss'),
            req.body[i].EDITED_BY
        ])
    }

    db.query(q,[values],(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })

})

app.put("/inspection/:key", (req,res) => {

    const key = parseInt(req.params.key)

    const q = "UPDATE inspection SET `CATEGORY` = ?,`CHINESE` = ?,`DETAIL` = ?,`EDITED_BY` = ?,`JAPANESE` = ?,`KEYVAL` = ?,`KOEI_COMMENT` = ?,`KOEI_FIX` = ?,`KOREAN` = ?,`NEXON_COMMENT` = ?,`NEXON_FIX` = ?,`OBSOLETE` = ?,`SPEAKER_INFO` = ?,`STAT` = ?,`SV` = ?,`UPDATED` = ?,`VER` = ? WHERE `KEYVAL` = ?";
    
    const values = [
        req.body.CATEGORY,
        req.body.CHINESE,
        req.body.DETAIL,
        req.body.EDITED_BY,
        req.body.JAPANESE,
        req.body.KEYVAL,
        req.body.KOEI_COMMENT,
        req.body.KOEI_FIX,
        req.body.KOREAN,
        req.body.NEXON_COMMENT,
        req.body.NEXON_FIX,
        req.body.OBSOLETE,
        req.body.SPEAKER_INFO,
        req.body.STAT,
        req.body.SV,
        req.body.UPDATED,
        req.body.VER
    ];

    
    //res.json(values.KEYVAL);
    
    db.query(q,[...values,key],(err,data) => {
        if(err) return res.send(err)
        return res.json(data)
    })

})

app.get("/log", (req,res) => {
    const q = "SELECT * FROM log"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/log", (req,res) => {
   const q = "INSERT INTO log (`KEYVAL`, `KOEI_FIX_LOG`, `KOEI_COMMENT_LOG`, `NEXON_FIX_LOG`, `NEXON_COMMENT_LOG`, `UPDATED`, `EDITED_BY`, `VER`) VALUES (?)"
   const values = [
        //req.body.LOG_NO,
        req.body.KEYVAL,
        req.body.KOEI_FIX_LOG,
        req.body.KOEI_COMMENT_LOG,
        req.body.NEXON_FIX_LOG,
        req.body.NEXON_COMMENT_LOG,
        req.body.UPDATED,
        req.body.EDITED_BY,
        req.body.VER
   ] 
   
   db.query(q,[values],(err,data) => {
        if(err) return res.json(err)
        return res.json("Updated Successfully")
    })

})

app.listen(8800, () => {

    console.log("Connected to backend")
})