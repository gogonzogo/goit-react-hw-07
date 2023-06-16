import css from './ContactForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';

export const ContactForm = () => {
  const [state, setState] = useState({
    name: '',
    phone: '',
  });
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleSubmit = e => {
    e.preventDefault();
    const { name, phone } = state;
    const newContact = {
      name,
      phone,
    };
    const existingContact = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.phone === phone
    );
    if (existingContact) {
      alert(`${name} or ${phone} is already in contacts`);
      return;
    }

    dispatch(addContact(newContact));
    setState({ name: '', phone: '' });
  };

  const onChange = e => {
    const trimmedValue = e.target.value
      .split(' ')
      .map(str => str.trim())
      .join(' ');

    setState(prevState => ({
      ...prevState,
      [e.target.name]: trimmedValue,
    }));
  };

  return (
    <section className={css.formSection}>
      <form className={css.contactForm} onSubmit={handleSubmit}>
        <label className={(css.inputNameLabel, css.inputLabel)}>
          Name
          <input
            className={(css.inputName, css.formInput)}
            onChange={onChange}
            value={state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
          />
        </label>
        <label className={(css.inputNumLabel, css.inputLabel)}>
          Number
          <input
            className={(css.inputNum, css.formInput)}
            onChange={onChange}
            value={state.phone}
            type="tel"
            name="phone"
            pattern="^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.formBtn} type="submit">
          Add Contact
        </button>
      </form>
    </section>
  );
};
