const API_KEY = "e01ad0dc46064b66846d5f051ead4a36";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));// to fetch fetchnews func

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);//to fetch api link
    const data = await res.json();//to convert in json format
    // console.log(data);  //console log mein print ho jayega
    bindData(data.articles);//to bind all news together

}

// function bindData(articles)//template-news-card ke clone bana kar card-container mein append karna h
// {
//    const cardsContainer=document.getElementById('cards-container');
//    const newsCardtemplate=document.getElementById('template-news-card');

//    cardsContainer.innerHTML="";//to empty the container
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    //    articles.forEach((article) => {
    //     if(!article.urlToImage) return;//image nahi wali news nahi ayegi
    //     const cardClone= newsCardtemplate.content.cloneNode(true);//div ke andar ke bhi div clone ho jayenge
    //     cardsContainer.appendChild(cardClone);
    //    });
    articles.forEach((article) => {
        if (!article.urlToImage) return;//image nahi wali news nahi ayegi
        const cardClone = newsCardTemplate.content.cloneNode(true);//div ke andar ke bhi div clone ho jayenge
        fillDataInCard(cardClone, article);//card dalne ke liye
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;//to set title
    newsDesc.innerHTML = article.description;//to set desc
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });//to set date in readable form

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");//to go to the website of the news
    });
}

    //navs ko handle kar rahe h
    let curSelectedNav = null;
    function onNavItemClick(id) {
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove("active"); //agr current selected class null nahi h
        curSelectedNav = navItem;
        curSelectedNav.classList.add("active");
    }

    //input dalne ke liye
    const searchButton = document.getElementById("search-button");
    const searchText = document.getElementById("search-text");

    searchButton.addEventListener("click", () => {
        const query = searchText.value;
        if (!query) return;//agar query nahi ayi to return kar dena h
        fetchNews(query);//agar query aa rahi h to 
        curSelectedNav?.classList.remove("active");//nav se active hat jayega
        curSelectedNav = null;
    });