import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import "./App.css";
import CtStrat from "./components/ctStrats";
import TStrat from "./components/tStrats";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    isCT: true,
    num: 0,
  };

  handleClick() {
    this.setState((state) => ({ num: state.num + 1 }));
  }

  render() {
    const isCT = this.state.isCT;
    console.log(isCT);

    let Prompt;
    let Tooltip;

    if (isCT === true) {
      Prompt = <CtStrat key={this.state.num} />;
    } else if (isCT === false) {
      Prompt = <TStrat key={this.state.num} />;
    }

    if (!window.localStorage) {
      Tooltip = undefined;
    } else {
      if (!window.localStorage.isReturningVisitor) {
        Tooltip = (
          <ReactTooltip
            id="registerTip"
            place="bottom"
            effect="solid"
            backgroundColor="white"
            textColor="#304b74"
            offset={{ bottom: 15 }}
            event="onMount"
          >
            Click to Change Sides
          </ReactTooltip>
        );
        window.localStorage.isReturningVisitor = true;
      }
    }

    return (
      <div className={isCT ? "App ct" : "App t"}>
        <Header />
        {Prompt}
        <div className="btn-div">
          <input
            value="New Strat"
            type="button"
            className={isCT ? "ct-btn btn strat-btn" : "t-btn btn strat-btn"}
            onClick={this.handleClick.bind(this)}
          />
          <div
            className="switchSides"
            onClick={() => this.setState({ isCT: !isCT })}
          >
            <img
              data-tip
              data-for="registerTip"
              src="./ctt.png"
              alt="CT/T Switch"
              className="btn switchSides"
            />
            {Tooltip}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
