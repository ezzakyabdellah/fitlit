import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { BehaviorSubject } from 'rxjs/Rx';
import { Platform } from 'ionic-angular/platform/platform';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
//import { GlobProvider } from '../glob/glob';



/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const DB_NAME: string = 'fitnessDB';
const win: any = window;
export enum TABLES{day}

@Injectable()
export class StorageProvider {

  private databaseready: BehaviorSubject<boolean>
  database: any
  private _dbPromise: Promise<any>;
  //j = 0


  constructor(public http: HttpClient, private sqlitePorter: SQLitePorter, private storage: Storage, private platform: Platform, private sqlite: SQLite) {
    console.log('Hello StorageProvider Provider');
    this.databaseready = new BehaviorSubject(false)
    this._dbPromise = new Promise((resolve, reject) => {
      try {
        let _db: any;
        console.log('1')
        this.platform.ready().then(() => {
          console.log('2')
          //FOR WEBSQL
          console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
          _db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
          resolve(_db);
        });
      } catch (err) {
        reject({ err: err });
      }
    });
    this._dbPromise.then((db) => {
      this.database = db
      this._tryInit()
    })
      .catch((err) => {
        console.log(err)
      })
  }

  //the original constructor
  /* constructor(public http: HttpClient, private sqlitePorter: SQLitePorter, private storage: Storage, private platform: Platform, private sqlite: SQLite) {
    console.log('Hello StorageProvider Provider');
    this.databaseready = new BehaviorSubject(false)
    this._dbPromise = new Promise((resolve, reject) => {
      try {
        let _db: any;
        console.log('1')
        this.platform.ready().then(() => {
          if (this.platform.is('cordova') && win.sqlitePlugin) {
            //FOR MOBILE DEVICE
            _db = win.sqlitePlugin.openDatabase({
              name: DB_NAME,
              location: 'default'
            });
          } else {
            //FOR WEBSQL
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
            _db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
          }
          resolve(_db);
        });
      } catch (err) {
        reject({ err: err });
      }
    });
    this._dbPromise.then((db) => {
      this.database = db
      this._tryInit()
    })
      .catch((err) => {
        console.log(err)
      })
  } */

  _tryInit(drop = false) {
    /*if (drop) {
      this.dropTable(TABLES.User);
      this.dropTable(TABLES.Product);
    }
    this.createProductTable();
    this.createUserTable();
    */
    this.createDayTable()
    /* this.databaseFilled().then(val => {
      if (val) {
        console.log('already filled Database')

        this.databaseready.next(true);
      } else {
        console.log('filling Database')

        this.fillDatabase()
      }
    }) */
    //this.fillDatabase()
    /* this.storage.get('database_filled').then(val => {
      if (val) {
        this.databaseready.next(true);
      } else {
        this.createDB()
      }
    }) */
  }
  public databaseFilled(): Promise<any> {
    return this.storage.get('database_filled')
  }
  fillDatabase() {
    this.http.get('assets/data/database.sql', { responseType: 'text' })
      .map(res => res)
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseready.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }


  private dropTable(table: TABLES) {
    this.query("DROP TABLE " + TABLES[table]
    ).catch(err => {
      console.error('Storage: Unable to create initial storage User table', err.tx, err.err);
    });
  }

  /* private createProductTable() {
    this.query(`
      CREATE TABLE IF NOT EXISTS ` + TABLES[TABLES.Product] + ` (
                         id	INTEGER PRIMARY KEY AUTOINCREMENT,
                         name	TEXT NOT NULL UNIQUE
                     )
    `).catch(err => {
      console.error('Storage: Unable to create initial storage PRODUCT tables', err.tx, err.err);
    });
  } */

  /* private createUserTable() {
    this.query(`
      CREATE TABLE IF NOT EXISTS ` + TABLES[TABLES.User] + ` (
                         id	INTEGER PRIMARY KEY AUTOINCREMENT,
                         name	DATE NOT NULL UNIQUE
                         birthday	DATE NOT NULL
                     )
    `).catch(err => {
      console.error('Storage: Unable to create initial storage User table', err.tx, err.err);
    });
  } */

