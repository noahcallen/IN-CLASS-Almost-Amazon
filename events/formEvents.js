import { getAuthors, updateAuthor, createAuthor } from '../api/authorData';
import { createBook, getBooks, updateBook } from '../api/bookData';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';

const formEvents = () => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
      };
      createBook(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateBook(patchPayload).then(() => {
          getBooks().then(showBooks);
        });
      });
    }// CLOSE CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK

    // TODO: CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
        firebaseKey,
      };
      updateBook(payload).then(() => {
        getBooks().then(showBooks);
      });
    }

    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      const payload = {
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
      };

      createAuthor(payload).then(({ author }) => {
        const patchPayload = { firebaseKey: author };
        updateAuthor(patchPayload).then(() => {
          getAuthors().then(showAuthors);
        });
      });
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default formEvents;
