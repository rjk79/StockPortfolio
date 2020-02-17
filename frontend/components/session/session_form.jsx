import React from 'react'
import { Link } from 'react-router-dom'

class SessionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Name",
            email: "Email",
            password: "Password"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.processForm(this.state)
    }

    handleChange(field) {
        return e => this.setState({
            [field]: e.target.value
        })
    }

    componentDidMount() {
        this.props.resetErrors()
    }

    

    render() {

        let errors;
        if (this.props.errors.length) {
            errors = this.props.errors.map((error, idx) => {
                return <li className="errors" key={idx}>{error}</li>
            })
        }
        let signupButton = this.props.formType === "Log In" ?
            <>
                <br />
                <p className="font-black small">Don't have an account?</p>
                <Link to="/signup" className="bw-button small long-padding" >
                    Sign Up
            </Link>
            </> : <>
                <br />
                <p className="font-black small">Already have an account?</p>
                <Link to="/login" className="bw-button small long-padding" >
                    Log In
            </Link>
            </>
        
        return (
            <>
                <div className="session-form">
                    <div className="full-form">
                        
                        <hr className="black-line" />

                        <form className="" onSubmit={this.handleSubmit}>
                            {/* <p className="slogan font-black">{this.props.formType}</p> */}

                            {this.props.path === "/signup" ? 
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id="name" className="form-control" type="text" onChange={this.handleChange("name")} placeholder="Name" required />
                            </div>
                            :null}
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" className="form-control" type="email" onChange={this.handleChange("email")} placeholder="Email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" className="form-control" type="password" onChange={this.handleChange("password")} placeholder="Password" required />
                            </div>
                            <input className="blue-button" type="submit" value={this.props.formType} />
                        </form>
                        <ul>
                            {errors}
                        </ul>
                        {signupButton}
                    </div>
                </div>
            </>
        )
    }
}
export default SessionForm