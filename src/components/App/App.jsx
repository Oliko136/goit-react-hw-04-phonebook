import { useState, useEffect } from "react";
import { ContactForm } from "../ContactForm/ContactForm";
import { ContactList } from "../ContactList/ContactList";
import { Filter } from "../Filter/Filter";
import { nanoid } from 'nanoid';
import styles from "./App.module.css";

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem('my-contacts'));

    return storageData || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }]
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const doesNameAlreadyExist = ({name}) => {
    const normalizedName = name.toLowerCase();

    const duplicate = contacts.find(contact => {
      const normalizedCurrentName = contact.name.toLowerCase();

      return (normalizedName === normalizedCurrentName);
    })

    return Boolean(duplicate);
  }

  const addContact = (contact) => {
    if (doesNameAlreadyExist(contact)) {
      alert(`${contact.name} is already in contacts.`);
      return
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...contact
      }

      return [...prevContacts, newContact];
    })
  }

  const handleFilterChange = ({ target }) => {setFilter(target.value);}

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();

      return (
        normalizedName.includes(normalizedFilter)
      )
    })

    return filteredContacts;
  }

  const deleteContact = (id) => {setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));}

  const filteredContacts = getFilteredContacts();

  return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <div className={styles.contacts}>
          <h2 className={styles.contactsTitle}>Contacts</h2>
          <Filter filter={filter} handleFilterChange={handleFilterChange}/>
          <ContactList contacts={filteredContacts} deleteContact={deleteContact}/>
        </div>
      </div>
    )
}