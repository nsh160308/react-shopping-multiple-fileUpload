const express = require('express');
const router = express.Router();
const multer = require('multer');

//=================================
//            Product
//=================================


//destination: 업로드 된 파일을 저장할 폴더를 결정
//filename: 업로드 된 파일을 어떤 이름으로 저장할지
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).array("file", 5)

//이미 /api/product를 타고서 이 곳으로 온 것이다.
router.post('/image', (req, res) => {
    console.log('<test1>request', req.body);
    console.log('<test1-1>upload', upload);
    //가져온 이미지를 저장하면 된다. (multer라이브러리)
    upload(req, res, err => {
        //console.log('<test2>request', req.files);
        //console.log('<test2-1>response', res);
        if(err) {
            //파일을 저장하다가 에러가 났다면
            return res.json({ success: false, err })
        }
        //파일 저장에 성공했으면 클라이언트에게
        //저장한 폴더가 어딘지 저장한 파일 이름이 뭔지를 전달한다.
        //console.log(typeof(req.files));
        let filePathArr = [];
        let fileNameArr = [];
        req.files.forEach(files => {
            filePathArr.push(files.path);
            fileNameArr.push(files.filename);
        });
        console.log('filePathArr', filePathArr);
        console.log('fileNameArr', fileNameArr);
        return res.json({ success: true, filePath: filePathArr, fileName: fileNameArr })
    })


})

module.exports = router;
