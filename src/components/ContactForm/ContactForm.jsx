import { useState } from 'react';
import { nanoid } from 'nanoid';

export default function ContactForm({ addContacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Метод записує дані із інпута у стейт
  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  // Метод виконується при сабміті форми
  const handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state.name);

    // Записуємо у пропс значення стейту (передаємо дані у App-компонент)
    addContacts(name, number);
    reset();
  };

  // Очистка інпутів (через очистку стейту)
  const reset = () => {
    setName('');
    setNumber('');
  };

  // Генератор випадкових id
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor={nameInputId}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleInputChange}
            id={nameInputId}
          />
        </label>

        <label htmlFor={numberInputId}>
          Phone
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleInputChange}
            id={numberInputId}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    </>
  );
}
