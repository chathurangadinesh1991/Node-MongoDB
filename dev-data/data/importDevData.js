const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const Employee = require('../../models/employeeModel');
const Brach = require('../../models/branchModel');
const Bank = require('../../models/bankModel');

const DB = "mongodb+srv://admin:Asd123@bankcluster.u6os8.mongodb.net/BankDB?retryWrites=true&w=majority"; 

mongoose.connect(DB,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
}).then(con => console.log('DB Connection Successful'));
;

//read json file
const employees = JSON.parse(fs.readFileSync(`${__dirname}/employee_data.json`,'utf-8'));
const branches = JSON.parse(fs.readFileSync(`${__dirname}/branch_data.json`,'utf-8'));
const banks = JSON.parse(fs.readFileSync(`${__dirname}/bank_data.json`,'utf-8'));

//import data
const importData = async () => {
    try {
        await Bank.create(banks);
        await Brach.create(branches);
        await Employee.create(employees);
        console.log('data successfully loaded.');
        process.exit();
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

//Delete all Existing Data
const DeleteData = async () => {
    try {
        await Bank.deleteMany();
        await Brach.deleteMany();
        await Employee.deleteMany();
        console.log('data successfully deleted.');
        
    } catch (error) {
        console.log(error);
    }

    process.exit();
}

if (process.argv[2] === '--import'){
    importData();
}

if (process.argv[2] === '--delete'){
    DeleteData();
}

console.log(process.argv);
