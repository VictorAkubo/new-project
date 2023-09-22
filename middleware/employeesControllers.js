const { parse } = require('date-fns');
const { json } = require('express');

const data={
    employees : require('../data/employees.json'),
    setEmployees : function(data) {this.employees = data}

};


const getEmployees = (req,res) => {
    res.json(data.employees)
}
const postEmployees = (req,res) => {
    const newEmployees = {
        id: data.employees[data.employees.length -1].id +1,
        firstname:req.body.firstname,
        lastname:req.body.lastname

    }
    const duplicate = data.employees.find((user)=>user.firstname === newEmployees.firstname)
    if(duplicate){
        return res.status(409).json({"message":`user ${newEmployees.firstname} already exist`})
    }
    if(!newEmployees.firstname || !newEmployees.lastname){
        res.json({"message":"firstname and lastname are required"})
    }
    data.setEmployees([...data.employees,newEmployees])
    res.status(201).json(data.employees)
}
const putEmployees = (req,res) => {
    const foundUser = data.employees.find((user)=>user.id === parseInt(req.body.id))
    if(!foundUser){
        return res.json({"message":`employees ID ${req.body.id} was not found`})
    }

    if(req.body.firstname){
        foundUser.firstname = req.body.firstname
    }
    if(req.body.firstname){
        foundUser.lastname = req.body.lastname
    }
    const filterArray = data.employees.filter((user)=>user.id !== parseInt(req.body.id))
    const unsortedArray = [...filterArray, foundUser]
    data.employees(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0  ))
    res.json(data.employees)
        
    
}
const deleteEmployees = (req,res) => {
    const foundUser = data.employees.find((user)=>user.id === parseInt(req.body.id))
    if(!foundUser){
        return res.json({"message":`employees ID ${req.body.id} was not found`})
    }
    const filterArray = data.employees.filter((user)=>user.id !== parseInt(req.body.id))
    data.setEmployees([...filterArray])
    res.json(data.employees)
    
}
const getSpecificEmployee = (req,res) => {
    const foundUser = data.employees.find((user)=> user.id === parse(req.body.id))
    if(!foundUser){
        return res.status(400).json({"message":"user not found"})
    }
    res.json(foundUser)
  }
  module.exports = {
    getEmployees,
    postEmployees,
    putEmployees,
    deleteEmployees,
    getSpecificEmployee
  }
