import React from 'react';
import {useState} from 'react';
import {signUp} from '../utilities/users-service';

function SignUpForm({setUser}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    // Password does not match confirmation
    const disable = password !== confirm;

    
    const handleNameChange = (e) => {setName(e.target.value);}
    const handleEmailChange = (e) => {setEmail(e.target.value);}
    const handlePasswordChange = (e) => {setPassword(e.target.value);}
    const handleConfirmChange = (e) => {setConfirm(e.target.value);}
    const handleErrorChange = (e) => {setError(e.target.value);}

    const handleFormSubmission = async (e) => {
        // Stop submit
        e.preventDefault();

        // Get collective user object state
        const state = {name, email, password, confirm, error};

        try {
            // Copy state to formData
            const formData = {...state};
            // Delete unneeded properties
            delete formData['confirm'];
            delete formData['error'];

            const user = await signUp(formData);

            console.log("signupform state", state);
            console.log("signupform formData", formData);
            console.log("signupform user:", user);
            setUser(user.data);
        } catch(error) {
            console.log(error);
            setError('Sign up FAILED! Try again');
        }
    }

    return (
        <div>
            <div className="form-container">
                <form autoComplete="off" onSubmit={(e) => {return handleFormSubmission(e)}}>
                    <label>Name</label>
                    <input type="text" name="name" onChange={(e) => {return handleNameChange(e)}} value={name} required />
                    <label>Email</label>
                    <input type="email" name="email" onChange={(e) => {return handleEmailChange(e)}} value={email} required />
                    <label>Password</label>
                    <input type="password" name="password" onChange={(e) => {return handlePasswordChange(e)}} value={password} required />
                    <label>Confirm password</label>
                    <input type="password" name="confirm" onChange={(e) => {return handleConfirmChange(e)}} value={confirm} required />
                    <button type="submit" disabled={disable}>Sign up</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}

export default SignUpForm;