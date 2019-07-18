const template = `
<div class='notaToast'>
    <span class='notaText'></span>
    <button id='notaClose'>X</button>
    <progress id='notaProgressBar' max=1 value=1></progress>
</div>
<style> @import "toast.css"; </style>
`;

customElements.define('nota-toast', class NotaToast extends HTMLElement {
  constructor() {
    super();
    this.message = '';
    this.addEventListener('change', this.redraw, {passive: true});
    let shadow = this.attachShadow({mode:'open'});
    Array.from((new DOMParser()).parseFromString(template, 'text/html').body.children).forEach(child => shadow.appendChild(child));

    this.messageSpan = shadow.querySelector('.notaText');
    this.selfDestructProgressBar = shadow.getElementById('notaProgressBar')

    shadow.getElementById('notaClose').addEventListener('click', this.destroy.bind(this));

    this.startTime = Date.now();
    this.maxTime = 0;
    this.hovering = false;
    this.selfDestructCounter = 0;

    if (this.maxTime > 0) {
      this.selfDestructInterval = setInterval(this.updateSelfDestruct.bind(this), 40);
    }

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
    this.selfDestructProgressBar.value = 1 - (this.selfDestructCounter / this.maxTime);
  }

  mouseOver() {
    this.hovering = true;
  }

  mouseOut() {
    this.hovering = false;
  }

  updateSelfDestruct() {
    if (!this.hovering) {
      this.selfDestructCounter += 40;
      this.dispatchEvent(new Event('change'));
    }
    if (this.selfDestructCounter >= this.maxTime) {
      this.destroy();
    }
  }

  destroy() {
    clearInterval(this.selfDestructInterval);
    this.parentNode.removeChild(this);
  }
});
