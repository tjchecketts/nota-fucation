const template = `
  <span class='notaText'></span>
  <progress id='notaProgressBar' max=1 value=1></progress>
  <button id='notaClose'>X</button>
  <style> @import "./toast.css"; </style>
`;

customElements.define('nota-toast', class NotaToast extends HTMLElement {
  constructor() {
    super();
    this.message = this.getAttribute('message');
    this.hideCloseButton = this.hasAttribute('hide-close-button');
    this.addEventListener('change', this.redraw, {passive: true});
    let shadow = this.attachShadow({mode:'open'});
    Array.from((new DOMParser()).parseFromString(template, 'text/html').body.children).forEach(child => shadow.appendChild(child));

    this.messageSpan = shadow.querySelector('.notaText');
    this.selfDestructProgressBar = shadow.getElementById('notaProgressBar')

    this.notaClose = shadow.getElementById('notaClose');
    this.notaClose.addEventListener('click', this.destroy.bind(this));

    this.startTime = Date.now();
    this.maxTime = parseInt(this.getAttribute('max-time') || 7000);
    this.hovering = false;
    this.selfDestructCounter = 0;

    //TODO if index element - nota-fucation
      // local vs global
    //TODO add optional selfDestruct
      // if it doesnt selfDestruct, then there should be no progress bar
    //TODO add toggle progress bar
      // hides progress bar
      // change the constant checking every 40 ms
    //TODO add toggle pause on hover
    //TODO max limit/queueing system for excessive nota-fucations
    //TODO with queue: persistent to Local storage when marked as persisten/important
    // TODO => Library specific interfaces for js frameworks (React etc)


    if (this.maxTime > 0) {
      this.selfDestructInterval = setInterval(this.updateSelfDestruct.bind(this), 40);
    }

    this.addEventListener('mouseover', this.mouseOver);
    this.addEventListener('mouseout', this.mouseOut);
  }

  static get observedAttributes() { 
    return [
      'message', 'hide-close-button', 'max-time'
    ];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    let changed = false;
    if (name === 'message' && oldVal !== newVal) {
      this.message = newVal;
      changed = true;
    }

    if (name === 'hide-close-button' && oldVal !== newVal) {
      this.hideCloseButton = this.hasAttribute('hide-close-button');
      changed = true;
    }

    if (name === 'max-time' && oldVal !== newVal) {
      this.maxTime = parseInt(this.getAttribute('max-time'));
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
    // notaShower = should be hidden
    if (this.notaClose.classList.contains('notaShower') && !this.hideCloseButton) {
      this.notaClose.classList.remove('notaShower');
    } else if (!this.notaClose.classList.contains('notaShower') && this.hideCloseButton) {
      this.notaClose.classList.add('notaShower');
    }
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
