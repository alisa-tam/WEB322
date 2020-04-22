/*********************************************************************************
* WEB322 – Assignment 6
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Alisa Tam Student ID: 131580177 Date: 2019-03-05
*
* Online (Heroku) URL:  https://afternoon-woodland-57329.herokuapp.com/
*
********************************************************************************/ 
const Sequelize = require('sequelize');
var sequelize = new Sequelize('d61e9tqv35kmsm', 'qxdannxenxzirt', '59c67106cc47fb29fcadbf4e9bbbef53c8c651ae38ec331385b1622ead638f9f', {
    host: 'ec2-184-72-238-22.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
    ssl: true
    }
});

var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        
    }, 
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
    
});


var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },  
    departmentName: Sequelize.STRING,
});   

module.exports.initialize = function(){
    return new Promise(function (resolve, reject) {
        sequelize.sync()
        .then((Employee) => {
            resolve();
        }).then((Department) => {
            resolve();
        }).catch((err) => {
            reject("unable to sync the database");
        });
        reject();
    });   
};

module.exports.getEmployees = function(){
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Employee.findAll());
        }).catch((err) => {
            reject("no results returned");
        });
    });  
};

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    status: status
                }}));
        }).catch((err) => {
            reject("no results returned");
        });
    });
};

module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    department: department
            }}));
        }).catch((err) => {
            reject("no results returned");
        });
    });

};

module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    employeeManagerNum: manager
                }
            }));
            }).catch((err) => {
                reject("no results returned");
        });
    });

};

module.exports.getEmployeeByNum = function (num) {
    return new Promise( function (resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    employeeNum: num
                }
            }));
            }).catch((err) => {
                reject("no results returned");
        });
    });
};


module.exports.getDepartments = function() {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Department.findAll());
        }).catch((err) => {
            reject("no results returned");
        });
    });
};

module.exports.addEmployee = function (employeeData) {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(() => {
            for (let i in employeeData) {
                if(employeeData[i] == ""){
                    employeeData[i] = null;
                }
            }
            resolve(Employee.create({
                employeeNum: employeeData.employeeNum,
                firstName: employeeData.firstName,
                lastName: employeeData.lastName,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                maritalStatus: employeeData.marital,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate}));
            }).catch(() => {
                reject("unable to create employee");
        });

    });
};


module.exports.updateEmployee = function (employeeData) {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(() => {
            for (let i in employeeData) {
                if(employeeData[i] == ""){
                    employeeData[i] = null;
                }
            }
            resolve(Employee.update({
                firstName: employeeData.firstName,
                lastName: employeeData.lastName,
                email: employeeData.email,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressPostal: employeeData.addressPostal,
                addressState: employeeData.addressPostal,
                isManager: employeeData.isManager,
                maritalStatus: Sequelize.STRING,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                employeeNum: employeeData.employeeNum}));

            }).catch(() => {
            reject("unable to create employee");
        });
    });
};

module.exports.addDepartment = function(departmentData) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            for(let i in departmentData){
                if(departmentData[i] == "") {
                    departmentData[i] = null;
                }
            }
            Department.create({
                departmentId: departmentData.departmentId,
                departmentName: departmentData.departmentName
            }).then(() => {
                resolve(Department);
            }).catch((err) => {
                reject("unable to create department");
            });
        });
    });
};

module.exports.updateDepartment = function(departmentData) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            for(let i in departmentData){
                if(departmentData[i] == "") {
                    departmentData[i] = null;
                }
            }
            Department.update({
                departmentName: departmentData.departmentName
            }, { where: {
                departmentId: departmentData.departmentId
            }}).then(() =>{
                resolve(Department);
            }).catch((err) => {
                reject("unable to update department");
            });
        });
    });
};

module.exports.getDepartmentById = function(id) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            resolve(Department.findAll({
                where:{
                    departmentId: id
                }}));
        }).catch((err) => {
            reject("no results returned");
        });
    });
};

module.exports.deleteEmployeeById = function(id) {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
                resolve(Employee.destroy({
                    where:{
                        employeeNum: empNum
                    }}));
        }).catch((err) => {
            reject();
        });
    });
};


module.exports.getManagers = function() {
    return new Promise(function (resolve, reject) {
        reject();
       });
};


module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        reject();
       });
};

