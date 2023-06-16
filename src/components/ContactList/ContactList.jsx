import css from './ContactList.module.css';
import ContentEditable from 'react-contenteditable';
// import sanitize from 'sanitize-html';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateContact } from 'redux/operations';
import { sortContactsList, filterContactsList } from 'services/contactListFunc';
import { Buttons } from 'components/Buttons/Buttons';
import { getContacts, getFilter, getSortOptions } from 'redux/selectors';

export const ContactList = () => {
  const [editableContactId, setEditableContactId] = useState(null);
  const editedContactsRef = useRef({});
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const sortOptions = useSelector(getSortOptions);
  const sortedContacts = sortContactsList(contacts, sortOptions);
  const filteredContacts = filterContactsList(sortedContacts, filter);

  const handleEditClick = id => {
    setEditableContactId(id);
    editedContactsRef.current[id] = {
      ...contacts.find(contact => contact.id === id),
    };
  };

  const handleCancelClick = () => {
    setEditableContactId(null);
    editedContactsRef.current = {};
  };

  const handleSaveClick = id => {
    dispatch(updateContact({id, editedContact: editedContactsRef.current[id]}));
    setEditableContactId(null);
    editedContactsRef.current = {};
  };

  const handleContactChange = (e, id) => {
    const value = e.target.value;
    const dataset = e.currentTarget.dataset.value;
    const sanitizedValue = value;
    editedContactsRef.current[id][dataset] = sanitizedValue;
  };

  return ( 
    <section className={css.contactsListSection}>
      <table className={css.contactsTable}>
        <thead>
          <tr>
            <th colSpan={3}>
              <h1>Contacts</h1>
            </th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0 ? (
            <>
              {filteredContacts.map(contact => (
                <tr key={contact.id}>
                  <td>
                    {' '}
                    {editableContactId === contact.id ? (
                      <ContentEditable
                        className={css.editableContact}
                        html={contact.name}
                        disabled={false}
                        data-value="name"
                        onChange={e => handleContactChange(e, contact.id)}
                      />
                    ) : (
                      contact.name
                    )}
                  </td>
                  <td>
                    {editableContactId === contact.id ? (
                      <ContentEditable
                        className={css.editableContact}
                        html={contact.phone}
                        disabled={false}
                        data-value="phone"
                        onChange={e => handleContactChange(e, contact.id)}
                      />
                    ) : (
                      contact.phone
                    )}
                  </td>
                  <td>
                    <Buttons
                      contactId={contact.id}
                      editableContactId={editableContactId}
                      handleEditClick={handleEditClick}
                      handleCancelClick={handleCancelClick}
                      handleSaveClick={handleSaveClick}
                    />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={3} className={css.noContacts}>
                No contacts meet search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
