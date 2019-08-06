// HTML goes here
// templates MUST go after the divs
import './toast.js';

const template = `
<div id='top-left'></div>
<div id='top-flex'>
    <div id='top-middle'></div>
</div>
<div id='top-right'></div>
<div id='bottom-left'></div>
<div id='bottom-right'></div>
<style> @import "index.css"; </style>
`;

customElements.define('nota-fucation', class NotaFucation extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({mode:'open'});
        Array.from((new DOMParser()).parseFromString(template, 'text/html').body.children).forEach(child => shadow.appendChild(child));
        this.topLeft = shadow.getElementById('top-left');
        this.topMiddle = shadow.getElementById('top-middle');
        this.topRight = shadow.getElementById('top-right');
        this.bottomLeft = shadow.getElementById('bottom-left');
        this.bottomRight = shadow.getElementById('bottom-right');
        this.notaToastTemplate = shadow.getElementById('nota-toast-template');
        this.notaDialogTemplate = shadow.getElementById('nota-dialog-template');
        document.addEventListener('notaToast', this.handleNotaToast.bind(this));
    }

    handleNotaToast(event) {
        event.stopPropagation();
        let thereBeToast = document.createElement('nota-toast');
        
        if (!event.message) {
            console.error('no message provided');
            // TODO - put back in when ready
            // return;
        }

        thereBeToast.setAttribute('message', event.message || 'default message');
        if (event.hasOwnProperty('hideCloseButton')) {
            thereBeToast.setAttribute('hide-close-button', 'true');
        }
        if (event.maxTime) {
            thereBeToast.setAttribute('max-time', event.maxTime);
        }

        const notaClassList = [
            'danger',
            'warn',
            'info',
            'error',
            'success',
            'failure',
        ];

        if (notaClassList.includes(event.class)) {
            thereBeToast.classList.add(event.class);
        }

        switch (event.position) {
            case 'top-left':
                this.topLeft.appendChild(thereBeToast);
                break;
            case 'top-middle':
                this.topMiddle.appendChild(thereBeToast);
                break;
            case 'top-right':
                this.topRight.appendChild(thereBeToast);
                break;
            case 'bottom-left':
                this.bottomLeft.appendChild(thereBeToast);
                break;
            case 'bottom-right':
            default:
                this.bottomRight.appendChild(thereBeToast);
        }
    }
});
