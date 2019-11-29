import React from 'react';

class __form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.submitText = 'Загрузить';
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
        // console.log(event.target.name)
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
      handleSubmit(event) {
      let xhr = new XMLHttpRequest();
      let reqData = '';
      for (let prop in this.state){
        reqData += '&'+prop+'='+this.state[prop]
      }
      console.log('запрос: '+reqData)
      console.log('на: '+this.php)
      // 2. Конфигурируем его: POST-запрос this.ajax.php 'phones.json'
      xhr.open('POST', 'phones.json', true);

      // 3. Отсылаем запрос this.ajax.data
      xhr.send();
      
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
      
        if (this.status != 200) {
          // обработать ошибку
          alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
          return;
        }
      }

      event.preventDefault();
    }
  
    render(props) {
      return (
        <form onSubmit={this.handleSubmit}>
          {props.fields}
          <input type="submit" value="Отправить" />
        </form>
      );
    }
  }

  export default __form;