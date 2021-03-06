import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Img from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';
import TextMessage from './TextMessage';
import {View,Image} from "react-native";
class TextStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    const { step } = this.props;
    const { component, delay, waitAction } = step;
    const isComponentWatingUser = component && waitAction;
    setTimeout(() => {
      // this.props.triggerNextStep();
      this.setState({ loading: false });
      if (!isComponentWatingUser) {
        this.props.triggerNextStep();
      }
    }, delay);
  }

  renderMessage() {
    const { previousValue, step } = this.props;
    const { component } = step;
    let { message,image} = step;

    if (component) {
      const { steps, previousStep, triggerNextStep } = this.props;
      return React.cloneElement(component, {
        step,
        steps,
        previousStep,
        triggerNextStep,
      });
    }

    if(!!image){
      return <Image source={image} style={{width:100, height:100}} resizeMode="cover"/>
    }

    message =message? message.replace(/{previousValue}/g, previousValue):"";

    return message;
  }

  render() {
    const {
      step,
      isFirst,
      isLast,
      avatarStyle,
      avatarWrapperStyle,
      bubbleStyle,
      userBubbleStyle,
      hideBotAvatar,
      hideUserAvatar,
      renderCustomAvtarComponent,
    } = this.props;
    const {
      avatar,
      bubbleColor,
      fontColor,
      user,
      hideAvtar
    } = step;

    const showAvatar = user ? !hideUserAvatar : !hideBotAvatar;

    return (
      <TextStepContainer
        className="rsc-ts"
        user={user}
        isCustomAvtar={!!renderCustomAvtarComponent&&!!isFirst&&!hideAvtar}
        
      >
       
        {
          isFirst  && !hideAvtar&& (renderCustomAvtarComponent ?renderCustomAvtarComponent({user}):
          showAvatar  && <ImageContainer
            className="rsc-ts-image-container"
            borderColor={bubbleColor}
            style={avatarWrapperStyle}
            user={user}
          >
            <Img
              className="rsc-ts-image"
              style={avatarStyle}
              showAvatar={showAvatar}
              user={user}
              source={{ uri: avatar }}
              alt="avatar"
            />
          </ImageContainer>)
        }
        <Bubble
          className="rsc-ts-bubble"
          style={user ? userBubbleStyle || bubbleStyle :  bubbleStyle}
          user={user}
          bubbleColor={bubbleColor}
          showAvatar={showAvatar}
          isFirst={isFirst}
          isLast={isLast}
        >
          { this.state.loading && <Loading color={fontColor} /> }
          {
            !this.state.loading &&
            <TextMessage
              className="rsc-ts-text"
              fontColor={fontColor}
            >
              {this.renderMessage()}
            </TextMessage>
          }
        </Bubble>
       
      </TextStepContainer>
    );
  }
}

TextStep.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  avatarStyle: PropTypes.object.isRequired,
  avatarWrapperStyle: PropTypes.object,
  bubbleStyle: PropTypes.object.isRequired,
  userBubbleStyle: PropTypes.object.isRequired,
  hideBotAvatar: PropTypes.bool.isRequired,
  hideUserAvatar: PropTypes.bool.isRequired,
  previousStep: PropTypes.object,
  previousValue: PropTypes.any,
  steps: PropTypes.object,
};

TextStep.defaultProps = {
  previousStep: {},
  steps: {},
  previousValue: '',
  avatarWrapperStyle: {},
  fontColor:"#000"
};

export default TextStep;
