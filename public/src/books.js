function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}
function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const booksCheckedOut = [];
  const booksReturned = [];
  
  books.forEach(book => (book.borrows[0].returned ? booksReturned : booksCheckedOut).push(book));

  return [booksCheckedOut, booksReturned];
}


function getBorrowersForBook(book, accounts) {
  const borrowTransactions = book.borrows;
  
  const borrowers = borrowTransactions.map(borrow => {
    const account = accounts.find(account => account.id === borrow.id);
    return { ...account, returned: borrow.returned };
  });
  
  return borrowers.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
