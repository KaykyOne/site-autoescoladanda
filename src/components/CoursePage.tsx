import React from 'react'

interface Beneficio {
  icone: string
  texto: string
}

interface Passo {
  numero: string
  texto: string
}

interface Depoimento {
  texto: string
  autor: string
  profissao: string
  estrelas?: number
}

interface CursoPageProps {
  titulo: string
  subtitulo: string
  beneficios: Beneficio[]
  passos: Passo[]
  depoimento: Depoimento
  whatsappLink: string
  ctaTexto?: string
  ctaSecundarioTexto?: string
  documentos?: string
  validade?: string
  secaoComoFuncionaTexto?: string
  naoPercaTempo?: string
  vagasLimitadas?: string
}

export default function CoursePage({
  titulo,
  subtitulo,
  beneficios,
  passos,
  depoimento,
  whatsappLink,
  ctaTexto = 'Quero Garantir Minha Vaga',
  ctaSecundarioTexto = 'Falar no WhatsApp Agora',
  documentos = 'CNH categoria C, D ou E, Email e um telefone para contato.',
  validade = 'Certificado válido em todo o Brasil',
  secaoComoFuncionaTexto = 'Como Funciona',
  naoPercaTempo = 'Não Perca Tempo!',
  vagasLimitadas = 'Vagas limitadas toda semana'
}: CursoPageProps) {
  return (
    <main className="flex flex-col w-full items-center bg-white min-h-screen">

      {/* HERO */}
      <section className="w-full pt-36 pb-14 bg-gradient-to-br from-primary to-primary/90">
        <div className="max-w-6xl mx-auto text-center px-4">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {titulo}
          </h1>

          <p className="text-white/80 text-lg sm:text-xl font-medium mt-3">
            Curso Especializante 100% Online
          </p>

          <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mt-6 max-w-3xl mx-auto">
            {subtitulo}
          </p>

          <div className="mt-10">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-green-600 hover:bg-green-700 text-white text-lg sm:text-xl font-bold px-10 sm:px-14 py-5 sm:py-6 rounded-xl items-center justify-center gap-3 transition-all duration-200 shadow-2xl hover:scale-105 w-full sm:w-auto"
            >
              <img src="/icone-whatsapp.png" alt="WhatsApp" height="28" width="28" loading="lazy" />
              {ctaTexto}
            </a>

            <p className="text-white/80 text-sm mt-4">
              Atendimento realizado pela <strong>NovusTech</strong>, parceira oficial dos cursos online.
            </p>
          </div>

        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="w-full py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {beneficios.map((beneficio, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all border border-neutral-100"
              >
                <span className="material-symbols-outlined text-primary text-6xl mb-4 block">
                  {beneficio.icone}
                </span>
                <p className="text-neutral-800 font-bold text-xl">
                  {beneficio.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREÇO */}
      <section className="w-full py-16 bg-gradient-to-br from-secondary to-secondary/90">
        <div className="max-w-6xl mx-auto text-center px-4">

          <p className="text-white/90 text-lg uppercase tracking-wider font-semibold mb-3">
            Oferta Especial por Tempo Limitado
          </p>

          <p className="text-white/60 line-through text-lg mb-2">
            De R$380,00
          </p>

          <div className="bg-white rounded-2xl px-10 py-8 inline-block shadow-2xl">
            <p className="text-secondary text-6xl sm:text-7xl font-extrabold">
              R$285,99
            </p>
          </div>

          <p className="text-white text-xl font-semibold mt-6">
            Ou 12x de R$31,66 no cartão
          </p>

          <p className="text-white/80 text-base mt-3">
            Certificado válido em todo o Brasil • Início imediato
          </p>

        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-neutral-900 mb-12">
            {secaoComoFuncionaTexto}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {passos.map((passo, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5 shadow-lg">
                  {passo.numero}
                </div>
                <p className="text-neutral-800 font-bold text-xl">
                  {passo.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTO */}
      <section className="w-full py-16 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-10 shadow-xl border border-neutral-100 text-center">

            <div className="flex justify-center gap-1 mb-5">
              {[...Array(depoimento.estrelas || 5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-yellow-400 text-2xl">
                  star
                </span>
              ))}
            </div>

            <p className="text-neutral-700 text-xl leading-relaxed mb-6">
              "{depoimento.texto}"
            </p>

            <p className="text-primary font-bold text-lg">
              {depoimento.autor}
            </p>
            <p className="text-neutral-500 text-sm">
              {depoimento.profissao}
            </p>

          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="w-full py-16 bg-gradient-to-br from-primary to-primary/90">
        <div className="max-w-6xl mx-auto text-center px-4">

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {naoPercaTempo}
          </h2>

          <p className="text-white/90 text-xl mb-8">
            {vagasLimitadas}
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-green-600 hover:bg-green-700 text-white text-lg sm:text-xl font-bold px-10 sm:px-14 py-5 sm:py-6 rounded-xl items-center justify-center gap-3 transition-all duration-200 shadow-2xl hover:scale-105 w-full sm:w-auto"
          >
            <img src="/icone-whatsapp.png" alt="WhatsApp" height="28" width="28" loading="lazy" />
            {ctaSecundarioTexto}
          </a>

        </div>
      </section>

      {/* INFO EXTRA */}
      <section className="w-full py-10 bg-neutral-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-neutral-700 text-sm sm:text-base mb-3">
            <strong>Documentos necessários:</strong> {documentos}
          </p>
          <p className="text-neutral-700 text-sm sm:text-base font-medium">
            {validade}
          </p>
        </div>
      </section>

    </main>
  )
}
