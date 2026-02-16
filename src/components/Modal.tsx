import React, { useEffect, useState } from 'react'

interface ModalProps {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl',
    nome: string
}

export default function Modal({
    children,
    size = 'md',
    nome,
}: ModalProps) {
    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => setIsOpen(false)

    useEffect(() => {
        const modalKey = `modal-${nome}`
        const isClosed = sessionStorage.getItem(modalKey) === 'closed'
        console.log(`Modal ${nome} isClosed:`, isClosed)
        if (!isClosed) {
            setIsOpen(true)
        }
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
            sessionStorage.setItem(`modal-${nome}`, 'closed')
        }
    }, [isOpen])

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-2xl'
    }

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-99 animate-in fade-in duration-200"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none ${isOpen ? 'animate-in fade-in zoom-in-95 duration-300' : 'animate-out fade-out zoom-out-95 duration-200'
                    }`}
            >
                <div
                    className={`bg-white z-50 rounded-2xl shadow-2xl w-full ${sizeClasses[size]} pointer-events-auto overflow-hidden`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='flex justify-end px-4 pt-4'>
                        <button
                            onClick={onClose}
                            className="ml-auto text-gray-500 hover:text-gray-900 transition-colors p-1 -mr-2"
                            aria-label="Fechar"
                        >
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>
                    </div>

                    <div className="px-4 pb-4">
                        {children}
                        <button onClick={onClose} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors w-full cursor-pointer flex gap-2 items-center justify-center">
                            Aproveitar
                            <span className="material-symbols-outlined">
                                celebration
                            </span>
                        </button>
                        <button onClick={onClose} className="mt-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors w-full cursor-pointer flex gap-2 items-center justify-center">
                            Fechar
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
