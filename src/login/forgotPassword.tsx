
import {useState} from "react";
import {send} from "vite";


function ForgotPassword() {




    const [email, setEmail] = useState('');
    const [isEmailValid,setIsEmailValid] = useState(false)

    function validEmail(email: string): void{
        setEmail(email)
        const validEmailRegex = new RegExp(
            '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
        );
        setIsEmailValid(validEmailRegex.test(email))
    }


    function sendEmail(): void{
        if(isEmailValid){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"email":email})
            };



            fetch('http://localhost:8080/user/forgotPassword', requestOptions)
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
            <h1>ForgotPassword ?</h1>

            <input
                type={"text"}
                placeholder={"Email"}
                style={isEmailValid ? input : inputInvalid}
                value={email}
                onChange={(event)=>{validEmail(event.target.value)}}
            />

            <p style={hide}>Passwords not match</p>
            <button style={submit} onClick={()=>{sendEmail()}}>Log In</button>

        </div>
    </div>
}

export default ForgotPassword
