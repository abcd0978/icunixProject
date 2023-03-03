import styled  from 'styled-components';


function buttonSizefunc(size:number) {
    return `${size*2}px ${size*4}px`
}


function fontSizefunc(size:number) {
  return `${size*3+2}px`
}

interface StyledButtonProps{
    buttonSize : number
    fontSize : number
}

const StyledButton = styled.button<StyledButtonProps>`
  margin:0;
  background-color:rgba(255, 255, 255, 0);
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-family: "Noto Sans KR", Courier New;
  /*font-size: var(--button-font-size, 1rem);*/
  font-size: ${(props)=>`${fontSizefunc(props.fontSize)};`}
  padding: ${(props)=>`${buttonSizefunc(props.buttonSize)}`} /*var(--button-padding, 8px 16px)*/;
  border-radius: var(--button-radius, 5px);
  color: var(--button-color, #000000);

  &:hover{
    background:#DDDDDD
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #FFFFFF);
`;

export default StyledButton;