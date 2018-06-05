class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handler: 0,
      running: false,
      results: 0,
      time: {
        miliseconds: 0,
        seconds: 0,
        minutes: 0
      },
      resultsTable: []
    };
  }

  step() {
    this.setState(prevState => ({
      handler: prevState + 1,
      time: {
        miliseconds: this.state.time.miliseconds,
        seconds: this.state.time.seconds,
        minutes: this.state.time.minutes
      }
    }));
    this.state.time.miliseconds += 1;
    if (this.state.time.miliseconds >= 100) {
      this.state.time.seconds += 1;
      this.state.time.miliseconds = 0;
    }
    if (this.state.time.seconds >= 60) {
      this.state.time.minutes += 1;
      this.state.time.seconds = 0;
    }
  }

  start() {
    if (!this.state.running) {
      this.setState({
        running: true
      });
      this.interval = setInterval(() => this.step(), 10);
    }
  }

  stop() {
    this.setState({
      running: false
    });
    clearInterval(this.interval);
  }

  clear() {
    if (!this.state.running) {
      let savedTime = `${pad0(this.state.time.minutes)}:${pad0(
        this.state.time.seconds
      )}:${pad0(this.state.time.miliseconds)}`;
      let result = savedTime.toString();
      this.state.resultsTable = [...this.state.resultsTable, result];
      this.setState(prevState => ({
        results: prevState.results + 1
      }));

      this.setState({
        handler: 0,
        time: {
          miliseconds: 0,
          seconds: 0,
          minutes: 0
        }
      });
    }
  }

  clearResults() {
    if (!this.state.running) {
      this.setState({
        results: 0,
        time: {
          miliseconds: this.state.time.miliseconds,
          seconds: this.state.time.seconds,
          minutes: this.state.time.minutes
        }
      });
      this.state.resultsTable = [];
    }
  }

  render() {
    const resultItem = this.state.resultsTable.map((time, index) => (
      <li key={index + 1}> {time} </li>
    ));

    return (
      <div className="container">
        <h1>Stopwatch</h1>
        <nav className="controls">
          <a className="button" href="#" onClick={this.start.bind(this)}>
            Start
          </a>
          <a className="button" href="#" onClick={this.clear.bind(this)}>
            Reset
          </a>
          <a className="button" href="#" onClick={this.stop.bind(this)}>
            Stop
          </a>
        </nav>
        <div className="stopwatch">
          {pad0(this.state.time.minutes)}
          :{pad0(this.state.time.seconds)}
          :{pad0(this.state.time.miliseconds)}
        </div>
        <h2>
          Results
          <a href="#" onClick={this.clearResults.bind(this)}>
            Clear
          </a>
        </h2>
        <ul className="results">{resultItem}</ul>
      </div>
    );
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

var app = <Stopwatch />;
ReactDOM.render(app, document.getElementById("app"));