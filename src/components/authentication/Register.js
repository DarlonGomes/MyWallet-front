import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function Register () {

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    
   

    async function validate (event){

        event.preventDefault();

        setIsDisabled(true);
        const body = {
            name: name,
            email: email,
            password: password,
            repeat_password: confirmPassword
        }

        try {
            await axios.post('https://project-my-wallet-back.herokuapp.com/user/signup', body);

            setTimeout(()=>{
                setIsDisabled(false);
                //TOAST DE SUCESSO
                navigate("/");
            },"1500");
        } catch (error) {
            setTimeout(()=>{
                setEmail("");
                setName("");
                setPassword("");
                setConfirmPassword("");
                setIsDisabled(false);
                alert("Dados não válidos, tente novamente")
            },"1500")
        }
    }

    function toggleButton () {
        if(isDisabled === true){
            return (
                <button disabled={true} ><ThreeDots  color="#FFFFFF" height={17} width={326} /></button>
            )
        }

        return(
            <button type="submit">Entrar</button>
        )
    }

    const ButtonToggle = toggleButton();

    return(

        <Page>
            <h3>MyWallet</h3>
            <form onSubmit={(event)=>validate(event)}>
            <input
            type="text"
            value={name}
            onChange={e=> setName(e.target.value)}
            placeholder= "Nome"
            required
            disabled= {isDisabled} 
            ></input>
            <input
            type="email"
            value={email}
            onChange={e=> setEmail(e.target.value)}
            placeholder= "E-mail"
            required
            disabled= {isDisabled} 
            ></input>
            <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder= "Senha"
            required
            disabled= {isDisabled} 
            ></input>
            <input
            type="password"
            value={confirmPassword}
            onChange={e=> setConfirmPassword(e.target.value)}
            placeholder= "Confirme a senha"
            required
            disabled= {isDisabled} 
            ></input>
            {ButtonToggle}
            </form>
            <Link to="/" >
            <p>Já tem uma conta? Entre agora!</p>
            </Link>
            
        </Page>
    )
}

export default Register;

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #8C11BE;
    padding: 0 25px;
    box-sizing: border-box;

    form{
        width: 100%;
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
    }

    input{
        width: 100%;
        height: 58px;
        background: ${(props) => props.isDisabled ? "#F2F2F2" : "#FFFFFF"};
        border-radius: 5px;
        border: none;
        margin-bottom: 13px;
        padding: 0 10px;
        box-sizing: border-box;
    }

    button{
        width: 100%;
        height: 46px;
        background-color: #A328D6;
        border: none;
        border-radius: 5px;
        color: #FFFFFF;
        font-family: 'Raleway';
        font-size: 20px;
        font-weight: 700;
    }

    p{
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 15px;
        color: #FFFFFF;
        text-decoration: none;
        margin-top: 36px;
    }

    h3{
        font-family: 'Saira Stencil One', cursive;
        font-weight: 400;
        font-size: 32px;
        color: #FFFFFF;
        margin-bottom: 24px;
    }

    a{
        text-decoration: none;
    }
`

