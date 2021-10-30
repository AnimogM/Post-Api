let container = document.querySelector('.posts-body');
let newContent = document.querySelectorAll('.new-content');
let form = document.getElementById('form');
let btn = document.getElementById('create');
let dataArray = [];

// render post
const renderPosts = (post) => {
    let b = post.map((items) => {
        return ` <div class="col-lg-4 col-md-6 search-hide">
                    <a href="post.html?id=${items.id}" class="text-decoration-none text-dark">
                        <div class="card h-100">
                            <div class="card-body">
                                <p class="text-end search-id">${items.id}</p>
                                <h5 class="card-title text-center search-title">${items.title}</h5>
                                <p class="card-text pb-2">${items.body}</p>
                            </div>
                        </div>
                    </a>
                </div> 
         `
    })
    .join('')
    container.innerHTML = b;
};

// get request
const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        dataArray = data
        renderPosts(data);
        filterPost()
       
    })
    .catch(error => {
        container.innerHTML = `<div class="display-3 text-center text-danger mt-5">${error.message} posts</div>
        <p class="text-center">Check internet connection</p>`   
    })
}
getPosts()

// post request
const createPosts = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: newContent[0].value,
                body: newContent[1].value,
                userId: 3
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(data => {
            alerts('post created successfully!');
            dataArray.unshift(data);
            renderPosts(dataArray);
            filterPost()
        });
    });
};
createPosts();


// Alert
let alertPlaceholder = document.getElementById('liveAlertPlaceholder');
function alerts(message) {
  let wrapper = document.createElement('div');
  wrapper.innerHTML = '<div class="alert text-center bg-success text-white alert-change' + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper);
};



 // filtering post
const filterPost = () => {
     let search = document.getElementById('search-box');     
     let searchHide = document.querySelectorAll('.search-hide')
     search.addEventListener('keyup',  (e) => {
         const term = e.target.value.toLowerCase();
         searchHide.forEach((item) => {
             let title = item.querySelector('.search-title').innerText;
             let id = item.querySelector('.search-id').innerText;
             if(title.toLowerCase().indexOf(term) != -1 || id.indexOf(term) != -1){
                 item.style.display = 'block'
             }else{
                 item.style.display = 'none'
             }
         })
     })
}



