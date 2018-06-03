class Stopwatch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        handler: 0,
        running: false,
        results: 0
      };
      this.miliseconds = this.props.miliseconds;
      this.seconds = this.props.seconds;
      this.minutes = this.props.minutes;
      this.resultsList = this.props.resultsList;
    }
  
    step() {
      this.setState(prevState => ({
        handler: prevState.handler + 1
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
  
    pad0(value) {
      let result = value.toString();
      if (result.length < 2) {
        result = "0" + result;
      }
      return result;
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
        let savedTime = `${this.pad0(this.minutes)}:${this.pad0(
          this.seconds
        )}:${this.pad0(this.miliseconds)}`;
        let result = savedTime.toString();
        this.resultsList = [...this.resultsList, result];
        this.setState(prevState => ({
          results: prevState.results + 1
        }));
  
        this.setState({
          handler: 0
        });
        this.miliseconds = this.props.miliseconds;
        this.seconds = this.props.seconds;
        this.minutes = this.props.minutes;
      }
    }
  
    clearResults() {
      this.setState({
        results: 0
      });
      this.resultsList = [];
    }
  
    render() {
      const resultItem = this.resultsList.map((time, index) => <li key={index + 1}> {time} </li>);
                                               
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
            {this.pad0(this.minutes)}
            :{this.pad0(this.seconds)}
            :{this.pad0(this.miliseconds)}
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
  
  Stopwatch.defaultProps = {
    miliseconds: 0,
    seconds: 0,
    minutes: 0,
    resultsList: []
  };
  
  Stopwatch.propTypes = {
    miliseconds: React.PropTypes.number.isRequired,
    seconds: React.PropTypes.number.isRequired,
    minutes: React.PropTypes.number.isRequired,
    resultsList: React.PropTypes.array.isRequired
  };
  
  var app = <Stopwatch />;
  ReactDOM.render(app, document.getElementById("app"));
  