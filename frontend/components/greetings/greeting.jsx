import React from 'react'
import { Link } from 'react-router-dom'

class Greeting extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return this.props.currentUser ?
            null
            : (
                <>
                    <div className="greeting-bar">
                        <div className="greeting-logoname">
                            <Link className="splash-logo" to="/"><i className="fas fa-chart-line"></i>Stock Portfolio</Link>
                        </div>
                        <div className="greeting-buttons">
                            <Link className="greeting-link small" to="/signup">Sign Up</Link>
                            <Link className="greeting-link small" to="/login">Log In</Link>
                        </div>
                    </div>
                </>
            )
    }
}
export default Greeting