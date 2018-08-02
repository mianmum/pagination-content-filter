//  declare global variables
const $list = $('.student-item');
const $pageDiv = $('.page');
//  declare a empty variable to store dynamically created section in
let dynamicSection = "";
//  function to store each item into its corresponding page
const showPage = (pageNumber, studentList) => {
  $(studentList).hide();
  for (let i = 0; i < studentList.length; i++) {
    if (i < pageNumber * 10 && i >= (pageNumber * 10) - 10) {
      $(studentList[i]).show();
    } else {
      $(studentList[i]).hide();
    };
  };
};
//  BUILD FUNCTION TO APPEND PAGES
//  Task One: determine total number of pages needed, depending on number of items (10 per page)
const determine = students => {
  const total = Math.ceil(students.length / 10);
  return total;
};
//  Task Two: create a page link section
const $div = $(`<div class="pagination"></div>`)
const $ul = $(`<ul></ul>`);
const createSection = () => {
  dynamicSection = $($div).append($ul);
  return dynamicSection;
};111
//  Task Three: add a page link for every needed page to the section
const addPageLinks = numberOfPages => {
  for (let i = 1; i <= numberOfPages; i++) {
    $($ul).append($(`<li><a href='#'>${i}</a></li>`));
  };
};
//  Task Four: clear all stored data (clean slate for each new item list)
//  remove old section
const removeSection = section => $(section).remove();
// empty ul of all previously appended list elements
const removeLI = ul => $(ul).empty();
//  Task Five: add the new section
const addSection = (div, newSection) => $(div).append(newSection);
 // Task Six: create event listeners for links
const addListeners = ul => {
  $(ul).on('click', 'a', e => {
    let $pageNumber = $(e.target).text();
    showPage($pageNumber, $list);
    // Remove active class from all other links
    $('a').removeClass('active');
    // Add the active class to the selected page
    $(e.target).addClass('active');
  });
};

// put together the appendPageLinks function
const appendPageLinks = studentList => {
  let total = determine(studentList);
  createSection();
  removeLI($ul);
  addPageLinks(total);
  $($div).remove();
  $($pageDiv).append(dynamicSection);
  addListeners($ul);
};
// call appendPageLinks function
appendPageLinks($list);
//  create and call function to show first page on page load and add the active class to its link
const pageLoad = link => {
  showPage(1, $list);
  $(link).addClass('active');
};
pageLoad(document.querySelector('a'));
// create search bar;
const $searchBar = $(`
  <div class="student-search">
    <input placeholder="Search for students...">
    <button>Search</button>
  </div>
`);
const $pageHeader = $('.page-header');
const h3 = document.querySelectorAll('h3');
const $error = $(`
  <div class="error">
    <h1>Error</h1>
    <p>No matching results</p>
  </div>
`)
// filter functionality
let results = [];
const filter = (studentList, studentNames, inputValue) => {
  results = [];
  for (let i = 0; i < studentNames.length; i++) {
    $(studentList[i]).hide();
    if ($(studentNames[i]).text().toUpperCase().indexOf(inputValue) > -1) {
      $(studentList[i]).show();
      results.push($(studentList[i]));
    }  else {
      $(studentList[i]).hide();
    };
    appendPageLinks(results);
  };
};
// search button listener
$($pageHeader).append($searchBar);
const searchListener = searchSection => {
  $(searchSection).on('click', 'button', () => {
    $($error).remove();
    filter($list, h3, $('input').val().toUpperCase());
    if (results.length === 0) {
      $($div).remove();
      $($pageDiv).append($error);
    };
  });
};
// add search bar
searchListener($searchBar);
