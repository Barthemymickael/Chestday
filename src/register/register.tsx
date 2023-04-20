
import {useState} from "react";


function Register() {


    interface UserInterface {
        username: string
        email: string
        password: string
    }

    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEmailValid,setIsEmailValid] = useState(false)
    const [isPasswordValid,setIsPasswordValid] = useState(false)
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(false);
    function validEmail(email: string): void{
        setEmail(email)
        const validEmailRegex = new RegExp(
            '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
        );
        setIsEmailValid(validEmailRegex.test(email))
    }
    function validPassword(password: string){
        setPassword(password)
        const validPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        setIsPasswordValid(validPasswordRegex.test(password))
    }

    function validatePassword(): void{
        setIsPasswordsMatch(password === confirmPassword)
    }


    function submitNewUser(): void{
        validatePassword()
        console.log("coucou");
        if(isPasswordsMatch && isPasswordValid && isEmailValid){
            console.log("yes c'est dedans")
            const newUser : UserInterface = {
                "username": pseudo,
                "email": email,
                "password": password
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            };
            fetch('http://localhost:8080/user/register', requestOptions)
                .then(response => console.log(response.json()))

        }
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
            <h1>Sign In</h1>
            <input
                type={"text"}
                placeholder={"Email"}
                style={isEmailValid ? input : inputInvalid}
                value={email}
                onChange={(event)=>{validEmail(event.target.value)}}
            />
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
                style={isPasswordValid ? input : inputInvalid}
                value={password}
                onChange={(event)=> {validPassword(event.target.value)}}
            />
            <input
                type={"password"}
                placeholder={"Confirm password"}
                style={input}
                value={confirmPassword}
                onChange={(event)=>{ setConfirmPassword(event.target.value)}}
            />
            <p style={isPasswordsMatch ? hide : show}>Passwords not match</p>
            <button style={submit} onClick={()=>{submitNewUser()}}>Sign In</button>
        </div>
    </div>
}

export default Register
