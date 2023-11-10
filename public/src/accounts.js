function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) => {
    
    const lastNameA = nameA.name.last.toLowerCase();
    const lastNameB = nameB.name.last.toLowerCase();
    
    if (lastNameA.length > 0 && lastNameB.length > 0) {
      return lastNameA > lastNameB ? 1 : -1;
    }
    });
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
    return total + book.borrows.filter(borrow => borrow.id === account.id).length;
  }, 0);
}

function getAuthorById(authors, authorId) {
  return authors.find(author => author.id === authorId);
}

function getBooksPossessedByAccount(account, books, authors) {
  const isBookCheckedOut = book => book.borrows.some(borrow => borrow.id === account.id && !borrow.returned);
  
  const checkedOutBooks = books.filter(isBookCheckedOut);
  
  const booksPossessedByAccount = checkedOutBooks.map(book => {
    const { authorId, ...restOfBook } = book;
    const author = getAuthorById(authors, authorId);
    return { ...restOfBook, author };
  });
  
  return booksPossessedByAccount;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
