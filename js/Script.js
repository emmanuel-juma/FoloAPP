
const YOUTUBE_API_KEY = 'AIzaSyAfTNM0wQ_-X8nAFI0zmmuynTg00FhW8Kk';

// ===== Elements =====
const landingPage = document.getElementById('landing');
const loginPage = document.getElementById('login');
const appPage = document.getElementById('app');

const getStartedBtn = document.getElementById('getStartedBtn');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const userNameSpan = document.getElementById('userName');

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');
const youtubeResults = document.getElementById('youtubeResults'); // add this div to your HTML

// ===== Show one page =====
function showPage(page) {
  landingPage.classList.remove('active');
  loginPage.classList.remove('active');
  appPage.classList.remove('active');
  page.classList.add('active');
}

// ===== Buttons =====


getStartedBtn.addEventListener('click', function () {
  showPage(loginPage);
});

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (username === '' || password === '') {
    alert('Please enter name and password');
    return;
  }

  userNameSpan.textContent = username;
  showPage(appPage);
});

logoutBtn.addEventListener('click', function () {
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  searchInput.value = '';
  resultsDiv.innerHTML = '';
  youtubeResults.innerHTML = '';
  showPage(landingPage);
});

searchBtn.addEventListener('click', function () {
  const query = searchInput.value.trim();

  if (query === '') {
    alert('Please type a course name');
    return;
  }

  searchResources(query);
  searchYouTube(query);
});

searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});




// ===== Books (Open Library) =====
function searchResources(query) {
  resultsDiv.textContent = 'Loading resources...';

  fetch('https://openlibrary.org/search.json?q=' + encodeURIComponent(query) + '&limit=8')
    .then(function (response) {
      if (!response.ok) throw new Error('Open Library request failed');
      return response.json();
    })
    .then(function (data) {
      resultsDiv.innerHTML = '';

      if (data.docs.length === 0) {
        resultsDiv.textContent = 'No resources found. Try another course.';
        return;
      }

      data.docs.forEach(function (book) {
        const author = book.author_name ? book.author_name[0] : 'Unknown author';
        const year = book.first_publish_year || 'N/A';

        const card = document.createElement('div');
        card.className = 'result-card';

        const title = document.createElement('h3');
        title.textContent = book.title || 'No title';

        const info = document.createElement('p');
        info.textContent = 'Author: ' + author + ' | Year: ' + year;

        card.appendChild(title);
        card.appendChild(info);
        resultsDiv.appendChild(card);
      });
    })
    .catch(function (error) {
      resultsDiv.textContent = 'Something went wrong. Please try again.';
      console.log(error);
    });
}

// ===== Videos (YouTube) =====
function searchYouTube(query) {
  youtubeResults.textContent = 'Loading YouTube videos...';

  const url =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6' +
    '&q=' + encodeURIComponent(query + ' educational tutorial') +
    '&key=' + YOUTUBE_API_KEY;

  fetch(url)
    .then(function (response) {
      if (!response.ok) throw new Error('YouTube API request failed');
      return response.json();
    })
    .then(function (data) {
      youtubeResults.innerHTML = '';

      if (!data.items || data.items.length === 0) {
        youtubeResults.textContent = 'No videos found. Try another search.';
        return;
      }

      data.items.forEach(function (video) {
        const card = document.createElement('div');
        card.className = 'result-card';

        const image = document.createElement('img');
        image.src = video.snippet.thumbnails.medium.url;
        image.alt = video.snippet.title;
        image.style.width = '100%';

        const title = document.createElement('h3');
        title.textContent = video.snippet.title;

        const channel = document.createElement('p');
        channel.textContent = 'Channel: ' + video.snippet.channelTitle;

        const link = document.createElement('a');
        link.href = 'https://www.youtube.com/watch?v=' + video.id.videoId;
        link.textContent = 'Watch Video';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(channel);
        card.appendChild(link);
        youtubeResults.appendChild(card);
      });
    })
    .catch(function (error) {
      youtubeResults.textContent = 'Unable to load YouTube videos. Please try again.';
      console.log(error);
    });
}