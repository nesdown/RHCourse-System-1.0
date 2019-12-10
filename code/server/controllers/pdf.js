const fs = require('fs');
const PDFDocument = require('../assets/pdfkit-tables');
const moment = require('moment');
const path = require('path');
const formidable = require('formidable');
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const xl = require('excel4node');

function calculateCompensationValue(record) {
    let rawValue = Math.floor(record.smartphonePrice * record.compensation / 100);
    let remainder = rawValue % 10 === 0 ? 0 : 10;
    return Math.trunc(rawValue / 10) * 10 + remainder;
}

exports.exportData = (req, res, next) => {


    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Report');

    const headerStyle = wb.createStyle({
        font: {
            bold: true
        },
        alignment: {
            horizontal: 'center'
        }
    });

    for (let i = 0; i < req.body.headers.length; i++) {
        ws.cell(1, i + 1)
            .string(req.body.headers[i])
            .style(headerStyle);
    }

    let rows = [];

    if (req.body.type === 'trade') {
        req.body.data.forEach(element => {
            rows.push([element.registerDate, element.date, element.orderNumber, element.customerFio, element.customerNumber, element.smartphoneModel, element.imei, element.complectation, element.smartphonePrice.toFixed(2), element.orderDate, 'Проведена', element.compensation, calculateCompensationValue(element), element.status]);
        });
    } else {
        req.body.data.forEach(element => {
            rows.push([element.registerDate, element.shop, element.servicerFio, element.servicerNumber, element.date, element.orderNumber, element.customerFio, element.customerNumber, element.smartphoneModel, element.imei, element.complectation, element.smartphonePrice, element.status, moment().diff(moment(element.date),'days')]);
        })
    }

    if (req.body.type === 'trade') {
        let firstRowIndex = 2;
        for (let i = 0; i < rows.length; i++) {

            ws.cell(firstRowIndex + i, 1)
                .date(rows[i][0])
                .style({numberFormat: 'dd.mm.yyyy'});

            ws.cell(firstRowIndex + i, 2)
                .date(`${moment(rows[i][1]).format('YYYY-MM-DD')}`)
                .style({numberFormat: 'dd.mm.yyyy'});

            ws.cell(firstRowIndex + i, 3)
                .number(rows[i][2]);

            ws.cell(firstRowIndex + i, 4)
                .string(rows[i][3]);

            ws.cell(firstRowIndex + i, 5)
                .string(rows[i][4]);

            ws.cell(firstRowIndex + i, 6)
                .string(rows[i][5]);

            ws.cell(firstRowIndex + i, 7)
                .string(rows[i][6]);

            ws.cell(firstRowIndex + i, 8)
                .string(rows[i][7]);

            ws.cell(firstRowIndex + i, 9)
                .number(parseFloat(rows[i][8]));

            ws.cell(firstRowIndex + i, 10)
                .date(rows[i][9])
                .style({numberFormat: 'dd.mm.yyyy'});

            ws.cell(firstRowIndex + i, 11)
                .string(rows[i][10]);

            ws.cell(firstRowIndex + i, 12)
                .number(rows[i][11]);

            ws.cell(firstRowIndex + i, 13)
                .number(parseInt(rows[i][12]));

            ws.cell(firstRowIndex + i, 14)
                .string(rows[i][13]);

            ws.cell(firstRowIndex + i, 15)
                .string(rows[i][14]);

        }
    } else {
        let firstRowIndex = 2;
        for (let i = 0; i < rows.length; i++) {

            ws.cell(firstRowIndex + i, 1)
                .date(rows[i][0])
                .style({numberFormat: 'dd.mm.yyyy'});

            ws.cell(firstRowIndex + i, 2)
                .string(rows[i][1])

            ws.cell(firstRowIndex + i, 3)
                .string(rows[i][2]);

            ws.cell(firstRowIndex + i, 4)
                .string(rows[i][3]);

            ws.cell(firstRowIndex + i, 5)
                .date(`${moment(rows[i][4]).format('YYYY-MM-DD')}`)
                .style({numberFormat: 'dd.mm.yyyy'});
            ws.cell(firstRowIndex + i, 6)
                .number(rows[i][5]);

            ws.cell(firstRowIndex + i, 7)
                .string(rows[i][6]);

            ws.cell(firstRowIndex + i, 8)
                .string(rows[i][7]);

            ws.cell(firstRowIndex + i, 9)
                .string(rows[i][8]);

            ws.cell(firstRowIndex + i, 10)
                .string(rows[i][9])

            ws.cell(firstRowIndex + i, 11)
                .string(rows[i][10]);

            ws.cell(firstRowIndex + i, 12)
                .number(parseInt(rows[i][11]));

            ws.cell(firstRowIndex + i, 13)
                .string(rows[i][12]);

            ws.cell(firstRowIndex + i, 14)
                .number(parseInt(rows[i][13]));

        }
    }

    wb.write(path.join(__dirname, '../', 'assets', req.body.filename), (err, stats) => {
        if (err) console.log(err);
        res.send('Done');
    });
}

