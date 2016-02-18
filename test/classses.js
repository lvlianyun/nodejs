/**
 * Created by lvly on 2016/2/16.
 */

var student = require('./student');
var teacher = require('./teacher');


function  add(teachName,students) {

    teacher.add(teachName);

    students.forEach(function (item, index) {

        student.add(item);

    });
}

exports.add = add;