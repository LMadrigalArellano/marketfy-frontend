

export const generatePaginationNumbers = ( currentPage: number, totalPages: number) => {

  /*
    If the total of pages is 6, display all the pages in the navigation
    [1,2,3,4,5,6]
  */
  if( totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  /*
    If the currrent page is within the FIRST 3 pages,
    display:
    [first 3 pages,'...', last 2 pages]
    [1,2,3,...,49,50]
  */
  if( currentPage <= 3){
    return [1,2,3,'...', totalPages - 1, totalPages]
  }

  /*
    If the currrent page is within the LAST 3 pages,
    display:
    [first 2 pages, then '...', then the last 3 pages]
    [1,2,3,...,48,49,50]
  */
  if( currentPage >= totalPages - 2){
    return [1,2,'...', totalPages - 2, totalPages -1, totalPages]
  }

  /*
    If the currrent page is in the middle of the page count,
    display:
    [first page, '...', currentPage-1, currentPage, currentPage +1 '...', lastPage]
    [1,'...',32,33,34,'...',50]
  */
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];

}