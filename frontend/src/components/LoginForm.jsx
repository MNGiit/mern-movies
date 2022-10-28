import {useState} from 'react';
import * as usersService from './../utilities/users-service';

function LoginForm({setUser}) {
    // const [credentials, setCredentials] = useState({
    //     email: '',
    //     password: ''
    // })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {setEmail(event.target.value);}
    const handlePasswordChange = (event) => {setPassword(event.target.value);}

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form from being submitted to server
        try {
            const user = await usersService.login({email, password}); // The promise returned by signUp service method will resolve to user object included in payload of JSON Web Token (JWT)
            setUser(user.data);
        } catch {
            setError('Log in failed! Try again.');
        }
    }

    return (
        <div>
            <div className='form-container'>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type='email' name='email' value={email} onChange={(event) => {return handleEmailChange(event)}} required />
                    <label>Password</label>
                    <input type='password' name='password' value={password} onChange={(event) =>{return handlePasswordChange(event)}} required />
                    <button type='submit'>Log in</button>
                </form>
            </div>
            <p className='error-message'>{error}</p>
        </div>
    ) 
}

export default LoginForm;