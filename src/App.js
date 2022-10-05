import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import './styles.css';
import Student from './Components/Student.js';
import uniqid from 'uniqid';
import AddStudent from './Components/addStudent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      studentList: [
        {
          key: uniqid(),
          name: "Saoirse Ronan",
          course: "Gr11 Functions",
          session: "Wed 5pm",
          active: true
        },
        {
          key: uniqid(),
          name: "Tswizzle",
          course: "Gr12 Calculus",
          session: "Wed 6pm",
          active: false
        },
        {
          key: uniqid(),
          name: "Michelle Rodriguez",
          course: "Gr12 Advanced Functions",
          session: "Thu 5pm",
          active: true
        }
      ],

    }
    this.deleteStudent = this.deleteStudent.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.mergeStudentList = this.mergeStudentList.bind(this);
    this.changeActiveStatus = this.changeActiveStatus.bind(this);
  }

  addStudent(studentInfo) {
    // console.log('addStudent called');
    const newStudent = [studentInfo];
    this.setState((state) => {
      const oldList = state.studentList;
      if (!oldList.includes(newStudent[0])) {
        const newList = this.mergeStudentList(oldList, newStudent);
        return { studentList: newList };
      }
    })
  }
  mergeStudentList(oldList, newInfo) {
    const newList = oldList.concat(newInfo);
    console.log(`New student list: ${newList}`);
    return newList;
  }

  deleteStudent(e) {
    const stuKey = e.currentTarget.getAttribute("id");
    this.setState((state) => {
      const newList = state.studentList.filter(student => student.key != stuKey);
      return { studentList: newList };
    });
  }
  changeActiveStatus(e){ //updates student active status in state
    const newStatus = e.currentTarget.checked;
    const studentToChange = e.currentTarget.parentNode.parentNode.id;
    

    this.setState((state)=>{
      const oldStudentList = state.studentList;
      console.log(typeof oldStudentList);
      const updatedStudentList = oldStudentList.map((student)=>{
        if (student.key == studentToChange){student.active = newStatus};
        return student;
      })
      console.table(updatedStudentList);
      
      return {studentList: updatedStudentList};
      
    })

  }
  listStudents() {
    let students = this.state.studentList;
    console.table(students);
    const studentCards = students.map((student) => (
      <Student
        key={student.key}
        studentName={student.name}
        course={student.course}
        session={student.session}
        active={student.active}
        onDelete={this.deleteStudent}
        stuId={student.key} 
        onActiveChange={this.changeActiveStatus}/>
    ))
    return studentCards;
  }

  render() {
    return (
      <div className="App">

        <div className="header">
          <h1>Student List</h1>
        </div>
        <div className="student-list">
          {this.listStudents()}
          <AddStudent onClick={this.addStudent} />
        </div>
      </div>
    );
  }
}

export default App;
