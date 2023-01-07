import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';

export function App() {
  // Дістаємо дані із localStorage з перевіркою чи вони там є, якщо немає то записуємо пустий масив
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      return parsedContacts;
    }
    return [];
  });

  const [filter, setFilter] = useState('');

  //  Обновлює localeStorage кожен раз коли змінюється contacts
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  // Фільтр контактів наявних у масиві
  const getVisibleContacts = () => {
    // state.filter нормалізуємо один раз, а не при кожній ітерації методу filter
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  // Додає дані користувача у масив
  const addContacts = (name, number) => {
    // Перевірка чи існує контакт із таким ім'ям у масиві
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    // Запис даних із інпутів у масив
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContacts={addContacts} />

      <h2>Contacts</h2>

      {contacts.length > 0 && (
        <>
          <Filter value={filter} changeFilter={changeFilter}></Filter>
          <ContactList
            filteredContacts={getVisibleContacts()}
            deleteContact={deleteContact}
          />
        </>
      )}
    </div>
  );
}
