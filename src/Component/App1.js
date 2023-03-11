import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import UserAdd from '../componet2/UserAdd';
import UserList from '../componet2/UserList';
import AddMarksheet from '../componet2/AddMarksheet';
import MarksheetList from '../componet2/MarksheetList';
import AddStudent from '../componet2/AddStudent';
import StudentList from '../componet2/StudentList';
import AddRole from '../componet2/AddRole';
import RollList from '../componet2/RollList';
import AddCollege from '../college/AddCollege';
import CollegeList from '../college/CollegeList';
import Footer from '../componet2/Footer';
// import Welcome from './Welcome';
import Dashboard from './Dashboard';
import Alert from '../componet2/Alert';

export default class App1 extends Component {
    constructor() {
        super();
        this.state = {
            alert: null
        }
    }
    showAlert = (message, type) => {
        this.setState({ alert: { message: message, type: type } })
        setTimeout(() => {
            this.setState({ alert: null })
        }, 2500);
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Dashboard />
                    <Alert alert={this.state.alert} />
                    <Routes>
                        <Route path='/adduser' element={<UserAdd showAlert={this.showAlert} />} />
                        <Route path='/addmark' element={<AddMarksheet showAlert={this.showAlert} />} />
                        <Route path='/addstudent' element={<AddStudent showAlert={this.showAlert}/>} />
                        <Route path='/addrole' element={<AddRole showAlert={this.showAlert}/>} />
                        <Route path='/addcollege' element={<AddCollege showAlert={this.showAlert}/>} />

                        <Route path='/userlist/' element={<UserList />} />
                        <Route path='/marklist' element={<MarksheetList />} />
                        <Route path='/studentlist' element={<StudentList />} />
                        <Route path='/rolelist' element={<RollList />} />
                        <Route path='/collegelist' element={<CollegeList />} />

                        <Route path='/adduser/:id' element={<UserAdd showAlert={this.showAlert}/>} />
                        <Route path='/addmark/:id' element={<AddMarksheet showAlert={this.showAlert}/>} />
                        <Route path='/addstudent/:id' element={<AddStudent showAlert={this.showAlert}/>} />
                        <Route path='/addrole/:id' element={<AddRole showAlert={this.showAlert}/>} />
                        <Route path='/addcollege/:id' element={<AddCollege showAlert={this.showAlert} />} />

                        <Route exact path='/' element={<Home />} />

                    </Routes>
                    <Footer />
                </BrowserRouter>
            </div >
        )
    }
}
