import React, { Component } from 'react';
import PlusSign from "./plus.svg";
import uniqid from 'uniqid';

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: true,
            addNewStudent: props.onClick,
            studentName: "",
            course: "",
            session: "",
            active: false,
            newStudent: {},
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.state.addStudent = this.state.addNewStudent.bind(this);
    }
    handleInput(e) {
        // console.log(e.target.id);
        if (e.target.id == "name") {
            this.setState({ studentName: e.target.value })
        } else if (e.target.id == "course") {
            this.setState({ course: e.target.value })
        } else if (e.target.id == "session") {
            this.setState({ session: e.target.value })
        } else if (e.target.id == "active") {
            let studentIsActive = (e.target.value === 'on') ? true : false;
            this.setState({ active: studentIsActive, })
        }
        // console.log(this.state);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.updateNewStudentState();
        
        //clear inputs and reset new student data
        this.setState((state) => {
          state.addNewStudent(state.newStudent);
            return {
                studentName: "",
                course: "",
                session: "",
                active: false,

            }
        });
    }

    updateNewStudentState() {
        this.setState((state) => { //assemble new student data
            const newStudentData = {
                key: uniqid(),
                name: state.studentName,
                course: state.course,
                session: state.session,
                active: state.active,
            };
        console.log('updated new student in state');
            return { newStudent: newStudentData };
        });
    }
    showCard() {
        if (this.state.isEditing) {
            return (this.newStudentForm());
        } else {
            return (this.plusSignImg());
        }
    }
    plusSignImg() {
        return (
            <img src={PlusSign} alt="plus sign"></img>
        )
    }
    newStudentForm() {
        return (
            <form onSubmit={this.handleSubmit}>

                <div>
                    <label htmlFor="name">Student Name: </label>
                    <input type="text" id="name" placeholder="Taylor Swift" onChange={this.handleInput} />
                </div>

                <div>
                    <label htmlFor="course">Course: </label>
                    <input type="text" id="course" placeholder="Gr9 Math" onChange={this.handleInput} />
                </div>

                <label htmlFor="session">Session time: </label>
                <input type="text" id="session" placeholder="Thu 7pm" onChange={this.handleInput} />

                <label htmlFor="active">Active? </label>
                <input type="checkbox" id="active" onChange={this.handleInput} />

                <button type="submit">Add Student</button>
            </form>
        )
    }
    render() {
        return (
            <div className="add-student">
                {this.showCard()}
            </div>
        )
    }
}
export default AddStudent;