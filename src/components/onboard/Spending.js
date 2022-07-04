import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../context/UserContext.js";

function Spending () {
    const {id} = useParams() 
    const [ value, setValue ] = useState();
    const [ description, setDescription] = useState("");
    const [ isDisabled, setIsDisabled] = useState(false);
    const { token } = useContext(UserContext);
    const navigate = useNavigate();
    
    async function validate (event){
        event.preventDefault();
        setIsDisabled(true);

        if(!id){
            const body = {
                value: parseFloat(-value),
                text: description
            }
            try {
                await axios.post('https://project-my-wallet-back.herokuapp.com/wallet/currency', body, token);
                setIsDisabled(false);
                navigate("/home");
                
            } catch (error) {
                alert("Deu bosta, me troca por toast pfv");
                setValue();
                setDescription("");
                setIsDisabled(false);
            }
        }else{
            const body = {
                value: parseFloat(-value) ,
                text: description,
                id: id
            }
            try {
                await axios.put('https://project-my-wallet-back.herokuapp.com/wallet/currency', body, token);
                setIsDisabled(false);
                navigate("/home");
                
            } catch (error) {
                alert("Deu bosta, me troca por toast pfv");
                setValue();
                setDescription("");
                setIsDisabled(false);
            }
        }
        }
    
    const ButtonToggle = () => {
        if(isDisabled === true){
            return (
                <button><ThreeDots  color="#FFFFFF" height={17} width={"100%"} /></button>
            )
        }

        return(
            <button type="submit">Salvar saída</button>
        )
    }

    const HeaderToggle = () => {
        if(!id){
            return(
                <h3>Nova saída</h3>
            )
        }else{
            return(
                <h3>Editar saída</h3>
            )
        }
    }
    
    return(
        <Page>
            <Title>
            <HeaderToggle/>
            </Title>
            <form onSubmit={(event)=>validate(event)}>
            <input
            type="number"
            value={value}
            onChange={e=> setValue(e.target.value)}
            placeholder= "Valor"
            min={1}
            required
            ></input>
            <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder= "Descrição"
            required
            ></input>
            <ButtonToggle/>
            </form>
            <button className="cancel" onClick={()=>{navigate("/home")}}>Cancelar</button>
        </Page>
    )
}

export default Spending;

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #8C11BE;
    padding: 0 20px;
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
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
        background: ${(props) => props.isDisabled ? "#F2F2F2" : "#FFFFFF"};
        border-radius: 5px;
        border: none;
        margin-bottom: 13px;
        padding: 0 10px;
        box-sizing: border-box;
        ::placeholder{color: #000000}
    }

    button{
        width: 100%;
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
   
    .cancel{
        margin-top: 13px;
        background-color: #A075B1;
        color: #DCDCDC;
    }
    
`

const Title = styled.div`
    width: 326px;
`