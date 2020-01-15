/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

// Wait until page is loaded
$(document).ready(() => {

  // array of chores child clicked as done.
  // each object has:
  // --- id: (assignedChores id)
  // --- choreId: choreId
  // --- points: points of chore done
  const choresDone = [];

  // need child's point balance in more than one place
  let ptsBalance = 0;


  // This function gets chore icons from the database, and updates the html page
  function loadChoreIcons() {
    //  iconEl is the html elements for the icon
    let iconEl = '';
    let begIconEl = ''; // the beginning is always the same

    // beginning of icon element is always the same.
    // <div for the col>
    begIconEl = '<div class="col s12 m4 left iconbutton icons"> '; // start div for column with this icon button
    // <button> - not active on home page, only on child's page
    begIconEl += '<button class="waves-effect waves-light z-depth-2 disabled'; // most of button tag. close after data-id added

    $.get('api/chores', (chores) => {
      //  For each Chore, build an html icon (w/points),
      chores.forEach((chore) => {
        console.log(chore);

        // customize the image part of the icon element w/image, title and points; and append
        iconEl = begIconEl; // beginning
        iconEl += `data-id="${chore.id}"> `; // data id with chore id so we know what was clicked
        iconEl += '<img class="responsive-img" '; // start image tag w/class
        iconEl += `src="assets/css/images/${chore.iconfile}" `; // source for image
        iconEl += `alt="${chore.title}">`; // alt for image
        iconEl += `${chore.points}`; // text for image with the points
        // iconEl += `${chore.points}`; // text for image
        iconEl += '</img></button></div>'; // and end tags
        console.log(iconEl);

        // append row to html file in column 2
        $('.column1').append(iconEl);
      }); // end of forEach
    }) // end of get
      .catch((err) => {
        console.log(err);
      }); // end of catch
  } // endof loadChoreIcons function

  // Loads child's name and puts in on the html page in a couple places
  //  (nav bar on the right, and Congratulations box)
  function greetChild(childId) {
    $.get(`api/children/${childId}`, (child) => {
      // put child's name in wherever there's a greetname class
      $('.greetname').text(child.name);
      // put point balance in column 3 box
      ptsBalance = child.points; // ptsBalance is a global
      $('#ptbalance').text(ptsBalance);
    });
    // partial build for second child
    $.get(`api/children/2`, (child) => {
      // put child's name in wherever there's a greetname class
      $('.greetname2').text(child.name);
      // put point balance in column 3 box
      ptsBalance = child.points; // ptsBalance is a global
      $('#ptbalance2').text(ptsBalance);
    });
  }

  // This function gets children's names from the database,
  // and uses them for the dropdown list on the nav bar
  function loadChildrenNames() {
    // Get the children's names (the emails are available here, too)
    $.get('api/children', (children) => {
      let childLink = ''; // will be used for the html for the link

      // for each child, add a link to the dropdown list in the nav bar
      children.forEach((child) => {
        childLink = `<li><a href="child.html">${child.name}</a></li>`;
        $('.childlinks').append(childLink);
      });
    });
  } // endof loadChildrenNames function

  // This function gets parents' names from the database,
  // and uses them for the dropdown list on the nav bar
  function loadParentNames() {
    let parentLink = ''; // will be used for the html for the link
    // Get the first parent's name (the email is available here, too)
    // This is only working for one child and one set of parents, so we
    //    don't need to worry about capturing which children belong to each parent.
    $.get('api/parents', (parents) => {
      // add a link to the dropdown list in the nav bar for the each parent
      parents.forEach((parent) => {
        parentLink = `<li><a href="parent.html">${parent.name}</a></li>`;
        $('.parentlinks').append(parentLink);
      }); // end of forEach
    }); // end of get
  } // endof loadParentsNames function

  



  function renderChildPage() {
    // Greet the child by name on the right side of the nav bar
    //   and load total points balance
    // Only one child, so we know it is id 1
    greetChild(1);

    // (started - Sophie is working on...)
    // Build chore icons with points for "chores" column from chores table
    // Each icon will be clickable
    loadChoreIcons();

    // Populate dropdown list with child name from database
    loadChildrenNames();

    // Populate dropdown list with parent name from database
    loadParentNames();

  } // end of renderChildPage function

  // Get data from database and dynamically create html before showing the user the page.
  renderChildPage();

}); // end of $(document).ready

