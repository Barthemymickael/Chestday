
import {useState} from "react";


function Login() {

    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');



    function login(): void{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"username": pseudo,"password":password })
        };
        fetch('http://localhost:8080/user/login', requestOptions)
            .then(response => console.log(response.json()))


    }


    const flexForm = {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
    const inputInvalid = {
        marginTop: '30px',
        width: '20%',
        height: '40px',
        borderRadius: '10px',
        border: 'solid 1px red',
    }
    const input = {
        marginTop: '30px',
        width: '20%',
        height: '40px',
        borderRadius: '10px',
    }

    const submit = {
        marginTop: '30px',
        width: '20%',
        height: '40px',
        borderRadius: '10px',
        backgroundColor: 'orange'
    }
    const hide = {
        display: "none",
    }
    const show = {
        display: "block",
        color: 'red',
    }


    return <div>

        <div style={flexForm}>
            <h1>Log In</h1>

            <input
                type={"text"}
                placeholder={"Pseudo"}
                style={input}
                value={pseudo}
                onChange={(event)=>{setPseudo(event.target.value)}}
            />
            <input
                type={"password"}
                placeholder={"Password"}
                style={input}
                value={password}
                onChange={(event)=> {setPassword(event.target.value)}}
            />

            <p style={hide}>Passwords not match</p>
            <button style={submit} onClick={()=>{login()}}>Log In</button>
            <p>Forgot Password ?</p>
        </div>
    </div>
}

export default Login
