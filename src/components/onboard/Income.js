import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

    function Income () {
        const [ value, setValue ] = useState("");
        const [ description, setDescription] = useState("");
        const [ isDisabled, setIsDisabled] = useState(false);
    
        function validate (event){
    
            event.preventDefault();
    
           
            setIsDisabled(true);
            const body = {
                value: value,
                text: description
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
                    <button><ThreeDots  color="#FFFFFF" height={17} width={326} /></button>
                )
            }
    
            return(
                <button type="submit">Salvar entrada</button>
            )
        }
    
        const Toggle = toggleButton();
    
        return(
            <Page>
                <Title>
                <h3>Nova entrada</h3>
                </Title>
                <form onSubmit={(event)=>validate(event)}>
                <input
                type="number"
                value={value}
                onChange={e=> setValue(e.target.value)}
                placeholder= "Valor"
                required
                ></input>
                <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder= "Descrição"
                required
                ></input>
                {Toggle}
                </form>
            </Page>
        )
    }
    
    export default Income;
    
    const Page = styled.div`
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #8C11BE;
    
        form{
            width: 326px;
            
        }
    
        input{
            width: 326px;
            height: 58px;
            background: ${(props) => props.isDisabled ? "#F2F2F2" : "#FFFFFF"};
            pointer-events: ${(props) => props.isDisabled ? "none" : "all"};
            font-family: 'Raleway', sans-serif;
            font-weight: 400;
            font-size: 20px;
            color: #000000;
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
    
        h3{
            font-family: 'Raleway';
            font-weight: 700;
            font-size: 26px;
            color: #FFFFFF;
            margin: 25px 0 40px;
        }
    `
    const Title = styled.div`
        width: 326px;
    `