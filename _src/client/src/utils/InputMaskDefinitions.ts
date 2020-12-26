export const phoneNumberMask = {
    mask: "+{7} (000) 000-00-00",
    definitions: {
        "#": /[0-7,9]/,
    },
    // placeholder: {},
    lazy: false,
    overwrite: true
};

export const mailMask = {
    mask: "*",
    definitions: {
        "#": /[0-7,9]/,
    },
};


export const formatPhoneNumber = (phoneNumberString: string) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        const intlCode = (match[1] ? `+${match[1]} ` : '+7 ')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
};