const template = `
<div class='notaToast'>
    <span class='notaText'></span>
    <button id='notaClose'>X</button>
</div>
`;

customElements.define('nota-toast', class NotaToast extends HTMLElement {
  constructor() {
    super();
    this.message = '';
    this.addEventListener('change', this.redraw, {passive: true});
    let shadow = this.attachShadow({mode:'open'});
    Array.from((new DOMParser()).parseFromString(template, 'text/html').body.children).forEach(child => shadow.appendChild(child));
    this.messageSpan = shadow.querySelector('.notaText');

    shadow.getElementById('notaClose').addEventListener('click', this.destroy.bind(this));

    this.startTime = Date.now();
    this.maxTime = 5000;

    this.currentTimeout = setTimeout(this.destroy.bind(this), this.maxTime);

    this.addEventListener('mouseover', this.mouseOver);
    this.addEventListener('mouseout', this.mouseOut);
  }

  static get observedAttributes() { return ['message']; }

  attributeChangedCallback(name, oldVal, newVal) {
    let changed = false;
    if (name === 'message' && oldVal !== newVal) {
      this.message = newVal;
      changed = true;
    }

    if (changed) {
      this.dispatchEvent(new Event('change'));
    }
  }

  connectedCallback() {

  }

  redraw() {
    this.messageSpan.innerText = this.message;
  }

  mouseOver() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
      this.maxTime = this.maxTime - (Date.now() - this.startTime);
    }
  }

  mouseOut() {
    if (!this.currentTimeout) {
      this.startTime = Date.now();
      this.currentTimeout = setTimeout(this.destroy.bind(this), this.maxTime);
    }
  }

  destroy() {
    this.parentNode.removeChild(this);
  }
});
