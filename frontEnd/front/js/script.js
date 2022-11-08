console.log('Fetch API');

// Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - to nowy interfejs do pobierania i wysyłania danych za pomocą HTTP. Jest podobne do 'XMLHttpRequest', ale ma więcej możliwości. Pisanie zapytań przy użyciu Fetch API jest szybsze i przyjemniejsze niż za pomocą 'XMLHttpRequest'.

// Fetch API definiuje 2 główne obiekty:
// - Request - https://developer.mozilla.org/en-US/docs/Web/API/Request
// - Response - https://developer.mozilla.org/en-US/docs/Web/API/Response
// Oraz dostarcza globalnej funkcji 'fetch()', przy pomocy której programista dokonuje zapytań AJAX.

// Fetch API prowadzi także wsparcie dla CORS.

// CORS (ang. Cross-origin resource sharing ) - mechanizm bezpieczeństwa umożliwiający współdzielenie lub blokowanie zasobów pomiędzy serwerami. A ściślej rzecz biorąc chodzi o możliwość (lub jej brak) wykonywania zapytań AJAX. https://pl.wikipedia.org/wiki/Cross-Origin_Resource_Sharing

// Przykłady użycia 'Fetch API' - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch



    fetch('http://localhost:8080/api/post/all')
    .then(response => response.json())
    .then((data) => {

        console.log(data);
       
    });   

axios.get('http://localhost:8080/api/post/all')
// .then(res => res.json)
.then(res => {console.log(res.data);
    console.log(res.data[0].content);
    document.write("<h1>"+ res.data[0].content+ "</h1>");
});
