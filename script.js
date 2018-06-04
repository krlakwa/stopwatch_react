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
    this.miliseconds = this.state.time.miliseconds;
    this.seconds = this.state.time.seconds;
    this.minutes = this.state.time.minutes;
    this.resultsTable = this.state.resultsTable;
  }

  step() {
    this.setState(prevState => ({
      handler: prevState + 1,
      time: {
        miliseconds: this.miliseconds,
        seconds: this.seconds,
        minutes: this.minutes
      }
    }));
    this.miliseconds += 1;
    if (this.miliseconds >= 100) {
      this.seconds += 1;
      this.miliseconds = 0;
    }
    if (this.seconds >= 60) {
      this.minutes += 1;
      this.seconds = 0;
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
      this.resultsTable = [...this.resultsTable, result];
      this.setState(prevState => ({
        results: prevState.results + 1
      }));

      this.setState({
        handler: 0
      });
      this.miliseconds = this.state.time.miliseconds;
      this.seconds = this.state.time.seconds;
      this.minutes = this.state.time.minutes;
    }
  }

  clearResults() {
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

  render() {
    const resultItem = this.resultsTable.map((time, index) => (
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
