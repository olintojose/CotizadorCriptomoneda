import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useMoneda';

import axios from 'axios';
const Boton = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #66a2fe;
border: none;
width:100%;
border-radius: 10px;
color: #FFF;
transition: background-color .3s ease;

&:hover {
    background-color: #326AC0;
    cursor: pointer;
}

`;

const Formulario = () => {

    // State del listad de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar EEUU' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ]

    //utilizar useMoneda

    const [ moneda, SelectMonedas ]= useMoneda('Elige tu moneda','', MONEDAS);

    //utilizar useCriptomoneda

    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);
//https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD
//Ejecuar llamada a Api

    useEffect(() => {
        const consultarAPI =  async () => {
            console.log('Pasa por aqui 1 useeffect');

            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    },[]) ;
    return(
<form>
    <SelectMonedas />

    <SelectCripto />
    <Boton
        type="submit"
        value="Calcular"
    />

</form>

    );
}

export default Formulario