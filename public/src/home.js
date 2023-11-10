function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  for (const book of books) {
    const borrowedBooks = book.borrows[0];
    
    if (borrowedBooks && !borrowedBooks.returned) {
      count++;
    }
  }
  return count;
}

function getMostCommonGenres(books) {
  const genreCount = {};
  
  for (const { genre } of books) {
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  }
  
  const results = Object.entries(genreCount).map(([name, count]) => ({ name, count }));
  results.sort((bookA, bookB) => bookB.count - bookA.count);
  
  return results.slice(0, 5);
}

function getMostPopularBooks(books) {
  const bookBorrowCount = {};
  
  for (const { title, borrows } of books) {
    bookBorrowCount[title] = borrows.length;
  }
  
  const results = Object.entries(bookBorrowCount).map(([name, count]) => ({ name, count }));
  results.sort((bookA, bookB) => bookB.count - bookA.count);
  
  return results.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorMap = new Map();

  books.forEach(({ authorId, borrows }) => {
    const author = authors.find(author => author.id === authorId);
    const name = `${author.name.first} ${author.name.last}`;

    const authorData = authorMap.get(authorId);
    const count = (authorData && authorData.count) ? authorData.count : 0;

    authorMap.set(authorId, { name, count: count + borrows.length });
  });

  const sortedAuthors = [...authorMap.values()].sort((resultA, resultB) => resultB.count - resultA.count);

  return sortedAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
