import React from 'react';
import { SketchPicker } from 'react-color';
import './LightBoxes.css';

class Pixel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            color: 'rgba(121, 195, 230, 1)'
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
            color: {
                r: 200,
                g: 200,
                b: 200,
                a: 1
            }
        };
        this.clear = this.clear.bind(this);
        this.colorChange = this.colorChange.bind(this);
    }

    clear() {
        this.props.parentControl('clear');
    }
    colorChange(color) {
        let c = color.rgb;
        let newColors = 'rgba(' +
        c.r.toString() + ',' +
        c.g.toString() + ',' +
        c.b.toString() + ',' +
        c.a.toString() + ')';
        this.props.parentControl('color', newColors);
    }

    render() {
        return (//onChange passes synthetic event so i can use event and color as args
        <div>
            <SketchPicker onChangeComplete={ this.colorChange} />
            <button onClick={this.clear}>Clear Selected</button>
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