import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state={
            user:[],
            flag:false,
            Domain:'',
            view:'',
            filter:[]
        }
    }
    componentDidMount() {
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
            .then((response) => {
                const user = response.data
                console.log(user)
                this.setState({ user:user })
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    handleChange=(Domain)=>{
        this.setState({Domain})

        const filter=this.state.user.filter((ele)=>{
            return ele.jobTitle==Domain
           
        })
        this.setState({filter})
        console.log(filter)
    }
    updateUser=(users)=>{
        this.setState((prevState) => {
            return {
                filter: prevState.filter.map((ele) => {
                    if(ele._id == users._id) {
                        return Object.assign({}, ele, users)
                    } else {
                        return Object.assign({}, ele)
                    }
                })
            }
        })
    }
    handleStatus=(e)=>{
        const status=e.target.value
        // console.log(e.target.value)
        const formData = {
            status: status
        }
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${e.target.name}`, formData) 
            .then((response) => {
                const user = response.data
                console.log(user)
                this.updateUser(user)
            })
    }
    handleViewdetails=(view)=>{
        this.setState({view})
        console.log(view)
        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${view}`) 
        .then((response) => {
            const user = response.data
            console.log(user)
            alert(`${user.name} \n ${user.skills}\n ${user.experience}\n ${user.status}` )
        })
    }
    render(){
        return(
            <div>
                    <h1>Admin Dashboard</h1>
                    <div>
                    <Button variant='outline-dark' value={this.state.Domain} onClick={()=>{this.handleChange('Front-End Developer')}}>Front-End Developer</Button> 
                    <Button variant='outline-dark' value={this.state.Domain} onClick={()=>{this.handleChange('Node.js Developer')}}>Node.Js Developer</Button> 
                    <Button variant='outline-dark' value={this.state.Domain} onClick={()=>{this.handleChange('MEAN Stack Developer')}}>Mean Stack Developer</Button> 
                    <Button variant='outline-dark' value={this.state.Domain} onClick={()=>{this.handleChange('FULL Stack Developer')}}>Full Stack Developer</Button> 
                    </div>
                    <br/>
                    <p>{this.state.Domain && `List of all the candidates applied for the ${this.state.Domain} job`}</p>
                    <table className='table table-strip'>
                        <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Experience</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update Application Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.filter.map((ele,i)=>{
                                return(
                                    <tr key={ele._id}>
                                        <td>{i+1}</td>
                                    <td>{ele.name}</td>
                                   <td>{ele.skills}</td>
                                  <td>{ele.experience}</td>
                                    <td>{ele.createdAt}</td>
                                    <td><Button variant='primary' onClick={()=>{this.handleViewdetails(ele._id)}}>View Details</Button></td>
                                    <td>{ele.status=="applied" ? 
                                    ( 
                                    <div><Button variant='success' name={ele._id} value="shortlisted"
                                    onClick={this.handleStatus}>Shortlist</Button>
                                    <Button variant='danger' name={ele._id} value="rejected" 
                                    onClick={this.handleStatus}>Reject</Button> </div> )
                                    : 
                                    (
                                        ele.status=="rejected" ? <Button variant='danger'>Rejected</Button>:
                                        <Button variant='success'>Shortlisted</Button>
                                    )
                                    }</td>
                                </tr>
                                )
                            })}
                           
                        </tbody>
                    </table>
            </div>
        )
    }
}
export default Dashboard