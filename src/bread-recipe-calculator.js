import {LitElement, html, css} from 'lit-element';

export class BreadRecipeCalculator extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      label {
        width: var(--label-width, 100px);
        display: var(--label-display, inline-block);
        text-align: var(--label-text-align, right);
      }
      button {
        background: var(--button-background);
        color: var(--button-color);
        border: var(--button-border);
        padding: var(--button-padding);
        font-size: var(--button-font-size);
      }

      input {
        width: var(--input-width, 80px);
        padding: var(--input-padding);
        font-size:inherit;
        background: var(--input-background, initial);
        color: var(--input-color, initial);
        border: var(--input-border, 1px solid black);
        padding: var(--input-padding, 1px 3px);
      }

      input:disabled {
        border:0;        
      }

      .row {
        margin: var(--row-margin, 0 0 .5em 0);
      }
      .controls {
        margin: var(--controls-margin, 0);
      }

    `;
  }


  static get modes() {
    return {
      getWater: 'getWater',
      getFlourAndWater: 'getFlourAndWater'
    }
  }

  static get properties() {
    return {
      
      // getFlourAndWater :: (TotalWeight, StarterWeight, Hydration) -> (FlourWeight, WaterWeight)
      // getWater :: (FlourWeight, StarterWeight, Hydration) -> (WaterWeight)
      // getFlour :: (WaterWeight, StarterWeight, Hydration) -> (FlourWeight)
      // mode: {type: String},
      // name: {type: String},
      precision: {type: Number},

      // Number 0 - 1
      hydration: {type: Number},
      totalWeight: {type: Number},
      starterWeight: {type: Number},
      flourWeight:  {type: Number},
      waterWeight:  {type: Number},
      locks: { type: String }
    };
  }

  
  calculate() {
    const isSet = (x) => x != null && !isNaN(x);

    const flour = isSet(this.flourWeight) && !this.lockEnabled('flour');
    const starter = isSet(this.starterWeight) &&  !this.lockEnabled('starter');
    const water = isSet(this.waterWeight) && !this.lockEnabled('water');
    const total = isSet(this.totalWeight) && !this.lockEnabled('total');
    const hydration = isSet(this.hydration) && !this.lockEnabled('hydration');

    if (flour && water && starter) {
     
      this.totalWeight = this.flourWeight + this.waterWeight + this.starterWeight;
      const halfStarter = this.starterWeight / 2;
      this.hydration = this.round(
        ((this.waterWeight + halfStarter) / (this.flourWeight + halfStarter)),
        2
      );
      
    } else if (hydration && total && starter) {
      
      const hValue = (1 + this.hydration);
      const flourWeightRaw =
        (2 * this.totalWeight - this.starterWeight * hValue)
        /
        (2 * hValue);          
      this.flourWeight = this.round(flourWeightRaw, this.precision);
      this.waterWeight = this.round(
        (this.totalWeight - this.starterWeight - flourWeightRaw),
        this.precision
      );
      
    } else if (hydration && flour && starter) {

      this.waterWeight = this.round(
        ((this.hydration * (this.flourWeight + (this.starterWeight / 2 ))) - (this.starterWeight / 2)),
        this.precision
      );

      this.totalWeight = this.round(
        (this.flourWeight + this.waterWeight + this.starterWeight),
        this.precision
      )
    }
  }

  round(value, precision) {
    const rounder = Math.pow(10, precision);
    return Math.round(value * rounder ) / rounder;
  }

  setFloat(prop) {
    return (event) => {
      this[prop] = isNaN(event.target.value) ? NaN : parseFloat(event.target.value);
    }
  }

  setHydration(event) {
    this.setFloat('hydration')(event);
  }

  setTotalWeight(event) {
    this.setFloat('totalWeight')(event);
  }

  setStarterWeight(event) {
    this.setFloat('starterWeight')(event);
  }

  setFlourWeight(event) {
    this.setFloat('flourWeight')(event);
  }

  setWaterWeight(event) {
    this.setFloat('waterWeight')(event);
  }

  equals() {
    this.calculate();
    this.render();
  }
  reset() {
    this.flourWeight = null;
    this.waterWeight = null;
    this.totalWeight = null;
    this.hydration = null;
    this.starterWeight = null;
  }

  constructor() {
    super();
    this.name = "bread_hydration_calculator"
    this.precision = 2;
    this.locks = ''
    this._locks = this.locks.split(',');
    this.render();
  }

  lockEnabled(prop) {
    const index = this.locks.split(',').indexOf(prop);
    return index >= 0;
  }

  toggleLock(prop) {
    return () => {
      const index = this._locks.indexOf(prop);
      if (index >= 0) {
        this._locks.splice(index,1);
      } else {
        this._locks.push(prop);
      }
      this.locks = this._locks.join(',');
      this.render();
    }
  }

  render() {

    const locks = this.locks.split(',').reduce((acc, lock) => {
      acc[lock] =  { icon: '🔒', locked: true };
      return acc;
    }, {
      hydration: { icon: '🔓', locked: false },
      total: { icon: '🔓', locked: false },
      flour: { icon: '🔓', locked: false },
      water: { icon: '🔓', locked: false },
      starter: { icon: '🔓', locked: false },
    });    

    return html`
      <form class="bread_hydration_calculator">
      <div class="row">
      <label for="hydration">Hydration:</label>
      <input ?disabled="${locks.hydration.locked}" @change="${this.setHydration}" type="number" name="hydration" min="0" step="any" .value="${this.hydration}"/>
      </div>
      <div class="row">
      <label for="">Total Weight:</label>
      <input ?disabled="${locks.total.locked}" @change="${this.setTotalWeight}" type="number" name="totalWeight" min="0" step="any" .value="${this.totalWeight}"/>
      </div>
      <div class="row">
      <label for="">Flour Weight:</label>
      <input ?disabled="${locks.flour.locked}" @change="${this.setFlourWeight}" type="number" name="flourWeight" min="0" step="any" .value="${this.flourWeight}"/>
      </div>
      <div class="row">
      <label for="">Water Weight:</label>
      <input ?disabled="${locks.water.locked}" @change="${this.setWaterWeight}" type="number" name="waterWeight" min="0" step="any" .value="${this.waterWeight}"/>
      </div>
      <div class="row">
      <label for="">Starter Weight:</label>
      <input ?disabled="${locks.starter.locked}" @change="${this.setStarterWeight}" type="number" name="starterWeight" min="0" step="any" .value="${this.starterWeight}"/>
      </div>
      <div class="controls">
      <button type="button" @click="${this.equals}">Calculate</button>
      <button type="button" @click="${this.reset}">Reset</button>
      </div>
      ${ this.impossible? 'Impossible' : '' }
      </form>
      `;  

  }
}

window.customElements.define('bread-recipe-calculator', BreadRecipeCalculator);
