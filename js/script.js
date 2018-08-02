//  save list of students to variable
const $list = $('.student-item');
//  save div with class page to variable
const $pageDiv = $('.page');
//  create an empty variable to store dynamically created section in
let dynamicSection = "";

//  showPage function
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

//  build appendPageLinks function with smaller functions

//  Task One: determine total number of pages needed, depending on number of students
const determine = students => {
  const total = Math.floor((students.length / 10) + 1);
  return total;
};

//  Task Two: create a page link section
const $div = $(`<div class="pagination"></div>`)
const $ul = $(`<ul></ul>`);
const createSection = () => {
  dynamicSection = $($div).append($ul);
  return dynamicSection;
};

//  Task Three: add a page link for every needed page to the section
const addPageLinks = numberOfPages => {
  for (let i = 1; i <= numberOfPages; i++) {
    $($ul).append($(`<li><a href='#'>${i}</a></li>`));
  };
};

//  Task Four: remove old section
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
  removeSection($div);
  addSection($pageDiv, dynamicSection);
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

  // handle no matching results
  const error = (pageDiv) => {
    if(results = []) {
      $(pageDiv).append($error);
    };
  };

// filter functionality
let results = [];
const filter = (studentList, studentNames, inputValue) => {
  results = [];
  for (let i = 0; i < studentNames.length; i++) {
    if ($(studentNames[i]).text().toUpperCase().indexOf(inputValue) > -1) {
      $(studentList[i]).show();
      results.push($(studentList[i]));
    }  else {
      $(studentList[i]).hide();
    };
  };
  error($pageDiv);
};

// search button listener
const searchListener = searchSection => {
  $(searchSection).on('click', 'button', () => {
    filter($list, h3, $('input').val().toUpperCase());
    appendPageLinks(results);
  });
};

// add search bar
const addSearch = () => {
  addSection($pageHeader, $searchBar);
  searchListener($searchBar);
};

addSearch();
