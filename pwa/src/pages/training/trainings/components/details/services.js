export const initalData = {
    confirmButtonLabel: '',
    cancelButtonLabel: '',
    successMessage: '',
    errorMessage: '',
    onConfirm: () => null,
    onModalConfirm: () => null
};

export const initialModal = {
    description: '',
    children: false,
    motivo: ''
};

export const labels = {
    page: {
        subscription: {
            confirmButtonLabel: 'Confirmar inscriçāo',
            cancelButtonLabel: 'Nāo, cancelar',
            successMessage: 'Inscriçāo realizada com sucesso!'
        },
        close: {
            confirmButtonLabel: 'Fechar',
            cancelButtonLabel: ''
        },
        confirm: {
            confirmButtonLabel: 'Confirmar participação',
            cancelButtonLabel: 'Recusar participação',
            successMessage: 'Confirmaçāo realizada com sucesso!'
        },
        cancel: {
            confirmButtonLabel: 'Cancelar participação',
            cancelButtonLabel: ''
        },
        perform: {
            confirmButtonLabel: 'Realizar avaliação',
            cancelButtonLabel: ''
        },
        proof: {
            confirmButtonLabel: 'Anexar comprovantes',
            cancelButtonLabel: ''
        }
    },
    modal: {
        confirm: 'Este treinamento vencerá em XX dias. Deseja continuar?',
        cancel: 'Este treinamento vencerá em XX dias. Ao prosseguir, sua inscrição será cancelada e o seu gestor será notificado. Deseja cancelar?'
    }
};
