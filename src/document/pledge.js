const path = require('path');
const fs = require('fs');
const pdf = require('html-pdf');

module.exports = {

    pledgePDF: async (req, res, db, MongoClient, transporter, protocol, hostname, port) => {
        let result = await db.collection('Client_detail').find({ "_id": new MongoClient.ObjectID(req.body._id) }).toArray();
        console.log(result[0]);
        var owner = result[0].name
        var E_address = result[0].email;
        var Contact = result[0].MobileNo;
        var SignPath = result[0].SignPath;
        var userId = result[0]._id;
        
        var html = fs.readFileSync('./document/pledgeht.html', 'utf8');
        //var html = fs.readFile('./document/$(pledgeht).html', 'utf8');

        const options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Author: Mohit Kumar</div>'
            },
            "footer": {
                "height": "28mm",
                "contents": {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
        }
        Imagepath = "RSK_" + Contact + Math.random().toString(36).substr(2, 9) + '.pdf';
        var output = './documents/' + Imagepath;
        console.log("This is output:"+ output)

        await pdf.create(html =
            `<!doctype html>
    <html>
      <head>
        <style>
          body {
            width: 600px;
            height: 250px;
            background-color: #232532;
            font-size: 14px;
            color: lemonchiffon;
            background-size: 600px 250px; 
            // background-image: url(http://localhost:8006/vaporcardback.png);
            font-family:"Comic Sans MS", cursive;
            padding: 10px;
          }         
          .widthHalf{
            width: 55%;
          }
          .avatar {
            vertical-align: middle;
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }

        </style>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
<script src='https://kit.fontawesome.com/a076d05399.js'></script>
      </head>
      <body><h3 style="font-family:"Comic Sans MS", cursive;font-weight:large "><img src="http://${SignPath}" alt="Avatar" class="avatar"> ${E_address}</h3>
          <p>मेरा नाम मोहित हे ${owner}</p<
      </body>
    </html>
    `
// this was the location of saving the pdf, so we ne
            , options).toFile(output,function (err, results) {
                console.log("Inside PDF creation",output);
                if (err) return console.log(err);
                console.log(results, "this is the response Line No.81"); // { filename: '/app/businesscard.pdf' }

                db.collection('pledge_pdf').updateMany({ userId: new MongoClient.ObjectID(userId) }, {
                    $set: {
                        "Business_Card": output
                    }
                },
                    {
                        multi: true
                    });
                    try {
                        transporter.sendMail({
                            from: {
                                name: 'PMO ',
                                address: 'mohitbarawal@gmail.com'
                            },
                            //to: req.body.email,
                            to: result[0].email,
                            //   cc: 'abc@gmail.com', 
                            subject: 'Pledge Attachment ' + result[0].name,
                            html: `<p>Welcome to the inauguration to take the pledge</p>
                                    <p> Please print this attachment for your information</p> 
                                  <p>Enclosure:  <b><i>${Imagepath}</i></b></p>`,
                            attachments: [{
                                filename: Imagepath, 
                                path: output,
                            }]
                        }, (err, info) => {
                            if (err) {
                                return console.log(err);
                            } else {
                                res.send(JSON.stringify({ res: 'Mail Sent successfully' }));
                                console.log(info);
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }
            });

    },

}