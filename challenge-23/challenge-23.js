(function(){
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */

  const $inputText = document.querySelector( 'input[data-js="input"]' );
  const $buttonCalc = document.querySelector( 'button[data-js="calc"]' );
  const $buttonClear = document.querySelector( 'button[data-js="clear"]' )
  const $buttonsNumbers = document.querySelectorAll( 'button[data-js="btn-number"]' );
  const $buttonsOperations = document.querySelectorAll( 'button[data-js="btn-op"]' );
  let values = [];

  $buttonsNumbers.forEach( btn => btn.addEventListener( 'click', () => { operationConcat(btn.value) }) );
  $buttonsOperations.forEach( btn => btn.addEventListener( 'click', () => {
    isLastItemOperator()
    operationConcat(btn.value)
  }) );
  $buttonClear.addEventListener( 'click', handleClickClear );
  $buttonCalc.addEventListener( 'click', handleClickCalc);

  function handleClickClear(){
    $inputText.value = 0;
  }

  function handleClickCalc(){
    isLastItemOperator();
    formatValues();
    $inputText.value = allCalcule();
    values = [];
  }

  function operationConcat(value) {
    $inputText.value += value;
  }

  function isLastItemOperator(){
    const lastItem =  $inputText.value.split('').pop();
    if (!parseInt(lastItem))
      $inputText.value = $inputText.value.slice(0, -1)
  }

  function formatValues(){
    $inputText.value.match(/(?:\d+)|[+/x-]/g).forEach( item => {
      if (!parseInt(item)) return values.push(item);
      return values.push(parseInt(item));
    })
  }

  function allCalcule(){
    // adicionar lógica para realizar as operações por prioridade
    let result;

    for ( i = 0; i < values.length; i++){
      const operator = values[1];

      switch (operator){
        case '+':
          result = values[0] + values[2]
          break;
        case '-':
          result = values[0] - values[2]
          break;
        case 'x':
          result = values[0] * values[2]
          break;
        case '/':
          result = values[0] / values[2]
          break;
        default:
          console.log("Falha na execução da operação.");
      }

      values.splice(0, 3, result);
    }
    return result;
  }
})();
