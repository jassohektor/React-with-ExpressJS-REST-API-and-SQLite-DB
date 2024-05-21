const Sequelize = require("sequelize");
const context = new Sequelize({
    host: "localhost",
    dialect: "sqlite",
    storage: "./config/properties.db"
 });

const secretKey = 'secretKey:1987:249087-Veröld?=';
context.authenticate()
  .then(() => console.log('Database Connected'))
  .catch(err => console.log('Error: ', err));

/*
//We can add some mockup data to start with.
const { Database } = require("sqlite3");
const md5 = require('md5');
const sqlite3 = require('sqlite3').verbose();
const dbSource = "./config/properties.db";
let sqlite = new sqlite3.Database(dbSource, (err) => {
    if (err) {
      console.log('Cannot open database');
      console.error(err.message)
      throw err
    }
    else {
        sqlite.run(`INSERT OR REPLACE INTO  contacts (propertyId, firstName, lastName, email, active) VALUES
                (4,'Nicole','Geng','ngeng@texas.com',1),
                (1226,'Scott','Mapple','mscott@steelscape.com',1);`, (err) => { if(err) console.log('error: ' + err); });
        
        sqlite.run(`INSERT OR REPLACE INTO  users (uuid, name, email, pwd, photoURL, active) VALUES
                ('${createUUID()}','Hektor','jasso.hektor@gmail.com','${md5('password')}','image-ink0.png',1),
                ('${createUUID()}','Alejandro Rdz.','arodriguez@mty.com','${md5('password')}','image-ink1.png',1),
                ('${createUUID()}','Dallan Sauce','dsaucedo@lenovo.com','${md5('password')}','image-ink2.png',1),
                ('${createUUID()}','Saulo Cisneros','scisneros@steelcar.com','${md5('password')}','image-ink3.png',1),
                ('${createUUID()}','Johana Garcia','jgarcia@altus.com','${md5('password')}','image-ink4.png',1),
                ('${createUUID()}','Ignacio Mariscal','imariscal@putitos.com','${md5('password')}','image-ink5.png',1),
                ('${createUUID()}','Lieutenant Dan Taylor','dtaylor@gump.com','${md5('password')}','image-ink6.png',1),
                ('${createUUID()}','Sadie Sink','ssink@strangerthings.com','${md5('password')}','image-ink7.png',1);`, (err) => { if(err) console.log('error: ' + err); });
    }
});
*/

function createUUID() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.subs(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.subs((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
}

String.prototype.subs = function (start, length)
{
    const S = this.toString();
    const size = S.length;
    let intStart = Number.isNaN(Number(start)) ? 0 : Number.parseInt(start);
    if (intStart === -Infinity) intStart = 0;
    else if (intStart < 0) intStart = Math.max(size + intStart, 0);
    else intStart = Math.min(intStart, size);
    let intLength = length === undefined ? size : (Number.isNaN(Number(length)) ? 0 : Number.parseInt(length));
    intLength = Math.max(Math.min(intLength, size), 0);
    let intEnd = Math.min(intStart + intLength, size);
    return S.substring(intStart, intEnd);
};


exports.db = { context, createUUID, secretKey };