/*********************************************************************************
* WEB322 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Alisa Tam Student ID: 131580177 Date: 2019-01-30
*
* Online (Heroku) URL: https://obscure-hollows-30270.herokuapp.com/
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