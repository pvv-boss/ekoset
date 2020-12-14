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


export const formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    const cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct length
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };

    return null
};