import React, { useState, useEffect } from 'react'

type tipos = 'carroMoto' | 'moto' | 'carro'
const valorAula = 100
const custoAluguelCarro = 49.99;

export default function Calculator() {
    const [numAulasMoto, setNumAulasMoto] = useState<number>(2)
    const [numAulasCarro, setNumAulasCarro] = useState<number>(2)
    const [tipo, setTipo] = useState<tipos>('carroMoto')

    useEffect(() => {
        setNumAulasMoto(2)
        setNumAulasCarro(2)
    }, [tipo])

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });

    const alterarAulas = (tip: tipos, valor: number) => {
        if (valor < 2) valor = 2
        if (tip === 'moto') {
            setNumAulasMoto(valor)
        } else if (tip === 'carro') {
            setNumAulasCarro(valor)
        }
    }

    const RenderInputs = () => {
        if (tipo === 'moto') {
            return (
                <div className='flex flex-col'>
                    <label htmlFor='aulasMoto' className='mt-6 text-lg font-medium'>Número de aulas de moto:</label>
                    <div className='flex gap-2 items-center'>
                        <button className='input-button' onClick={() => alterarAulas('moto', numAulasMoto - 1)}>-</button>
                        <h1>{numAulasMoto}</h1>
                        <button className='input-button' onClick={() => alterarAulas('moto', numAulasMoto + 1)}>+</button>
                    </div>
                </div>
            )
        } else if (tipo === 'carro') {
            return (
                <div className='flex flex-col'>
                    <label htmlFor='aulasCarro' className='mt-6 text-lg font-medium'>Número de aulas de carro:</label>
                    <div className='flex gap-2 items-center'>
                        <button className='input-button' onClick={() => alterarAulas('carro', numAulasCarro - 1)}>-</button>
                        <h1>{numAulasCarro}</h1>
                        <button className='input-button' onClick={() => alterarAulas('carro', numAulasCarro + 1)}>+</button>
                    </div>
                </div>
            )
        }

        return (
            <>
                <div className='flex flex-col'>
                    <label htmlFor='aulasMoto' className='mt-6 text-lg font-medium'>Número de aulas de moto:</label>
                    <div className='flex gap-2 items-center'>
                        <button className='input-button' onClick={() => alterarAulas('moto', numAulasMoto - 1)}>-</button>
                        <h1>{numAulasMoto}</h1>
                        <button className='input-button' onClick={() => alterarAulas('moto', numAulasMoto + 1)}>+</button>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='aulasCarro' className='mt-6 text-lg font-medium'>Número de aulas de carro:</label>
                    <div className='flex gap-2 items-center'>
                        <button className='input-button' onClick={() => alterarAulas('carro', numAulasCarro - 1)}>-</button>
                        <h1>{numAulasCarro}</h1>
                        <button className='input-button' onClick={() => alterarAulas('carro', numAulasCarro + 1)}>+</button>
                    </div>
                </div>
            </>
        )
    }

    const aplicarDesconto = (valor: number, desconto: number) => {
        return valor - (valor * (desconto / 100))
    }

    const calcularValorComDesconto = (valor: number) => {
        let valorDesconto = 0;
        if (numAulasCarro + numAulasMoto >= 10) {
            return valor - calcularCustoAluguel() - 0.02;
        }
        return valor + calcularCustoAluguel();
    }

    const calcularCustoAluguel = () => {
        if (tipo === 'carro' || tipo === 'moto') {
            return custoAluguelCarro
        }
        return custoAluguelCarro * 2 + 0.01
    }

    const valorTotal = calcularValorComDesconto((numAulasMoto * valorAula) + (numAulasCarro * valorAula));

    return (
        <div className='w-full bg-linear-65 from-primary/80 to-primary text-white p-5 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-10'>
            <div className='flex flex-col'>

                <h3 className='text-md uppercase opacity-70'>Descubra qual o pacote</h3>
                <h1 className='text-6xl font-semibold'>Perfeito para você</h1>
                <h2 className='text-2xl font-light'>Escolha a quantidade de aulas e </h2>

                <fieldset className='mt-8 flex gap-3'>
                    <legend className='mt-10 text-2xl font-medium'>Escolha o plano:</legend>
                    <div className='flex gap-1'>
                        <input
                            type='radio'
                            name="drone"
                            value={'carroMoto'}
                            id="carroMoto"
                            checked={tipo === 'carroMoto'}
                            onChange={(e) => setTipo(e.target.value as tipos)}
                        />
                        <label htmlFor='carroMoto' className='text-lg'>Carro e moto</label>
                    </div>
                    <div className='flex gap-1'>
                        <input
                            type='radio'
                            name="drone"
                            value={'moto'}
                            id="moto"
                            checked={tipo === 'moto'}
                            onChange={(e) => setTipo(e.target.value as tipos)}
                        />
                        <label htmlFor='moto' className='text-lg'>Moto</label>
                    </div>
                    <div className='flex gap-1'>
                        <input
                            type='radio'
                            name="drone"
                            value={'carro'}
                            id="carro"
                            checked={tipo === 'carro'}
                            onChange={(e) => setTipo(e.target.value as tipos)}
                        />
                        <label htmlFor='carro' className='text-lg'>Carro</label>
                    </div>
                </fieldset>
                <RenderInputs />

            </div>
            <div className='flex flex-col ga-1'>
                <h3 className='text-xl'>Valor total aproximado:</h3>
                <h1 className='text-6xl font-semibold'>{formatter.format(valorTotal)}</h1>
            </div>
        </div>
    )
}
