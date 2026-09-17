declare module 'react-plotly.js/factory' {
  import { Component } from 'react';
  import Plotly from 'plotly.js';

  export default function createPlotlyComponent(plotly: typeof Plotly): typeof Component;
}
