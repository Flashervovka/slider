import React from 'react';
import './styles.css';
import ThemeContext from '../../themecontext';

class SliderContent extends React.Component{

    constructor(props){
        super(props);
        this.container = React.createRef();
        this.state={
            componentContainerStyle:{
                width:0
            }
        }
    }

    componentDidMount(){
        let width = (this.getSlideWidth(this.container.current.childNodes[0])*this.props.showItems);
        this.setState({componentContainerStyle:{width:width}})

    }

    getSlideWidth(element){
        let style = element.currentStyle || window.getComputedStyle(element);
        let marginLeft = parseInt(style.marginLeft) || 0;
        let marginRight = parseInt(style.marginRight) || 0;
        return (element.offsetWidth+marginLeft+marginRight);
    }

    render() {
        let animationClass = this.props.animationClass ? this.props.animationClass:"moveAnimationBase";
        let currentSlideWidth = 0;
        if(this.container.current)currentSlideWidth = this.getSlideWidth(this.container.current.childNodes[this.props.currentSlide]);
        return (
            <ThemeContext.Consumer>
                {
                    (value) => (
                        <div className={"sliderComponentContainer " + value} style={this.state.componentContainerStyle}>
                            <div  className={"sliderContentContainer " + value+" "+animationClass}
                                  onTransitionEnd={this.props.onChangeSlideCompleted}
                                  ref={this.container}
                                  style={{left:-this.props.currentSlide*currentSlideWidth}}>
                                {
                                    this.props.sliderData.map((element, index) => {
                                        let item = this.props.itemsRenderer[0](element, index);
                                        return item;
                                    })
                                }
                            </div>
                        </div>

                    )
                }
            </ThemeContext.Consumer>
        )
    }

}
SliderContent.contextType = ThemeContext;
export default SliderContent;