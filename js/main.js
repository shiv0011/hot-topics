const p = console.log;

const $container = document.querySelector(".dynamic-content .box");
const $links = document.querySelectorAll("navbar ul a");

let defaultUrl = document.location.href;

defaultUrl = defaultUrl.split("/");

defaultUrl.pop();

defaultUrl = defaultUrl.join("/");

defaultUrl = `${defaultUrl}/partials/home.html`;

const contents = {};

fetch(defaultUrl)
    .then(function (rsp) {
        return rsp.text();
    })
    .then(function (data) {
        contents[defaultUrl] = data;
        $container.innerHTML = contents[defaultUrl];
    });


const storeContents = function (urlVal) {

    if (!contents[urlVal]) {
        fetch(urlVal)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                contents[urlVal] = data;
                $container.innerHTML = contents[urlVal];
                p("AJAX loaded");
            });
    } else {
        $container.innerHTML = contents[urlVal];
        p("ARRAY loaded");
    }

};

const handleClick = function (e) {
    e.preventDefault();
    let url = e.target.href;
    //p(url);
    storeContents(url);
};

for (let i = 0; i < $links.length; i++) {
    $links[i].addEventListener("click", handleClick);
}
