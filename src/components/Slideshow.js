import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

export default class Slideshow extends React.Component {

  static defaultProps = {
    width: '100vw',
    height: '100vh',
    autoPlay: 3000
  };

  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      isSliding: false,
      direction: "next"
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  componentDidMount() {
    this.startAutoPlay();
    window.addEventListener("keyup", this.handleKeyUp);
  }

  startAutoPlay() {
    if (this.props.autoPlay) {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.nextSlide(), this.props.autoPlay);
    }
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 39 ) {
      this.nextSlide();
    } else if (e.keyCode === 37) {
      this.prevSlide();
    }
  }

  updateListOrder(itemIndex) {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;

    return ((numItems + 1) - position + itemIndex) % numItems;
    
    /* case by case explaination of the dynamic ordering...
    switch(itemIndex) {
      case position:
        return 1;
      case position - 1:
      case position + (numItems-1):
        return 0;
      case position + 1:
        return 2;
      default:
       return ((numItems + 1) - position + itemIndex) % numItems;
    } */
  }

  nextSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;
    this.performSlide("next", position === numItems - 1 ? 0 : position + 1);
  };

  prevSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length;
    this.performSlide("prev", position === 0 ? numItems - 1 : position - 1);
  };

  selectSlide = (index) => {
    this.setState({
      isSliding: false,
      position: index
    });

    this.startAutoPlay();
    
  };

  performSlide = (direction, position) => {
    this.setState({
      isSliding: true,
      position,
      direction
    });
    setTimeout(() => {
      this.setState({
        isSliding: false
      });
    }, 50);

    this.startAutoPlay();
  };

  render() {
    const { children } = this.props;
    const { width } = this.props;
    const { height } = this.props;

    return (
      <Container width={width} height={height}>
        <List direction={this.state.direction} isSliding={this.state.isSliding}>
          {children.map((child, index) => (
            <Item key={index} id={index} order={this.updateListOrder(index)} width={width} height={height}>
              {child}
            </Item>
          ))}
        </List>
        <Indicators position={this.state.position} isSliding={this.state.isSliding}>
        {children.map((child, index) => (
              <li key={index} onClick={() => this.selectSlide(index)}></li>
            ))}
        </Indicators>
      </Container>
    );
  }
}

Slideshow.propTypes = {
  children: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
  autoPlay: PropTypes.number
};

const Container = styled.div`
  top:0;
  position:absolute;
  width: ${props => props.width};
  height: ${props => props.height};
  overflow: hidden;
`;

const List = styled.div`
  display: flex;
  transition: ${props => (props.isSliding ? "none" : "transform 1s ease")};
  transform: ${props => {
    if (!props.isSliding) return "translateX(calc(-100%))";
    if (props.direction === "prev")
      return "translateX(calc(2 * (-100%)))";
    return "translateX(0%)";
  }};
`;

const Item = styled.div`
  flex: 1 0 100%;
  order: ${props => props.order};
  /* opacity: ${props => (props.order===1 ? "1" : "0.5")};  */
  img {
    width: ${props => props.width};
    height: ${props => props.height};
      display:block;
      object-fit: cover;
  }
`;

const Indicators = styled.ul`
  position:absolute;
  list-style-type: none;
  width:100%;
  text-align: center;
  bottom: 2%;
  padding: 0;
  li {
    cursor: pointer;
    display: inline-block;
    width:30px;
    height:30px;
    margin: 5px;
    background: #fff;
    opacity: 0.4;
    transition: opacity 0.3s ease ${props => props.isSliding ? 0.3 : 0}s;
    &:nth-child(${props => props.position + 1}) {
      opacity: 0.9
    }
  }
`;
