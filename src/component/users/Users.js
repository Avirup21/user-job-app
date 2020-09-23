import React from 'react'
import axios from'axios'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import SweetAlert from 'react-bootstrap-sweetalert'
class Users extends React.Component{
    constructor(){
        super()
        this.state={
            user:[],
            name:'',
            email:'',
            phone:'',
            jobTitle:'',
            experience:'',
            skills:'',
            flagS:false,
            flagE:false
        }
    }
   
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            jobTitle:this.state.jobTitle,
            experience:this.state.experience,
            skills:this.state.skills
        }

        if( this.state.name == "" || this.state.email == "" || this.state.phone == "" || this.state.experience == "" 
        || this.state.skills == "" || this.state.jobTitle == ""){

            this.setState({ flagE : true })
        }
        else{

            this.setState({ flagS : true })
        }

        axios.post(`http://dct-application-form.herokuapp.com/users/application-form`,formData)
        .then((response)=>{
            const user=response.data
            this.addUserData(user)
            console.log(user)
            this.setState({name:'',
                           email:'',
                           phone:'',
                           jobTitle:'',
                           experience:'',
                           skills:''
                        })
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    addUserData=(users)=>{
        this.setState((prevState)=>{
            return{
                user:prevState.user.concat(users)
            }
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleJobTitle=(e)=>{
        const jobTitle=e.target.value
        this.setState({jobTitle})
    }

    onRecieveInput=()=>{
        this.setState({ flagE : false , flagS : false })

    }
    render(){
        return(
            <div>
                {/* <form align='right'>
                    <Link to='/'>Register</Link>|
                <Link to='/dashboard'>Dashboard</Link>
                </form> */}
                <form align='center'>
                    <h2>Apply for Job</h2>
                    {/* <div class="form-group row">
                        <label class="col-sm-2 col-form-label"><b>Full Name  </b></label>
                        <div class="col-sm-4">
                            <input class="form-control form-control-sm" type="text" name="name" value={this.state.name} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><hr/> */}
                    <Form.Group as={Row} controlId="formHorizontalName">
                       <Form.Label column sm={2}>Full Name</Form.Label>
                       <Col sm={6}>
                       <Form.Control type="text" name='name' value={this.state.name} placeholder="Enter your name" onChange={this.handleChange} />
                       </Col>
                    </Form.Group>
                 
                    {/* <label>Full name</label>
                    <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/><br/><br/> */}
                     <Form.Group as={Row} controlId="formHorizontalEmail">
                       <Form.Label column sm={2}>Email</Form.Label>
                       <Col sm={6}>
                       <Form.Control type="email" name='email' value={this.state.email} placeholder="Enter your email" onChange={this.handleChange} />
                       </Col>
                    </Form.Group>
                    {/* <label>Email address</label>
                    <input type='email' name='email' placeholder='example@email.com' value={this.state.email} onChange={this.handleChange}/><br/><br/> */}
                     <Form.Group as={Row} controlId="formHorizontalNumber">
                       <Form.Label column sm={2}>Contact Number</Form.Label>
                       <Col sm={6}>
                       <Form.Control type="text" name='phone' value={this.state.phone} placeholder="+91 9988554344" onChange={this.handleChange} />
                       </Col>
                    </Form.Group>
                    {/* <label>Contact Number</label>
                    <input type='text'name='phone' placeholder='+91 9988554344' value={this.state.phone} onChange={this.handleChange}/><br/><br/> */}
                     <Form.Group as={Row} controlId="formHorizontalJob">
                       <Form.Label column sm={2}>Applying for Job</Form.Label>
                       <Col sm={6}>
                       <Form.Control as="select" value={this.state.jobTitle} onChange={this.handleJobTitle}>
                        <option value=''>select</option>
                        <option value='Front-End Developer'>Front-End Developer</option>
                        <option value='Node.js Developer'>Node.js Developer</option>
                        <option value='MEAN Stack Developer'>MEAN Stack Developer</option>
                        <option value='FULL Stack Developer'>FULL Stack Developer</option>
                      </Form.Control>
                       </Col>
                    </Form.Group>
                    {/* <label>Applying for Job</label>
                    <select value={this.state.jobTitle} onChange={this.handleJobTitle}>
                    <option value=''>select</option>
                        <option value='Front-End Developer'>Front-End Developer</option>
                        <option value='Node.js Developer'>Node.js Developer</option>
                        <option value='MEAN Stack Developer'>MEAN Stack Developer</option>
                        <option value='FULL stack Developer'>FULL stack Developer</option>
                    </select><br/><br/> */}
                     <Form.Group as={Row} controlId="formHorizontalExperience">
                       <Form.Label column sm={2}>Experience</Form.Label>
                       <Col sm={6}>
                       <Form.Control type="text" name='experience' value={this.state.experience} placeholder="Experience(2Yrs,3months)" onChange={this.handleChange} />
                       </Col>
                    </Form.Group>
                    {/* <label>Experience</label>
                    <input type='text'name='experience' value={this.state.experience} placeholder='Experience(2Yrs,3months)' onChange={this.handleChange}/><br/><br/> */}
                     <Form.Group as={Row} controlId="formHorizontalSkills">
                       <Form.Label column sm={2}>Technical Skills</Form.Label>
                       <Col sm={6}>
                       <Form.Control as="textarea" name='skills' value={this.state.skills} placeholder="Enter your skills" onChange={this.handleChange} />
                       </Col>
                    </Form.Group>
                    {/* <label>Technical skills</label>
                    <textarea name='skills' value={this.state.skills} onChange={this.handleChange}/><br/><br/> */}
                    <Button variant='primary' onClick={this.handleSubmit}>Send Application</Button>
                </form>
                <SweetAlert 
                    success
                    title="Success Data!"
                    show={this.state.flagS}
                    onConfirm={(response) => this.onRecieveInput(response)}>
                        Registration form submitted successfully!!!!!!!
                    
                </SweetAlert>

                <SweetAlert
                        error
                        title="Error Data!"
                        show={this.state.flagE}
                        onConfirm={(response) => this.onRecieveInput(response)}>
                    Please Enter all the required fields !!! 
                    </SweetAlert>
            </div>
        )
    }
}
export default Users