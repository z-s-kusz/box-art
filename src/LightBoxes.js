import React from 'react';
import './LightBoxes.css';

class Pixel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            color: 'rgb(121, 195, 230)'
        }
        this.click = this.click.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.colorIt = this.colorIt.bind(this);
    }

    colorIt(newColor) {
        if (this.state.selected === false) return;
        else {
            this.setState({
                color: newColor
            });
        }
    }

    clearAll() {
        this.setState(state => ({
            selected: false
        }));
    }

    click() {
        let newState = this.state.selected === true ? false : true;
        this.setState(state => ({
            selected: newState
        }));
    }

    render() {
        let color = this.state.color;
        let shadowStyle = this.state.selected === true ? {boxShadow: '0 0 16px red', backgroundColor: color} : {boxShadow: 'none', backgroundColor: color};
        return (
            <div onClick={this.click}>
                <div className='pixel'
                style = {shadowStyle}>
                </div>
            </div>
        );
    }
}

class PixelList extends React.Component {
    constructor(props) {
        super(props);
        this.control = this.control.bind(this);
        this.state = {
            refs: []
        }
    }
    control(actionType, colors) { // used to listen for child click event
        if (actionType === 'clear') {
            this.state.refs.forEach((ref, i) => { // calls my ref function for each unique pixel
                this['foo' + i].clearAll();
            });
        } else if (actionType === 'color') {
            this.state.refs.forEach((ref, i) => {
                this['foo' + i].colorIt(colors);
            });
        }
    }
    render() {
        const pixelCount = 510;
        const listItems = [];
        for (let i =0; i < pixelCount; i++) {
            this.state.refs.push( (foo) => { this['foo' + i] = foo; } );//build an array of unique refs for each pixelbox
            listItems.push( (<Pixel key={i} ref={this.state.refs[i]}/>) );
        }
        return (
            <div>
                <div className='pixels-container'>
                    {listItems}
                </div>
                <PixelControls parentControl={this.control}/>
            </div>
        );
    }
}

class PixelControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            red: 0,
            green: 0,
            blue: 0
        };
        this.clear = this.clear.bind(this);
        this.colorSubmit = this.colorSubmit.bind(this);
        this.colorChange = this.colorChange.bind(this);
    }

    clear() {
        this.props.parentControl('clear');
    }

    colorSubmit() {
        let newColors = 'rgb(' +
        this.state.red.toString() + ',' +
        this.state.green.toString() + ',' +
        this.state.blue.toString() + ')';
        this.props.parentControl('color', newColors);
    }
    colorChange(event, color) {
        let number = event.target.value;
        if (!number) number = 0;
        if (number > 255) number = 255;
        if (number < 0) number = 0;
        this.setState({
            [color]: number
        });
    }

    render() {
        return (//onChange passes synthetic event so i can use event and color as args
        <div>
            <label>Red
            <input type='number' min='0' max='255'
            onChange={ e => this.colorChange(e, 'red')} /></label>
            <label>Green
            <input type='number' min='0' max='255'
            onChange={e=>this.colorChange(e,'green')} /></label>
            <label>Blue
            <input type='number' min='0' max='255'
            onChange={e=>this.colorChange(e,'blue')} /></label>
            <button onClick={this.colorSubmit}>Enter</button>
            <button onClick={this.clear}>Clear All</button>
        </div>
        );
    }
}

class LightBoxes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cleared: false
        };
    }
    render () {
        return (
            <PixelList />
        );
    }
}

export default LightBoxes;