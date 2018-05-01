window.onload = function() {
  if (localStorage.getItem('issues')) {fetchIssues()};
  document.getElementById("openIssue").addEventListener('click', function() {
    (!document.getElementById('issueDescInput').value || !document.getElementById('issueAssignedToInput').value)
      ? alert('Enter a problem and who caused it!')
      : saveIssue()
  });
}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues[i].status = 'Closed';
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  console.log(issues)
  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1);
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function saveIssue(e) {
  var id = chance.guid();
  var description = document.getElementById('issueDescInput').value;
  var severity = document.getElementById('issueSeverityInput').value;
  var assignedTo = document.getElementById('issueAssignedToInput').value;
  var status = 'Open';

  var issue = {
    id,
    description,
    severity,
    assignedTo,
    status
  }

  if (localStorage.getItem('issues') === null) {
    var issues = [];
    issues.unshift(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.unshift(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueAssignedToInput').value = '';

  fetchIssues();
  e.preventDefault();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for(var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo
    var status = issues[i].status;

    issuesList.innerHTML += '<div class="issue">' +
                            '<h6 id="id"> Issue ID:' + id + '</h6>' +
                            '<p><span class="tag is-info">' + status + '</span></p>' +
                            '<p class="is-size-4">' + desc + '</p>' +
                            '<p class="spaced"><span class="fas fa-clock"></span>' + severity + '</p>' +
                            '<p class="spaced"><span class="icon fas fa-user"></span>' + assignedTo + '</p>' +
                            '<button href="#" onClick="setStatusClosed(\''+ id + '\')" class="button is-warning">Close</button>' +
                            '<button href="#" onCLick="deleteIssue(\''+ id + '\')" class="button is-danger">Delete</button>' +
                            '</div>'
                            ;
  }
}