(function(){
  /*
  Envolva todo o código desse desafio em uma IIFE.
  Crie um arquivo chamado index.html e adicione esse script ao HTML.
  */

  /*
  Crie uma função construtora chamada "Person". Esse construtor deve ter
  as seguintes características:
  - Deve receber 3 parâmetros: `name`, `lastName` e `age`;
  - Deverá ter 3 propriedades:
    - `name` - que receberá o valor do parâmetro `name`;
    - `lastName` - que receberá o valor do parâmetro `lastName`;
    - `age` - que receberá o valor do parâmetro `age`;
  - Deverá ter 3 métodos:
    - `getFullName` - que deve retornar o nome completo do objeto criado,
    no formato:
      - "[NAME] [LASTNAME]"
    - `getAge` - que deverá retornar a idade (age);
    - `addAge` - esse método não deverá ter nenhum parâmetro, mas ao invocá-lo
    iremos passar um único argumento, que é a quantidade de anos que devem ser
    adicionados à idade original (age). Esse método deverá retornar o objeto
    que será instanciado.
  */
  class Person {
    constructor(name, lastName, age){
      this.name = name;
      this.lastName = lastName;
      this.age = age;
    }
    getFullName(){
      return `${this.name} ${this.lastName}`;
    }
    getAge(){
      return this.age;
    }
    addAge(){
      arguments[0] + this.age;
      return this;
    }
  } // durante a revisao decidi usar a notação de classe ao invés de function constructor

  /*
  Crie 3 novos objetos usando o construtor acima. Os objetos serão novas
  pessoas. As variáveis deverão ser o primeiro nome da pessoa. Passe os
  parâmetros corretamente para o construtor para criar as novas pessoas.
  Mostre as 3 novas pessoas criadas no console (Um console.log por pessoa).
  */
  console.log( 'Novas pessoas criadas à partir de Person:' );
  const pessoa1 = new Person('Ana', 'Staine', 24);
  const pessoa2 = new Person('Isabelly', 'Pereira', 25);
  const pessoa3 = new Person('Maria', 'Thimoteo', 23);
  console.log(pessoa1);
  console.log(pessoa2);
  console.log(pessoa3);

  /*
  Mostre no console o nome completo de cada pessoa.
  */
  console.log( '\nNomes das pessoas:' );
  console.log(pessoa1.getFullName());
  console.log(pessoa2.getFullName());
  console.log(pessoa3.getFullName());

  /*
  Mostre no console as idades de cada pessoa, com a frase:
  - "[NOME COMPLETO] tem [IDADE] anos."
  */
  console.log( '\nIdade das pessoas:' );
  console.log(`${pessoa1.getFullName()} tem ${pessoa1.age} anos`);
  console.log(`${pessoa2.getFullName()} tem ${pessoa2.age} anos`);
  console.log(`${pessoa3.getFullName()} tem ${pessoa3.age} anos`);

  /*
  Adicione alguns anos à cada pessoa, e mostre no console a nova idade de
  cada um. A frase deverá ser no formato:
  - "[NOME COMPLETO] agora tem [NOVA IDADE] anos."
  */
  console.log( '\nNova idade das pessoas:' );
  console.log(`${pessoa1.getFullName()} agora tem ${pessoa1.addAge(2).getAge()} anos`);
  console.log(`${pessoa2.getFullName()} agora tem ${pessoa2.addAge(3).getAge()} anos`);
  console.log(`${pessoa3.getFullName()} agora tem ${pessoa3.addAge(5).getAge()} anos`);
  
})();