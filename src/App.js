import DigitButton from './components/DigitButton';
import './App.css';
import { useReducer } from 'react';
import OperationButton from './components/OperationButton';

export const Actions={
  Add_Digit:"add-digit",
  Choose_Operation:"choose-operation",
  Clear:"clear",
  Delete_Digit:"delete-digit",
  Evaluate:"evaluate"
}

function reducer(state,{type, payload}){
  switch(type){
    case Actions.Add_Digit:
      if(payload.digit=="0" && state.currentinput==="0"){
        return state
      }
      if (payload.digit=="." && state.currentinput.includes(".")){
        return state
      }
      return{
        ...state,
        currentinput: `${state.currentinput || ""}${payload.digit}`,
      }

      case Actions.Choose_Operation:
        if(state.currentinput==null && state.previnput==null){
          return state
        }

        if(state.currentinput == null){
          return{
            ...state,
            operation:payload.operation,
          }
        }

        if(state.previnput==null){
          return{
            ...state,
            operation: payload.operation,
            previnput: state.currentinput,
            currentinput:null
          }
        }
        return{
          ...state,
          previnput: evaluated(),
          operation:payload.operation,
          currentinput:null
        }

     case Actions.Clear:
      return{} 
  }

}

function evaluated({currentinput, previnput, operation}){
  const prev = parseFloat(previnput)
  const current=parseFloat(currentinput)
  
  // if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch(operation){
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break  
    case "*":
      computation = prev * current
      break  
    case "/":
      computation = prev / current
      break
  }
  return computation.toString()
  
}

function App() {
  const [{currentinput, previnput, operation}, dispatch] = useReducer(reducer,{})
  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='prev-input'>{previnput} {operation}</div>
        <div className='current-input'>{currentinput}</div>
      </div>
      <button className='span-two' onClick={()=>dispatch({type: Actions.Clear})}>AC</button>
      <button >DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className='span-two'>=</button>
    </div>
  );
}

export default App;
