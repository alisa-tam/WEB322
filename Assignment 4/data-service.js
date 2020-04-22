/*********************************************************************************
* WEB322 – Assignment 4
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Alisa Tam Student ID: 131580177 Date: 2019-03-05
*
* Online (Heroku) URL:  https://afternoon-woodland-57329.herokuapp.com/
*
********************************************************************************/ 


var fs = require("fs"); //file system 

//global arrays
var employees = []; 
var departments = []; 

module.exports.initialize = function(){
    return new Promise(function(resolve,reject){
            fs.readFile("./data/employees.json", (err, data) => {
                if(err){
                    reject("Cannot Read File");
                    return;
                }
                employees = JSON.parse(data);
        
            fs.readFile("./data/departments.json", (err,data)=>{
                if(err){
                    reject("Cannot Read File");
                    return;
                }
                departments = JSON.parse(data);

                resolve("File Read Successfully");
            });
        });
    });
}

module.exports.getEmployees = function(){
    return new Promise(function(resolve,reject){
        if(employees.length == 0){
            reject("No Employees Found");
            return;
        }

        resolve(employees);

    })   
}


module.exports.getManagers = function() {
    return new Promise(function(resolve,reject){
        var arrayManagers = [];
        for(var i = 0; i < employees.length; i++){
            if(employees[i].isManager = true){
                arrayManagers.push(employees[i]);
            }

        }

        if(arrayManagers.length == 0){
            reject("Manager Not Found");
        }
           
        resolve(arrayManagers);
     });
}

module.exports.getDepartments = function() {
    return new Promise(function(resolve,reject){
        if(departments.length == 0){
            reject("Department Not Found");
            return;
        }

    resolve(departments);
    })
}

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {

        employeeData.isManager = (employeeData.isManager) ? true : false;
        employeeData.employeeNum = employees.length + 1;
        employees.push(employeeData);

        resolve();
    });

};


module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {

        var foundEmployees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].status == status) {
                foundEmployees.push(employees[i]);
            }
        }

        if (foundEmployees.length == 0) {
            reject("no results");
        }

        resolve(foundEmployees);
    });
};


module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        var foundEmployees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].department == department) {
                foundEmployees.push(employees[i]);
            }
        }

        if (foundEmployees.length == 0) {
            reject("no results");
        }

        resolve(foundEmployees);
    });
};

module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject) {
        var foundEmployees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeManagerNum == manager) {
                foundEmployees.push(employees[i]);
            }
        }

        if (foundEmployees.length == 0) {
            reject("no results");
        }

        resolve(foundEmployees);
    });
};

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundEmployee = null;

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == num) {
                foundEmployee = employees[i];
            }
        }

        if (!foundEmployee) {
            reject("no results");
        }

        resolve(foundEmployee);
    });

};

module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        for(let i=0; i < employees.length; i++){
            if(employees[i].employeeNum == employeeData.employeeNum){
                employees[i] = employeeData;
            }
        }
        resolve();
    });
};
