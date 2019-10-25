export sendDefaultToast = (props) => {
    const e = new Event('notaToast');
    Object.assign(e, props);
    document.dispatchEvent(e);
};

// error is the same as danger right now, no difference in style only in name
export sendDangerToast = (props) => {
    const e = new Event('notaToast');
    Object.assign(e, props);
    e.class = 'danger';
    document.dispatchEvent(e);
};

export sendFailureToast = (props) => {
    const e = new Event('notaToast');
    Object.assign(e, props);
    e.class = 'failure';
    document.dispatchEvent(e);
};

export sendWarnToast = (props) => {
    const e = new Event('notaToast');
    Object.assign(e, props);
    e.class = 'warn';
    document.dispatchEvent(e);
};

export sendInfoToast = (props) => {
    const e = new Event('notaToast');
    Object.assign(e, props);
    e.class = 'info';
    document.dispatchEvent(e);
};

export sendSuccessToast = (props) => {
    const e = new Event('notaToast');
    Object.assign(e, props);
    e.class = 'success';
    document.dispatchEvent(e);
};
