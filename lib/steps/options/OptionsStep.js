import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Option from './Option';
import OptionElement from './OptionElement';
import OptionText from './OptionText';
import Options from './Options';

class OptionsStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state={selectedValues:[]}
    this.renderOption = this.renderOption.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  onOptionClick({ value ,label}) {
    const {onOptionClick,step }=this.props;
    const{options}=this.props.step;
    const {selectedValues}=this.state;
    let updatedSelectedValues= _.cloneDeep(selectedValues)
    if(_.find(updatedSelectedValues, id=>id == value)){
      updatedSelectedValues = _.filter(updatedSelectedValues, id=>id !=value);
    }else{
      updatedSelectedValues = [...updatedSelectedValues, value];
    }
 
    const selectionCount =_.get(step,"metadata.selectionCount",1);
    this.setState({selectedValues:updatedSelectedValues});
    if(selectionCount>updatedSelectedValues.length){
      return;
    }

    this.props.triggerNextStep({ value:updatedSelectedValues });
  

    let labels = [];
    _.forEach(updatedSelectedValues, value=>{
       const option =_.find(options ,opt=>opt.value==value )
       if(!!option){
        labels.push(_.get(option,"label",""))
       }
    });
   
      if(onOptionClick){
        onOptionClick({label:_.join(labels," | "), value,step});
      }
    
  
  }

  renderOption(option) {
    const { optionStyle, optionElementStyle ,selectedOptionElementStyle} = this.props;
    const { optionBubbleColor, optionFontColor, bubbleColor, fontColor } = this.props.step;
    const { value, label } = option;
    const{selectedValues}=this.state;
    return (
      <Option
        key={value}
        className="rsc-os-option"
        style={optionStyle}
        onPress={() => this.onOptionClick({ value, label })}
      >
        <OptionElement
          className="rsc-os-option-element"
          style={{...optionElementStyle,..._.includes(selectedValues, value)?selectedOptionElementStyle:{}}}
          bubbleColor={ optionBubbleColor || bubbleColor}
        >
          <OptionText
            class="rsc-os-option-text"
            fontColor={optionFontColor || fontColor}
          >
            {label}
          </OptionText>
        </OptionElement>
      </Option>
    );
  }

  render() {
    const { options } = this.props.step;

    return (
      <Options className="rsc-os">
        {_.map(options, this.renderOption)}
      </Options>
    );
  }
}

OptionsStep.propTypes = {
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  optionStyle: PropTypes.object.isRequired,
  optionElementStyle: PropTypes.object.isRequired,
};

export default OptionsStep;
