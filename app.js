var accessToken = '';
var liveVideoId = '';
let commentPool = [];

// Function to fetch comments from the live video
async function fetchComments() {
    const url = `https://graph.facebook.com/${liveVideoId}/comments?access_token=${accessToken}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

// Function to process comments and add eligible users to the raffle pool
async function updateCommentPool() {
    const comments = await fetchComments();
    comments.forEach(comment => {
        if (comment.message.includes(document.getElementById("wordFilter").value) && !commentPool.some(user => user.userId === comment.from.id)) {
            commentPool.push({ userId: comment.from.id, userName: comment.from.name });
        }
    });
    displayCommentPool();
}

// Function to display the comment pool on the web page
function displayCommentPool() {
    const commentPoolBody = document.getElementById('commentPool').getElementsByTagName('tbody')[0];
    commentPoolBody.innerHTML = '';
    commentPool.forEach(user => {
        const row = document.createElement('tr');
        const cellId = document.createElement('td');
        const cellName = document.createElement('td');

        cellId.textContent = user.userId;
        cellName.textContent = user.userName;

        row.appendChild(cellId);
        row.appendChild(cellName);
        commentPoolBody.appendChild(row);
    });
}

// Event listeners for the buttons
document.getElementById('getComments').addEventListener('click', () => {
    accessToken = document.getElementById("accessToken").value
    liveVideoId = document.getElementById("liveVideoId").value
    updateCommentPool();
});

function copytable(el) {
    var urlField = document.getElementById(el)   
    var range = document.createRange()
    range.selectNode(urlField)
    window.getSelection().addRange(range) 
    document.execCommand('copy')
}
