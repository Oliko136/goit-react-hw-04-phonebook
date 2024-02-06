import { Component } from "react";
import { ContactForm } from "../ContactForm/ContactForm";
import { ContactList } from "../ContactList/ContactList";
import { Filter } from "../Filter/Filter";
import { nanoid } from 'nanoid';
import styles from "./App.module.css";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
    ],
    filter: ''
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));

    if (contacts?.length) {
      this.setState({
        contacts,
    })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(this.state.contacts));
    }
  }

  doesNameAlreadyExist({name}) {
    const { contacts } = this.state;
    
    const normalizedName = name.toLowerCase();

    const duplicate = contacts.find(contact => {
      const normalizedCurrentName = contact.name.toLowerCase();

      return (normalizedName === normalizedCurrentName);
    })

    return Boolean(duplicate);
  }

  addContact = (contact) => {

    if (this.doesNameAlreadyExist(contact)) {
      alert(`${contact.name} is already in contacts.`);
      return
    }

    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        ...contact
      }

      return {
        contacts: [...contacts, newContact]
      }
    })
  }

  handleFilterChange = ({ target }) => {
    this.setState({
      filter: target.value
    })
  }

  getFilteredContacts() {
    const { contacts, filter } = this.state;
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

  deleteContact = (id) => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);

      return {
        contacts: newContacts
      }
    })
  }
  
  render() {
    const { addContact, handleFilterChange, deleteContact } = this;
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <div className={styles.contacts}>
          <h2 className={styles.contactsTitle}>Contacts</h2>
          <Filter filter={filter} handleFilterChange={handleFilterChange}/>
          <ContactList contacts={contacts} deleteContact={deleteContact}/>
        </div>
      </div>
    )
  }
};
