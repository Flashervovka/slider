import React from 'react';
import './styles.css';
import ThemeContext from '../../themecontext';

class SliderContent extends React.Component{

    constructor(props){
        super(props);
        this.container = React.createRef();
        this.state={
            componentContainerStyle:{
                width:"0px"
            }
        }
    }

    componentDidMount(){
        let width = (this.getSlideWidth(this.container.current.childNodes[0])*this.props.showItems)+"px";
        this.setState({componentContainerStyle:{width:width}});
    }

    /*componentDidUpdate(prevProps, prevState){
        let width = (this.getSlideWidth(this.container.current.childNodes[0])*this.props.showItems)+"px";
        if(this.state.componentContainerStyle.width!==width){
            this.setState({componentContainerStyle:{width:width}});
        }
    }*/

    getSlideWidth(element){
        let style = element.currentStyle || window.getComputedStyle(element);
        let marginLeft = parseInt(style.marginLeft) || 0;
        let marginRight = parseInt(style.marginRight) || 0;
        return (element.offsetWidth+marginLeft+marginRight);
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {
                    (value) => (
                        <div className={"sliderComponentContainer " + value} style={this.state.componentContainerStyle}>
                            <div className={"sliderContentContainer " + value} ref={this.container}>
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
/*function SliderContent(props) {


    const itemRef = useRef();

    useLayoutEffect(() => {
        console.log(itemRef.current)
        console.log(itemRef.current.childNodes[0])
    }, []);

    return (

        <ThemeContext.Consumer>
            {
                (value)=> (
                    <div className={"sliderContentContainer "+value} ref={itemRef}>
                        {
                            props.sliderData.map((element,index)=>{
                                let item = props.itemsRenderer[0](element,index);
                                return item;
                            })
                        }
                    </div>
                )
            }
        </ThemeContext.Consumer>
    );
}
*/
export default SliderContent;