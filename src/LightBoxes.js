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
        this.selected = this.selected.bind(this);
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

    selected(input) {
        const newBoxes = this.state.boxes.map(box => {
            return ({
                id: box.id,
                color: box.color,
                selected: input
            });
        });
        this.setState({
            boxes: newBoxes
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
                <PixelControls selected={this.selected} setColor={this.setColor} />
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
        this.all = this.all.bind(this);
        this.clear = this.clear.bind(this);
        this.colorChange = this.colorChange.bind(this);
    }

    all() {
        this.props.selected(true);
    }

    clear() {
        this.props.selected(false);
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
                <button onClick={this.all}>Select All</button>
            </div>
        );
    }
}

class LightBoxesPage extends React.Component {
    render () {
        return (
            <div>
                <h1>Welcome to a goofy drawing tool: BoxArt</h1>
                <p>Click some boxes - then choose a color</p>
                <p>Make a pretty picture then change your browser window size and watch it warp!</p>
                <PixelList />
            </div>
        );
    }
}

export default LightBoxesPage;
