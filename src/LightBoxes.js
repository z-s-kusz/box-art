import React from 'react';
import { SketchPicker } from 'react-color';
import './LightBoxes.css';

class Pixel extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        const newState = this.props.selected === true ? false : true;
        this.props.clickedOneBox(this.props.id, newState);
    }

    render() {
        const color = this.props.color;
        const outerStyle = this.props.selected === true ? {backgroundColor: 'black'} : {backgroundColor: 'rgb(245, 245, 245)'};
        const innerStyle = this.props.selected === true ? {boxShadow: '0 0 4px 2px white', backgroundColor: color} : {boxShadow: 'none', backgroundColor: color};
        return (
            <div onClick={this.click} style={outerStyle}>
                <div className='pixel' style={innerStyle}>
                </div>
            </div>
        );
    }
}

class PixelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boxes: []
        };
        this.clickedOneBox = this.clickedOneBox.bind(this);
        this.clearSelected = this.clearSelected.bind(this);
        this.setColor = this.setColor.bind(this);
    }

    componentDidMount() {
        const pixelCount = 510;
        let boxes = [];
        for (let i = 0; i < pixelCount; i++) {
            boxes.push({
                id: i,
                color: 'rgba(255,180,20,1)',
                selected: false
            });
        }
        this.setState({
            boxes: boxes
        });
    }

    clickedOneBox(id, newState) {
// seems odd, am I changing state outside of setstate function or creating a new var based on state(2nd thing is good, 1st is bad)
        const boxes = this.state.boxes;
        boxes[id].selected = newState;
        this.setState({
            boxes: boxes
        });
    }

    clearSelected() {
        let clearedBoxes = this.state.boxes.map(box => {
            return ({
                id: box.id,
                color: box.color,
                selected: false
            });
        });
        this.setState({
            boxes: clearedBoxes
        });
    }

    setColor(color) {
        let newBoxes = this.state.boxes.map(box => {
            if (box.selected === true) {
                return ({
                    id: box.id,
                    color: color,
                    selected: box.selected
                });
            } else {
                return box;
            }
        });
        this.setState({
            boxes: newBoxes
        });
    }

    render() {
        let boxes = this.state.boxes.map(box => {
            return ( <Pixel key={box.id} id={box.id}
                color={box.color} selected={box.selected}
                clickedOneBox={this.clickedOneBox} /> );
        });
        return (
            <div>
                <div className='pixels-container'>
                    {boxes}
                </div>
                <PixelControls clearSelected={this.clearSelected} setColor={this.setColor} />
            </div>
        );
    }
}

class PixelControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            r: 140,
            g: 250,
            b: 40,
            a: 1
        };
        this.clear = this.clear.bind(this);
        this.colorChange = this.colorChange.bind(this);
    }

    clear(event) {
        event.preventDefault();
        this.props.clearSelected();
    }

    colorChange(color) {
        let c = color.rgb;
        this.setState({
            r: c.r,
            g: c.g,
            b: c.b,
            a: c.a
        });
        let newColors = 'rgba(' +
        c.r.toString() + ',' +
        c.g.toString() + ',' +
        c.b.toString() + ',' +
        c.a.toString() + ')';
        this.props.setColor(newColors);
    }

    render() {
        return (
            <div>
                <SketchPicker onChangeComplete={this.colorChange} color={this.state}/>
                <button onClick={this.clear}>Clear Selected</button>
            </div>
        );
    }
}

class LightBoxes extends React.Component {
    render () {
        return (
            <PixelList />
        );
    }
}

export default LightBoxes;
