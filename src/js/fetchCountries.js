export default function fetchCountries(inputValue) {
  return fetch(`https://restcountries.eu/rest/v2/name/${inputValue}`)
    .then(response => response.json())
    .then(
      data =>
        //   console.log(data);
        data,
    );
  // .catch(error => {
  //   console.log(error);
  // });
}
