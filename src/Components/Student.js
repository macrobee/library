import React, { Component } from 'react';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
        }
    }
    // handleMouseOver(e){
    //     console.log(e.target);
    //     console.log(e.currentTarget === e.target);
    //     console.log(e.target.id);
    //     console.log(e.currentTarget.parentNode);
    //     console.log(e.currentTarget.parentNode.className);
    // }
    render() {
        const { studentName, course, session, active, onDelete, stuId, onActiveChange} = this.props;
        // console.log(stuId);
        return (
            <div className="student-card" id={stuId}>
                <h2>{studentName}</h2>
                <div className="student-info">
                    <p className="grade">{course}</p>
                </div>
                <div className="session-info">
                    <p className="day">{session}</p>
                </div>
                <div className="session-info">
                    <label htmlFor="active">Active?</label>
                    <input type="checkbox" id="active" onChange={onActiveChange} checked={active}/>
                </div>

                <button id={stuId} onClick={onDelete}>Delete Student</button>
            </div>
        )
    }
}
export default Student;