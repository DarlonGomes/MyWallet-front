import styled from "styled-components";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login (){
    const navigate = useNavigate()
    const { setData, setToken } = useContext(UserContext);
    const [ password, setPassword] = useState("");
    const [ email, setEmail] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

  
    useEffect(()=>{
        const autoSignIn = async() => {
            try {
                if(localStorage.getItem('MyWalletUser') !== null){
                    const body = JSON.parse(localStorage.getItem('MyWalletUser'));
                    setIsDisabled(true);
                    setEmail(body.email);
                    setPassword(body.password);

                    const response = await axios.post('https://project-my-wallet-back.herokuapp.com/user/signin', body)
                    setData(response.data);
                    setToken({headers:{
                        Authorization: `Bearer ${response.data.token}`
                   }})
                   
                    setIsDisabled(false);
                    navigate("/home");
                    ;
                }
            } catch (error) {
                localStorage.removeItem('MyWalletUser')
            }};

        autoSignIn()
    },[]);

    async function validateLogin (event){

        event.preventDefault();
        setIsDisabled(true);
        const body = {
            email: email,
            password: password
        }

        try {
           const response = await axios.post('https://project-my-wallet-back.herokuapp.com/user/signin', body)
           setData(response.data.name);
           setToken(response.data.token);
           localStorage.setItem('MyWalletUser', JSON.stringify(body));
           setTimeout(()=>{
            navigate('/home');
           }, "750")

        } catch (error) {
            errorHandler();
        }
    }

    function errorHandler (){
        setTimeout(()=>{
            setEmail("");
            setPassword("");
            setIsDisabled(false);
            toast.error('Dados não válidos, cheque-os e tente novamente', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
        },"750");
    }
    
    function toggleButton () {
        if(isDisabled === true){
            return (
                <button disabled={true} ><ThreeDots  color="#FFFFFF" height={17} width={"100%"} /></button>
            )
        }

        return(
            <button type="submit" disabled={isDisabled}>Entrar</button>
        )
    }

const ButtonToggle = toggleButton();

    return(
        <>
        <ToastContainer
            />
        
        <Page>
            <h3>MyWallet</h3>
            <form onSubmit={(event)=>validateLogin(event)}>
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
            {ButtonToggle}
            </form>
            <Link to="/sign-up" >
            <p>Primeira vez? Cadastre-se!</p>
            </Link>
            

        </Page>
        </>
    )
}

export default Login;

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
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
        ::placeholder{color: #000000}
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