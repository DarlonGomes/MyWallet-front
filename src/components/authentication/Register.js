import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function Register () {

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(()=>{

    })

    function validate (event){

        event.preventDefault();

        setIsDisabled(true);
        const body = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
           //axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', body)
                //.then((response)=>{
                   // setData(response.data);
                   // localStorage.setItem("user", JSON.stringify(body));
                    //setToken({headers:{
                    //    Authorization: `Bearer ${response.data.token}`
                  // }})
                    //if(response.data.membership === null){
                   //     navigate("/subscriptions")
                      
                   // }else{
                      //  navigate("/home")} 
               // })
               // .catch((res) => {
                //    setEmail("");
               //     setPassword("");
                //    setIsDisabled(false);
              //      alert("Não foi possível efetuar o login. Cheque suas credenciais e tente novamente")
           // })

    }

    function toggleButton () {
        if(isDisabled === true){
            return (
                <button><ThreeDots  color="#FFFFFF" height={17} width={299} /></button>
            )
        }

        return(
            <button type="submit">Entrar</button>
        )
    }

const Toggle = toggleButton();

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
            ></input>
            <input
            type="email"
            value={email}
            onChange={e=> setEmail(e.target.value)}
            placeholder= "E-mail"
            required
            ></input>
            <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder= "Senha"
            required
            ></input>
            <input
            type="password"
            value={confirmPassword}
            onChange={e=> setConfirmPassword(e.target.value)}
            placeholder= "Confirme a senha"
            required
            ></input>
            {Toggle}
            </form>
            <Link to="/" >
            <p>Já tem uma conta? Entre agora!</p>
            </Link>
            
        </Page>
    )
}

export default Register;

const Page = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #8C11BE;

    form{
        width: 326px;
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
    }

    input{
        width: 326px;
        height: 58px;
        background: ${(props) => props.isDisabled ? "#F2F2F2" : "#FFFFFF"};
        pointer-events: ${(props) => props.isDisabled ? "none" : "all"};
        border-radius: 5px;
        border: none;
        margin-bottom: 13px;
        padding: 0 10px;
        box-sizing: border-box;
    }

    button{
        width: 326px;
        height: 46px;
        background-color: #A328D6;
        border: none;
        border-radius: 5px;
        color: #FFFFFF;
        pointer-events: ${(props) => props.isDisabled ? "none" : "all"};
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

