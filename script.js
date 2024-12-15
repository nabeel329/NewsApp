const API_KEY = "ae2e26dd4f6e436687b1f60b264590e0";
const inputdata = document.getElementById("inputField");  
const showNews = document.getElementById("showNews");  

const searchNews = async () => {  
    const query = inputdata.value.trim();

    if (!query) {
        alert("Please enter a topic to search for news.");
        return;
    }

    showNews.innerHTML = `<div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span></div>`;  

    const API_URL = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

    try {
        const fetchData = await fetch(API_URL);
        const response = await fetchData.json();

        if (response.status === "error") {
            alert(response.message);
        } else if (response.articles.length === 0) {
            alert("No news articles found for this topic.");
        } else {
            showNews.innerHTML = ""; // Clear previous results
            response.articles.forEach(article => {
                showNews.innerHTML += `
                    <div class="news-card">
                        <img src="${article.urlToImage || 'https://via.placeholder.com/300x150'}" alt="News Image">
                        <h5>${article.title}</h5>
                        <p>${article.description || "No description available."}</p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                    </div>`;
            });
        }
    } catch (error) {
        alert("Error fetching news. Please try again later.");
    } finally {
        inputdata.value = ""; // Clear the input field
    }
};
