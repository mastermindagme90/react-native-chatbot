import styled from 'styled-components/native';

const TextStepContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.isCustomAvtar?"column":props.user ? 'row-reverse' : 'row'};
  align-items: ${props => props.isCustomAvtar && !props.user ? 'flex-start' : 'flex-end'};
  width: 100%;
 
`;

export default TextStepContainer;
