import mysql from 'mysql';
import {
    BDD
} from '../config/cles';


var connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projet_web'
});


export const connection = (BDD) => mysql.createConnection({
    host: BBD.host,
    user: BDD.user,
    password: BDD.password,
    database: BDD.database,

    multipleStatements: true

});

export default connexion