var xhr = new XMLHttpRequest();
var url = 'https://odphp.health.gov/myhealthfinder/api/v3/topicsearch.json';
url += '?TopicId=30760';
url += '&lang=en';

xhr.open('GET', url);
xhr.send();

xhr.onload = function () {
    var response = JSON.parse(xhr.response);

    console.log(response.Result.Resources.Resource[0].ImageUrl);
    console.log(response);

    // Loop through each resource and append image to body.

    response.Result.Resources.Resource.forEach(resource => {
        img = document.createElement('img');
        img.src = resource.ImageUrl;
        document.body.appendChild(img);

        header = document.createElement('H1');

        header.innerHTML = resource.Title;

        document.body.appendChild(header);

        resource.RelatedItems.RelatedItem.forEach(relatedItem => {
            // Show title and URL to each item
            itemLink = document.createElement('a');
            itemLink.style.display = 'block';

            itemLink.href = relatedItem.Url;
            itemLink.innerHTML = relatedItem.Title;
            itemLink.target = '_blank';

            document.body.appendChild(itemLink);
        });
    });
}