exports.downloadReport = (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        res.download(path.join(__dirname, '../', 'assets', fields.filename), fields.filename, (err) => {
            fs.unlink(path.join(__dirname, '../', 'assets', fields.filename), (err) => {
                if (err) console.log(err);
            });
        });
    })
}

exports.saveFile = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, '../', 'assets');

    form.on('file', (name, file) => {
        let filename;

        if (name === 'instruction') filename = 'instruction.docx';
        else if (name === 'act') filename = 'act.docx';
        else filename = file.name;

        fs.rename(file.path, path.join(__dirname, '../', 'assets', filename), (err) => console.log(err));
    });

    form.parse(req, (err, fields, files) => {
        if (!err) res.redirect('/admin/docs');
    });
}

exports.generateAct = (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        // let { tradeDate, customerFio, shop, compensation, smartphoneModel, smartphonePrice, imei } = fields;

        const content = fs.readFileSync(path.join(__dirname, '../', 'assets', 'act.docx'), 'binary');
        const zip = new JSZip(content);
        const doc = new Docxtemplater();
        doc.loadZip(zip);

        doc.setData({
            tradeDate: formatDate(fields.tradneDate),
            customerFio: fields.customerFio,
            shop: fields.shop,
            compensation: calculateCompensationValue({smartphonePrice: fields.smartphonePrice, compensation: fields.compensation}),
            smartphoneModel: fields.smartphoneModel,
            imei: fields.imei,
            smartphonePrice: fields.smartphonePrice,
            servicerFio: fields.servicerFio,
            servicerNumber: fields.servicerNumber,
            date: formatDate(fields.date),
            orderNumber: fields.orderNumber,
            customerNumber: fields.customerNumber,
            complectation: fields.complectation,
            registerDate: formatDate(fields.registerDate)
        });

        try {
            doc.render();
        }
        catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({error: e}));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }

        const buf = doc
            .getZip()
            .generate({type: 'nodebuffer'});

        let filename = `act_${Math.random().toString(36).substr(2, 9)}.docx`;
        fs.writeFileSync(path.join(__dirname, '../', 'assets' , filename), buf);
        res.download(path.join(__dirname, '../', 'assets', filename), filename, (err) => {
            fs.unlink(path.join(__dirname, '../', 'assets', filename), (err) => {
                if (err) console.log(err);
            })
        });
    })
}

exports.generateInstruction = (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {

        const content = fs.readFileSync(path.join(__dirname, '../', 'assets', 'instruction.docx'), 'binary');
        const zip = new JSZip(content);
        const doc = new Docxtemplater();
        doc.loadZip(zip);

        doc.setData({
            tradeDate: formatDate(fields.tradeDate),
            customerFio: fields.customerFio,
            shop: fields.shop,
            compensation: calculateCompensationValue({smartphonePrice: fields.smartphonePrice, compensation: fields.compensation}),
            smartphoneModel: fields.smartphoneModel,
            imei: fields.imei,
            smartphonePrice: fields.smartphonePrice,
            servicerFio: fields.servicerFio,
            servicerNumber: fields.servicerNumber,
            date: formatDate(fields.date),
            orderNumber: fields.orderNumber,
            customerNumber: fields.customerNumber,
            complectation: fields.complectation,
            registerDate: formatDate(fields.registerDate)
        });

        try {
            doc.render();
        }
        catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({error: e}));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }

        const buf = doc
            .getZip()
            .generate({type: 'nodebuffer'});

        let filename = `instruction_${Math.random().toString(36).substr(2, 9)}.docx`;
        fs.writeFileSync(path.join(__dirname, '../', 'assets' , filename), buf);
        res.download(path.join(__dirname, '../', 'assets', filename), filename, (err) => {
            fs.unlink(path.join(__dirname, '../', 'assets', filename), (err) => {
                if (err) console.log(err);
            })
        });
    })
}

function formatDate(date) {
    let formattedDate = moment(date).format('DD.MM.YYYY');
    let months = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];

    let day = formattedDate.split('.')[0];
    let monthsIndex = +formattedDate.split('.')[1] - 1;
    let month = months[monthsIndex];
    let year = formattedDate.split('.')[2];

    return `${day} ${month} ${year} року`;
}

