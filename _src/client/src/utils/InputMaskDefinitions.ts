export const phoneNumberMask = {
    mask: "+{7} (000) 000-00-00",
    definitions: {
        "#": /[0-7,9]/,
    },
    // placeholder: {},
    lazy: false,
};

export const mailMask = {
    mask: "*",
    definitions: {
        "#": /[0-7,9]/,
    },
};
