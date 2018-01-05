

const YouTube_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm} in:name`,
    key: 'AIzaSyArp60-L7MqJOzwbh3mlO8_NtL-Fsh6iys',
    part: 'snippet',
    per_page: 5
  }
  $.getJSON(YouTube_SEARCH_URL, query, callback);
}


/*function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

function onSearchResponse(response) {
    showResponse(response);
}
*/

 function renderResult(result) {
  return `
    <div>
      <h2>
      <a class="js-result-name" href="${result}" target="_blank">${result}</a> by <a class="js-user-name" href="${result}" target="_blank">${result}</a></h2>
      <p>Number of watchers: <span class="js-watchers-count">${result}</span></p>
      <p>Number of open issues: <span class="js-issues-count">${result}</span></p>
    </div>
  `;
} 

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);