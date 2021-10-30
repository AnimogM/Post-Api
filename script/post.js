let singleContainer = document.querySelector('.single-page');
let title = document.querySelector('title')
singleContainer.innerHTML = "";
// redirect to new page
const singlePage = () => {
    const urlID = window.location.search;
    fetch(`https://jsonplaceholder.typicode.com/posts/${urlID}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            singleContainer.innerHTML += `<div class="col-md-8 pb-5 ">
            <div class="card h-100">
                <div class="card-body">
                    <p class="text-center search-id">${element.id}</p>
                    <h3 class="card-title mb-3 text-center search-title">${element.title}</h3>
                    <p class="card-text lh-lg pb-4 px-3">${element.body}</p>
                </div>
            </div>
             </div>`
            title.innerText = `post ${element.id}`
        });

    })
    .catch(error => {
        singleContainer.innerHTML = `<div class="display-3 text-center text-danger mt-5">${error.message} posts</div>`
    })
}
singlePage()


