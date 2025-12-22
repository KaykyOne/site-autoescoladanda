import { set } from 'astro:schema';
import React, { useState, useEffect } from 'react'

type tipos = 'carroMoto' | 'moto' | 'carro'
const valorOriginalAula = 100
const custoAluguelCarro = 49.99;

const taxas: any = {
    1: 3.51,
    2: 4.36,
    3: 5.15,
    4: 5.93,
    5: 6.72,
    6: 7.51,
    7: 8.86,
    8: 9.65,
    9: 10.43,
    10: 11.22,
    11: 12.00,
    12: 12.78,
    13: 13.57,
    14: 14.35,
    15: 15.14,
    16: 15.92,
    17: 16.70,
    18: 17.49
};

export default function Calculator() {
    const [numAulasMoto, setNumAulasMoto] = useState<number>(2)
    const [numAulasCarro, setNumAulasCarro] = useState<number>(2)
    const [tipo, setTipo] = useState<tipos>('carroMoto')
    const [valorTotal, setValorTotal] = useState<number>(0)
    const [valorTotalSemJuros, setValorTotalSemJuros] = useState<number>(0)
    const [valorPorAula, setValorPorAula] = useState<number>(0)
    const [valorAluguel, setValorAluguel] = useState<number>(0)
    const [valorAula, setValorAula] = useState<number>(100)
    const [numeroParcelas, setNumeroParcelas] = useState<number>(1)

    useEffect(() => {
        setNumAulasMoto(2)
        setNumAulasCarro(2)
    }, [tipo])

    useEffect(() => {
        calcularValorComDesconto()
    }, [numAulasMoto, numAulasCarro, tipo])

    useEffect(() => {
        if (numeroParcelas > 6) {
            const resultado = calcularValorComJuros(valorTotalSemJuros, numeroParcelas)
            setValorTotal(resultado)
        } else {
            setValorTotal(valorTotalSemJuros)
        }
    }, [numeroParcelas, valorTotalSemJuros])

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

    function calcularValorComJuros(valor: number, parcelas: number) {
        // const TAXA_BASE = 0.0351;        // 3,51%
        // const JUROS_MENSAL = 0.018;      // 1,8%

        return taxas[parcelas] ? valor * (1 + taxas[parcelas] / 100) : valor;
    }

    const RenderInputs = () => {
        if (tipo === 'moto') {
            return (
                <div className='flex flex-col animcao-entrada'>
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
                <div className='flex flex-col animcao-entrada'>
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
                <div className='flex flex-col animcao-entrada'>
                    <label htmlFor='aulasMoto' className='mt-6 text-lg font-medium'>Número de aulas de moto:</label>
                    <div className='flex gap-2 items-center'>
                        <button className='input-button' onClick={() => alterarAulas('moto', numAulasMoto - 1)}>-</button>
                        <h1>{numAulasMoto}</h1>
                        <button className='input-button' onClick={() => alterarAulas('moto', numAulasMoto + 1)}>+</button>
                    </div>
                </div>
                <div className='flex flex-col animcao-entrada'>
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

    const calcularValorComDesconto = () => {
        let aulasTotais = 0;
        let valorAluguel = calcularCustoAluguel();
        let valorAulaLocal = 100;

        if (tipo) {
            if (tipo === 'carro') {
                aulasTotais = numAulasCarro;
            }

            if (tipo === 'moto') {
                aulasTotais = numAulasMoto;
            }

            if (tipo === 'carroMoto') {
                aulasTotais = numAulasCarro + numAulasMoto;
            }
        }
        if (aulasTotais >= 10 && aulasTotais < 15) {
            valorAulaLocal = 90;
        }
        else if (aulasTotais >= 15 && aulasTotais < 20) {
            valorAulaLocal = 85;
            valorAluguel = valorAluguel / 2 - 0.01;
        }
        else if (aulasTotais >= 20) {
            valorAulaLocal = 80;
            valorAluguel = 0;
        } else {
            valorAulaLocal = 100;
            valorAluguel = calcularCustoAluguel();
        }

        const valorT = ((aulasTotais * valorAulaLocal) + valorAluguel)
        setValorAula(valorAulaLocal);
        setValorTotalSemJuros(valorT);
        setValorPorAula(aulasTotais > 0 ? (valorT - valorAluguel) / aulasTotais : 0);
        setValorAluguel(valorAluguel);
    }

    const calcularCustoAluguel = () => {
        if (tipo === 'carro' || tipo === 'moto') {
            return custoAluguelCarro
        }
        return custoAluguelCarro * 2 + 0.01
    }


    const testDescontoAula = valorOriginalAula - valorAula > 0 ? true : false;
    const testDescontoAluguel = calcularCustoAluguel() - valorAluguel;
    const descontoAluguel = testDescontoAluguel * 100 / calcularCustoAluguel();
    const descontoAula = (valorOriginalAula - valorAula) * 100 / valorOriginalAula;


    const DivDescontoAula = () => {
        return (
            <div className='bg-amber-600 flex flex-col p-3 rounded-lg mt-5'>
                <h1>Você recebeu um desconto de <strong>{descontoAula.toFixed(0)}%</strong> nas aulas!</h1>
            </div>
        )
    }

    const DivDescontoVeiculo = () => {
        return (
            <div className='bg-green-600 flex flex-col p-3 rounded-lg mt-5'>
                <h1>Você recebeu um desconto de <strong>{descontoAluguel.toFixed(0)}%</strong> no aluguel dos veículos!</h1>
            </div>
        )
    }

    const reset = () => {
        setNumAulasMoto(2)
        setNumAulasCarro(2)
        setValorAula(100)
        setTipo('carroMoto')
        setNumeroParcelas(1)
    }

    return (
        <div className='w-full bg-linear-65 p-8 from-primary/80 to-primary text-white rounded-3xl shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1'>
            <div className='flex flex-col'>

                <h3 className='text-md uppercase opacity-70'>Descubra qual o pacote</h3>
                <h1 className='text-6xl font-semibold'>Perfeito para você</h1>
                <h2 className='text-2xl font-light mt-2'>Configure a melhor forma de tirar a sua CNH!</h2>

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
                <div className='mt-3 gap-4 flex flex-col'>
                    <label htmlFor='numeroParcelas' className='mt-6 text-lg font-medium'>Número de parcelas: {numeroParcelas}</label>
                    <input type="range" name="numeroParcelas" value={numeroParcelas} min={1} max={18} onChange={(e) => setNumeroParcelas(Number(e.target.value))} />
                </div>
                <div className='grid-cols-1 lg:grid-cols-2 gap-2 mt-5 hidden lg:grid'>
                    <button className='bg-secondary py-3 px-6 text-white w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity' onClick={() => reset()}>
                        Reiniciar
                    </button>
                    <button className='bg-green-700 py-3 px-6 text-white w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity'>
                        Quero iniciar agora!
                    </button>
                </div>
            </div>
            <div className='flex flex-col ga-1'>
                <h3 className='text-xl'>Valor total aproximado:</h3>
                <h1 className='text-6xl font-semibold'>{formatter.format(valorTotal)}</h1>
                {numeroParcelas > 1 && <p className='mt-3 opacity-00 font-light'>ou em <strong className='uppercase font-semibold text-2xl'>{numeroParcelas}x</strong> de <strong className='uppercase font-semibold text-2xl'>{formatter.format(valorTotal / numeroParcelas)}</strong> {valorTotal == valorTotalSemJuros ? 'SEM JUROS' : 'com juros da maquininha'}</p>}
                <h3 className='text-xl mt-10'>Valor por aula aproximado:</h3>
                <h1 className='text-4xl font-semibold'>{formatter.format(valorPorAula)}</h1>
                {testDescontoAula && <DivDescontoAula />}
                {(testDescontoAluguel > 0) && <DivDescontoVeiculo />}
                <div className='grid grid-cols-1 gap-2 mt-5  lg:hidden'>
                    <button className='bg-secondary py-3 px-6 text-white w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity' onClick={() => reset()}>
                        Reiniciar
                    </button>
                    <button className='bg-green-700 py-3 px-6 text-white w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity'>
                        Quero iniciar agora!
                    </button>
                </div>
            </div>
        </div>
    )
}
