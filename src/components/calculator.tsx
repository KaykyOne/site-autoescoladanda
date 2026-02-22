import React, { useState, useEffect, type JSX } from 'react'

type tipos = 'carroMoto' | 'moto' | 'carro'
const valorOriginalAula = 150
const custoAluguelPorVeiculo = 49.99;
const numeroParcelasMaximo = 18;
const numeroParcelasSemJuros = 3;

const taxas: Record<number, number> = {
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
    const [valorAula, setValorAula] = useState<number>(valorOriginalAula)
    const [numeroParcelas, setNumeroParcelas] = useState<number>(numeroParcelasSemJuros)
    const [aulasTotaisSoma, setAulasTotaisSoma] = useState<number>(4)

    useEffect(() => {
        setNumAulasMoto(2)
        setNumAulasCarro(2)
    }, [tipo])

    useEffect(() => {
        calcularValorComDesconto()
    }, [numAulasMoto, numAulasCarro, tipo])

    useEffect(() => {
        if (numeroParcelas > numeroParcelasSemJuros) {
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
        if (!tipo) return null;

        const tiposInput: tipos[] = [];
        if (tipo === 'carro') tiposInput.push('carro');
        if (tipo === 'moto') tiposInput.push('moto');
        if (tipo == 'carroMoto') {
            tiposInput.push('carro');
            tiposInput.push('moto');
        }

        return (
            <div className='flex flex-col gap-2 mt-3'>
                {
                    tiposInput.map((t) => (
                        <div className='flex flex-col gap-1' key={t}>
                            <div className='flex gap-2 items-center justify-between bg-gray-100 p-2 px-4 rounded-lg capitalize'>
                                <h1 className='text-sm text-gray-800'>Número de aulas de {t}: <span className='font-semibold text-primary'>{t == 'carro' ? numAulasCarro : numAulasMoto}</span></h1>

                                <div className='flex gap-2'>
                                    <button
                                        className='border border-gray-300 bg-white hover:bg-gray-50 p-3 rounded-lg w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer transition'
                                        onClick={() => alterarAulas(t, t == 'carro' ? numAulasCarro - 1 : numAulasMoto - 1)}
                                    >
                                        -
                                    </button>

                                    <button
                                        className='border border-gray-300 bg-white hover:bg-gray-50 p-3 rounded-lg w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer transition'
                                        onClick={() => alterarAulas(t, t == 'carro' ? numAulasCarro + 1 : numAulasMoto + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        );
    };

    const calcularValorComDesconto = () => {
        let aulasTotais = 0;
        let valorAluguel = calcularCustoAluguel();
        let valorAulaLocal = valorOriginalAula;

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
        if (aulasTotais > 4 && aulasTotais <= 6) {
            valorAulaLocal = valorOriginalAula * 0.88889;
            console.log(valorAulaLocal);
        }
        else if (aulasTotais >= 7 && aulasTotais < 10) {
            valorAulaLocal = valorOriginalAula * 0.75;
        }
        else if (aulasTotais >= 10) {
            valorAulaLocal = valorOriginalAula * 0.6666;
        }
        else if (aulasTotais >= 15 && aulasTotais < 20) {
            valorAluguel = valorAluguel / 2 - 0.01;
        }
        else if (aulasTotais >= 20) {
            valorAluguel = 0;
        } else {
            valorAulaLocal = valorOriginalAula;
            valorAluguel = calcularCustoAluguel();
        }
        console.log(valorAulaLocal);

        setAulasTotaisSoma(aulasTotais)
        const valorT = ((aulasTotais * valorAulaLocal) + valorAluguel)
        setValorAula(valorAulaLocal);
        setValorTotalSemJuros(valorT);
        setValorPorAula(aulasTotais > 0 ? (valorT - valorAluguel) / aulasTotais : 0);
        setValorAluguel(valorAluguel);
    }

    const calcularCustoAluguel = () => {
        if (tipo === 'carro' || tipo === 'moto') {
            return custoAluguelPorVeiculo
        }

        return custoAluguelPorVeiculo * 2 + 0.01
    }

    const DivDescontoAula = () => {
        return (
            <div className="relative flex mt-3 overflow-hidden rounded-lg border border-secondary/50 bg-secondary/10 p-3 shadow-sm min-h-24 justify-start items-center">
                <div className="relative z-10 flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-4xl">
                        local_offer
                    </span>

                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wide text-gray-600">
                            Desconto aplicado
                        </span>

                        <span className="text-base text-gray-800 font-light">
                            Você recebeu
                            <strong className="ml-1 font-semibold text-secondary">
                                {descontoAula.toFixed(0)}%
                            </strong>
                            {' '}nas aulas
                        </span>
                    </div>
                </div>
            </div>

        )
    }

    const DivDescontoVeiculo = () => {
        return (
            <div className="relative mt-3 flex overflow-hidden rounded-lg border border-primary/50 bg-primary/10 p-3 shadow-sm min-h-24 justify-start items-center">
                <div className="relative z-10 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-4xl">
                        directions_car
                    </span>

                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wide text-gray-600">
                            Desconto no aluguel
                        </span>

                        <span className="text-base text-gray-800 font-light">
                            Você recebeu
                            <strong className="ml-1 font-semibold text-primary">
                                {descontoAluguel.toFixed(0)}%
                            </strong>
                            {' '}no aluguel dos veículos
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    const Detalhes = () => {
        return (
            <div className='bg-gray-50 p-3 rounded-lg border border-gray-200 w-full h-full mt-3'>
                <h2 className='text-base font-medium mb-2 text-gray-900 uppercase'>Incluido no pacote:</h2>
                <ul className='flex flex-col list-disc list-inside text-sm text-gray-700'>
                    {tipo.toLocaleLowerCase().includes("carro") && <li>{numAulasCarro} x Aulas de Carro</li>}
                    {tipo.toLocaleLowerCase().includes("moto") && <li>{numAulasMoto} x Aulas de Moto</li>}
                    <li>Veículo incluso no exame prático</li>
                    <li>Agendamento feito por nós</li>
                    {aulasTotaisSoma >= 6 && <li>Base Teórica para Aprendizado Eficiente</li>}
                    {aulasTotaisSoma >= 8 && <>
                        <li>Processo 100% personalizado</li>
                        <li>Monitoramento de aprendizagem ESPECIAL</li>
                    </>}
                </ul>
            </div>
        )
    }

    const reset = () => {
        setNumAulasMoto(2)
        setNumAulasCarro(2)
        setValorAula(valorOriginalAula)
        setTipo('carroMoto')
        setNumeroParcelas(numeroParcelasSemJuros)
    }

    const enviarMensagem = () => {
        const mensagem = `Olá, gostaria de iniciar meu processo para tirar a CNH com o seguinte plano:%0A%0A` +
            `Tipo: ${tipo === 'carroMoto' ? 'Carro e Moto' : tipo === 'carro' ? 'Apenas Carro' : 'Apenas Moto'}%0A` +
            `Número de aulas de ${tipo === 'carroMoto' ? `carro: ${numAulasCarro}%0ANúmero de aulas de moto: ${numAulasMoto}%0A` : (tipo === 'carro' ? `carro: ${numAulasCarro}%0A` : `moto: ${numAulasMoto}%0A`)}` +
            `Número de parcelas: ${numeroParcelas}%0A` +
            `Valor Aproximado ${formatter.format(valorTotal)}%0A` +
            `${numeroParcelas > numeroParcelasSemJuros ? 'Com juros da maquininha inclusos!%0A%0A' : 'SEM JUROS%0A%0A'}` +
            `Por favor, me envie mais informações sobre como proceder. Obrigado!`;
        window.open(`https://wa.me/5567981368080?text=${mensagem}`, '_blank');
    }

    const Buttons = () => {
        return (
            <div className='grid-cols-1 lg:grid-cols-5 gap-2 mt-3 grid'>
                <button className='border border-gray-300 bg-gray-100 col-span-2 hover:bg-gray-200 transition-all duration-300 py-2 px-4 text-gray-800 text-sm w-full rounded-lg cursor-pointer hover:opacity-90' onClick={() => reset()}>
                    Reiniciar
                </button>
                <button className='bg-primary border col-span-3 border-primary hover:opacity-90 transition-all duration-300 py-2 px-4 text-white w-full rounded-lg cursor-pointer' onClick={() => enviarMensagem()}>
                    Quero iniciar agora!
                    <p className='text-[9px] text-white/90'>Leva menos de 2 minutos!</p>
                </button>
            </div>
        )
    }

    const Part2 = () => (
        <div className='flex flex-col gap-1'>
            <h1 className='text-3xl lg:text-5xl font-semibold text-gray-900'>{formatter.format(valorTotal)}</h1>
            {numeroParcelas > 1 ? <p className='mt-1 opacity-80 font-light text-sm text-gray-600'>ou em <strong className='uppercase font-semibold text-lg text-gray-800'>{numeroParcelas}x</strong> de <strong className='uppercase font-semibold text-lg text-primary'>{formatter.format(valorTotal / numeroParcelas)}</strong> {valorTotal == valorTotalSemJuros ? 'SEM JUROS' : 'com juros'}</p> : <p className='text-sm text-gray-600'>A vista</p>}
            <details className='mt-5'>
                <summary className='cursor-pointer text-sm text-gray-600 flex justify-between items-center'>
                    <div className='flex gap-2 items-center -ml-2'>
                        <span className="material-symbols-outlined">
                            arrow_right
                        </span>
                        Como é calculado o valor?
                    </div>
                    <span className="material-symbols-outlined">
                        touch_app
                    </span>
                </summary>
                <div className=' border-l border-neutral-400 p-4'>
                    <h3 className='text-xs mt-2 text-gray-600'>Valor por aula aproximado:</h3>
                    <h1 className='text-lg font-semibold text-primary'>{formatter.format(valorPorAula)}</h1>
                    <h3 className='text-xs mt-2 text-gray-600'>{`Valor Atual do Aluguel do(s) veiculo(s)`}</h3>
                    <h1 className='text-lg font-semibold text-primary'>{valorAluguel > 0 ? formatter.format(valorAluguel) : 'Grátis!'}
                        <p className='text-xs text-gray-500'>* O aluguel é incluso no valor do plano!</p>
                        <p className="text-xs text-gray-500">
                            * O valor do aluguel incluído neste pacote é válido apenas para o primeiro exame de cada categoria. Em caso de reprovação, será necessário efetuar um novo pagamento do aluguel.
                        </p>
                    </h1>
                </div>
            </details>
            <details className='mt-5 cursor-pointer text-sm text-gray-600'>
                <summary className='cursor-pointer text-sm text-gray-600 flex justify-between items-center'>
                    <div className='flex gap-2 items-center -ml-2'>
                        <span className="material-symbols-outlined">
                            arrow_right
                        </span>
                        O que está incluso no plano?
                    </div>
                    <span className="material-symbols-outlined">
                        touch_app
                    </span>
                </summary>
                <div className='border-l border-neutral-400 p-4'>
                    <Detalhes />
                    <p className='text-xs mt-2 text-gray-500'>* Os valores apresentados não incluem taxas e exames adicionais.</p>
                </div>
            </details>

            <Buttons />
        </div>
    )


    const descontoAluguelValor = calcularCustoAluguel() - valorAluguel;
    const temDescontoAluguel = descontoAluguelValor > 0;
    const descontoAluguel = descontoAluguelValor * 100 / calcularCustoAluguel();

    const testDescontoAula = valorOriginalAula - valorAula > 0 ? true : false;
    const descontoAula = (valorOriginalAula - valorAula) * 100 / valorOriginalAula;

    const cssSelecionado = 'bg-primary p-3 rounded-lg justify-center items-center flex flex-col gap-1 w-full text-white cursor-pointer transition-all duration-300';
    const cssPadrao = 'bg-gray-100 p-3 rounded-lg justify-center items-center border-2 border-gray-200 flex flex-col gap-1 w-full text-gray-700 cursor-pointer hover:border-gray-300 hover:bg-gray-200/50 transition-all duration-300';


    return (
        <div className='w-full bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-3 transition-all duration-300'>
            <div className='flex flex-col relative'>
                <div className='opacity-100 flex gap-2 items-center justify-start mb-3'>
                    <div className='bg-gray-300 rounded-full h-2 w-2'></div>
                    <div className='bg-gray-300 rounded-full h-2 w-2'></div>
                    <div className='bg-gray-300 rounded-full h-2 w-2'></div>
                </div>
                <p className='text-lg font-semibold text-gray-800 mb-2'>{`Escolha o plano:`}</p>
                <div className='flex flex-col lg:flex-row gap-2'>
                    <div key={'carroMoto'} className={tipo === 'carroMoto' ? cssSelecionado : cssPadrao} onClick={() => setTipo("carroMoto")}>
                        <div className='flex gap-2'>
                            <span className="material-symbols-outlined !text-3xl">
                                directions_car
                            </span>
                            <span className="material-symbols-outlined !text-3xl">
                                two_wheeler
                            </span>
                        </div>

                        <input
                            type='radio'
                            name="drone"
                            value={'carroMoto'}

                            className='hidden'
                            readOnly
                            id="carroMoto"
                            checked={tipo === 'carroMoto'}
                        />
                        <label htmlFor='carroMoto' className={tipo === 'carroMoto' ? 'text-base font-light text-white' : 'text-base font-light text-gray-700'}>Carro e moto</label>
                    </div>
                    <div key={'moto'} className={tipo === 'moto' ? cssSelecionado : cssPadrao} onClick={() => setTipo("moto")}>
                        <span className="material-symbols-outlined !text-3xl">
                            two_wheeler
                        </span>
                        <input
                            readOnly
                            type='radio'
                            name="drone"
                            value={'moto'}
                            id="moto"
                            checked={tipo === 'moto'}
                            className='hidden'
                        />
                        <label htmlFor='moto' className={tipo === 'moto' ? 'text-base font-light text-white' : 'text-base font-light text-gray-700'}>Moto</label>
                    </div>
                    <div key={'carro'} className={tipo === 'carro' ? cssSelecionado : cssPadrao} onClick={() => setTipo("carro")}>
                        <span className="material-symbols-outlined !text-3xl">
                            directions_car
                        </span>
                        <input
                            readOnly
                            type='radio'
                            name="drone"
                            value={'carro'}
                            className='hidden'
                            id="carro"
                            checked={tipo === 'carro'}
                        />
                        <label htmlFor='carro' className={tipo === 'carro' ? 'text-base font-light text-white' : 'text-base font-light text-gray-700'}>Carro</label>
                    </div>
                </div>
                <RenderInputs />
                <div className='mt-2 gap-3 flex flex-col'>
                    <label htmlFor='numeroParcelas' className='mt-3 text-base font-medium text-gray-800'>Número de parcelas: <span className='text-primary font-semibold'>{numeroParcelas}</span></label>
                    <input type="range" name="numeroParcelas" value={numeroParcelas} min={1} max={numeroParcelasMaximo} onChange={(e) => setNumeroParcelas(Number(e.target.value))} className='accent-primary' />
                    <p className='text-xs font-light text-gray-600'>Parcelamento em até {numeroParcelasSemJuros}x é SEM JUROS</p>
                </div>
                {testDescontoAula && <DivDescontoAula />}
                {temDescontoAluguel && <DivDescontoVeiculo />}
            </div>
            <div className='border-t border-gray-200 pt-4'>
                <Part2 />
            </div>
        </div>

    )
}
