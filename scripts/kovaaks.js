import { KovaaksApiClient } from 'https://esm.sh/kovaaks-api-client';

const client = new KovaaksApiClient();

// Utility: format date nicely
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Utility: create a score card HTML block
function createScoreCard({ scenarioName, score, timestamp }) {
  return `
    <div class="gear-card">
      <div class="gear-info">
        <span class="gear-name">${scenarioName}</span>
        <span class="gear-name">${score}</span>
        <span class="gear-type">${formatDate(timestamp)}</span>
      </div>
    </div>
  `;
}

// Main function to get and display data
async function getRecentScores(username) {
  try {
    const data = await client.getRecentHighScoresByUsername({ username });

    const grid = document.querySelector('.kovaaks-grid');
    if (!grid) {
      console.warn('No element with class .kovaaks-grid found.');
      return;
    }

    // Clear existing content
    grid.innerHTML = '';

    // Create cards and insert them
    const cardsHTML = data
      .map(entry => createScoreCard(entry))
      .join('');

    grid.insertAdjacentHTML('beforeend', cardsHTML);

  } catch (error) {
    console.error('Error fetching scores:', error);
  }
}

// Run on load
getRecentScores('Spectral');