   private createDayTable() {
    this.query(`
      CREATE TABLE IF NOT EXISTS ` + TABLES[TABLES.day] + ` (
                  id	INTEGER PRIMARY KEY AUTOINCREMENT,
                  day INTEGER NULL DEFAULT NULL,
                  Date DATE NULL DEFAULT NULL,
                  workoutPassed INTEGER NULL DEFAULT NULL,
                  weight INTEGER NULL DEFAULT NULL
                     )
    `).catch(err => {
      console.error('Storage: Unable to create initial storage User table', err.tx, err.err);
    });
  }

  list(table: TABLES): Promise<any> {
    return this.query('SELECT * FROM ' + TABLES[table]).then(data => {
      if (data.res.rows.length > 0) {
        console.log('Rows found.');
        if (this.platform.is('cordova') && win.sqlitePlugin) {
          let result = [];

          for (let i = 0; i < data.res.rows.length; i++) {
            var row = data.res.rows.item(i);
            result.push(row);
          }
          return result;
        }
        else {
          return data.res.rows;
        }
      }
    });
  }

  insert(newObject, table: TABLES): Promise<any> {
    return this.query('INSERT INTO ' + TABLES[table] + ' (' + this.getFieldNamesStr(newObject)
      + ') VALUES (' + this.getFieldValuesStr(newObject) + ")", []);
  }

  private getFieldNamesStr(newObject) {
    let fields = '';
    for (let f in newObject) {
      if (f !== "id") fields += f + ',';
    }
    fields = fields.substr(0, fields.length - 1);
    return fields;
  }

  private getFieldValuesStr(object) {
    let fields = '';
    for (let f in object) {
      if (f !== "id") fields += '\"' + object[f] + '\",';
    }
    fields = fields.substr(0, fields.length - 1);
    return fields;
  }

  update(object, table: TABLES): Promise<any> {
    return this.query('UPDATE ' + TABLES[table] + ' SET ' + this.getFieldSetNamesStr(object) + ' WHERE id=?',
      this.getFieldValuesArray(object));
  }

  private getFieldSetNamesStr(object) {
    let fields = '';
    for (let f in object) {
      if (f !== "id") fields += f + "=? ,";
    }
    fields = fields.substr(0, fields.length - 1);
    return fields;
  }

  private getFieldValuesArray(object) {
    let fields = [];
    for (let f in object) {
      if (f !== "id") fields.push(object[f]);
    }
    fields.push(object.id);
    return fields;
  }

  delete(table: TABLES, object): Promise<any> {
    let query = "DELETE FROM " + TABLES[table] + " WHERE id=?";
    return this.query(query, object.id);
  }

  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._dbPromise.then(db => {
          db.transaction((tx: any) => {
            tx.executeSql(query, params,
              (tx: any, res: any) => resolve({ tx: tx, res: res }),
              (tx: any, err: any) => reject({ tx: tx, err: err }));
          },
            (err: any) => reject({ err: err }));
        });
      } catch (err) {
        reject({ err: err });
      }
    });
  }
/* 
  getCateg() {
    return (this.query('SELECT DISTINCT list_catagory , COUNT(list_status) as n FROM whatsapp_1 GROUP BY list_catagory').then((data) => {
      return data.res.rows
    }))
  }

  getStatus() {
    this.RandomNum()
    return (this.query("select * from whatsapp_1 where list_catagory = '" + GlobProvider.selectedType.list_catagory + "' LIMIT 10 OFFSET " + this.j).then((data) => {
      //GlobProvider.j += 10
      return data.res.rows
    }))
  }

  RandomNum() {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.j = getRandomInt(1, GlobProvider.selectedType.n - 10);
    //console.log(this.j)
  }
 */
}