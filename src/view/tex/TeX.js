import React, { Component, PropTypes } from 'react';
const MathJax = window.MathJax;

export default class TeX extends Component {
  static propTypes = {
    value: PropTypes.string,
  }

  constructor(props) {
    super(props);
    MathJax.Hub.Config({
      tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
      showMathMenu: false,
      showMathMenuMSIE: false,
    });
  }

  componentDidMount() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.node]);
  }

  componentDidUpdate() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.node]);
  }

  render() {
    return (
      <span ref={node => this.node = node}>
        {`${this.props.value}`}
      </span>
    );
  }
}