let mode = localStorage.getItem('mode') || 0;

function setMode() {
  localStorage.setItem('mode', mode.toString());
}
let arr = [];
fetch(' https://restcountries.com/v3.1/all ')
  .then((data) => data.json())
  .then((data) => {
    arr = data;
    data.forEach((element) => {
      if (element.name.common == 'Belgium') {
        console.log(element);
      }
      render(element);
    });
  });

function render(country) {
  let container = document.getElementById('container');

  let div = document.createElement('div');
  div.className = 'country-card';
  let img = document.createElement('img');
  img.className = 'country-card-img';
  img.src = country.flags.png;
  let name = document.createElement('h3');
  name.innerText = country.name.common;
  name.className = 'country-card-name';

  let section = document.createElement('section');
  let population = document.createElement('h4');
  population.innerText = 'Population :';
  let value = document.createElement('span');
  value.innerText = country.population;
  section.appendChild(population);
  section.appendChild(value);
  section.className = 'country-card-population';

  let section1 = document.createElement('section');
  let region = document.createElement('h4');
  region.innerText = 'Region :';
  let reg = document.createElement('span');
  reg.innerText = country.region;
  section1.appendChild(region);
  section1.appendChild(reg);
  section1.className = 'country-card-region';

  let section2 = document.createElement('section');
  let capital = document.createElement('h4');
  capital.innerText = 'Capital :';
  let cap = document.createElement('span');
  cap.innerText = country.capital;
  section2.appendChild(capital);
  section2.appendChild(cap);
  section2.className = 'country-card-capital';

  div.appendChild(img);
  div.appendChild(name);
  div.appendChild(section);
  div.appendChild(section1);
  div.appendChild(section2);
  container.appendChild(div);
}

document.addEventListener('DOMContentLoaded', (e) => {
  let select = document.getElementById('filter-select');
  let search = document.getElementById('search');
  select.addEventListener('change', (e) => {
    let container = document.getElementById('container');
    container.innerHTML = '';

    if (select.value == '') {
      arr.forEach((element) => {
        if (
          element.name.common
            .toLowerCase()
            .includes(search.value.toLowerCase())
        ) {
          render(element);
        }
      });
    } else {
      arr.forEach((element) => {
        if (
          element.name.common
            .toLowerCase()
            .includes(search.value.toLowerCase())
        ) {
          if (element.region == select.value) {
            render(element);
          }
        }
      });
    }
    if (container.innerHTML == '') {
      container.innerHTML = `<h1 class="no-country-found">NO COUNTRY FOUND IN THIS REGION</h1>`;
    }

    if (flag == 1) {
      modechange('hsl(207, 26%, 17%)', 'hsl(209, 23%, 22%)', 'white');
    } else {
      modechange('hsl(0, 0%, 98%)', 'white', 'black');
    }
  });

  search.addEventListener('keyup', (e) => {
    let container = document.getElementById('container');
    container.innerHTML = '';
    arr.forEach((element) => {
      if (
        element.name.common
          .toLowerCase()
          .includes(search.value.toLowerCase())
      ) {
        if (select.value == '') {
          render(element);
        }
        if (select.value == element.region) {
          render(element);
        }
      }
      if (flag == 1) {
        modechange(
          'hsl(207, 26%, 17%)',
          'hsl(209, 23%, 22%)',
          'white'
        );
      } else {
        modechange('hsl(0, 0%, 98%)', 'white', 'black');
      }
    });
    if (container.innerHTML == '') {
      container.innerHTML = `<h1 class="no-country-found">NO COUNTRY FOUND IN THIS REGION</h1>`;
    }
  });

  let flag = 0;
  let darkmode = document.getElementById('darkmode');
  let body = document.getElementsByTagName('body')[0];
  darkmode.addEventListener('click', (e) => {
    if (flag == 0) {
      modechange('hsl(207, 26%, 17%)', 'hsl(209, 23%, 22%)', 'white');

      flag = 1;
      mode = flag;
      setMode();
    } else {
      modechange('hsl(0, 0%, 98%)', 'white', 'black');
      flag = 0;
      mode = flag;
      setMode();
    }
  });

  let container = document.getElementById('container');
  container.addEventListener('click', detailsRender);
  let back = document.getElementById('back');
  back.addEventListener('click', (e) => {
    backbutton();
  });

  let button = document.getElementById('country-data');
  button.addEventListener('click', (e) => {
    countryDetails(e.target.innerText);
  });
});

/* This function helps in changin the mode */

function modechange(BodyColor, ElementColor, textColor) {
  document.getElementById('moon-icon').style.fill = 'white';
  document.getElementsByTagName('body')[0].style.backgroundColor =
    BodyColor;
  document.getElementsByTagName('body')[0].style.color = textColor;
  document.getElementsByTagName('header')[0].style.backgroundColor =
    ElementColor;
  document.getElementById('container').style.backgroundColor =
    BodyColor;
  let arr = document.getElementsByClassName('country-card');
  document.getElementById('search-bar').style.backgroundColor =
    ElementColor;
  document.getElementsByTagName('input')[0].style.backgroundColor =
    ElementColor;
  document.getElementsByTagName('input')[0].style.color = textColor;
  document.getElementsByTagName('select')[0].style.backgroundColor =
    ElementColor;
  document.getElementsByTagName('select')[0].style.color = textColor;
  for (let index = 0; index < arr.length; index++) {
    arr[index].style.backgroundColor = ElementColor;
    arr[index].style.color = textColor;
  }

  let botton = document.getElementsByClassName(
    'country-border-button'
  );

  for (let index = 0; index < botton.length; index++) {
    botton[index].style.backgroundColor = ElementColor;
    botton[index].style.color = textColor;
  }

  document.getElementById('back').style.backgroundColor =
    ElementColor;
  document.getElementById('back').style.color = textColor;
  document.getElementById(
    'country-info-container'
  ).style.backgroundColor = BodyColor;

  document.getElementById('country-data').style.backgroundColor =
    BodyColor;
}

/* helps in getting back to main page */

function backbutton() {
  let div = document.getElementById('country-info-container');
  let displayer = document.getElementById('displayer');

  div.style.display = 'none';
  displayer.style.display = 'block';
}

/* get the list of  curriencies in the country */
function currency(data) {
  let s = '';
  for (let key in data) {
    s += data[key].name;
  }
  return '  ' + s;
}
/* get the list of languages */
function language(data) {
  let str = '';
  for (let key in data) {
    str = str + data[key] + ',';
  }
  return '     ' + str;
}

function detailsRender(e) {
  countryDetails(e.target.parentElement.children[1].innerText);
}

/* This function is to render all the  country which share the border in the form of a button by convet the cca3 code to name */
function buttonRender(array) {
  if (array != undefined) {
    let str = '';
    array.sort();

    let button = document.createElement('button');
    array.forEach((element) => {
      button.innerText = element;
      arr.forEach((country) => {
        if (element == country.cca3) {
          str =
            str +
            `<button class="country-border-button">${country.name.common}</button>`;
        }
      });
    });
    return str;
  }
  return 'no borders';
}

/* This function is to render the data of the countries in the details section */
function countryDetails(countryname) {
  let div = document.getElementById('country-info-container');
  let data = document.getElementById('country-data');
  let displayer = document.getElementById('displayer');

  arr.forEach((country) => {
    if (country.name.common == countryname) {
      data.innerHTML = `<img id="display-img" src='${
        country.flags.png
      }'>
      <section id="details-container">
      <div class="contain">
      <section id="country-name" class="country-card-rows"><h3>${
        country.name.common
      }</h3></section>
      <div id="info">
      <section class="country-card-rows"><h4>Native name:    </h4><span>${native(
        country
      )}</span></section>
      <section class="country-card-rows"><h4>Population:    </h4><span>${
        country.population
      }</span></section>
      <section class="country-card-rows"><h4>Region:    </h4><span>${
        country.region
      }</span></section>
      <section class="country-card-rows"><h4>Capital:   </h4><span>${
        country.capital
      }</span></section>
      <section class="country-card-rows"><h4>Sub Region:    </h4><span>${
        country.subregion
      }</span></section>
      <section id="country-info-div" class="country-card-rows" ><h4>Top Level Domain:   </h4><span>.${country.cca2.toLowerCase()}</span></section>
      <section class="country-card-rows" ><h4>Curriencies: </h4><span>${currency(
        country.currencies
      )}</span></section>
      <section class="country-card-rows" ><h4>Languages: </h4><span>${language(
        country.languages
      )}</span></section>
      
      </div> 
      <div id="border-countrys">
      <h4>Border Countries :</h4>
      <section id="button-container">
       ${buttonRender(country.borders)}
       </section>
      </div>
      </div>
      </section>
      `;

      div.style.display = 'block';
      displayer.style.display = 'none';
    }
  });
}

function native(country) {
  if (country.altSpellings.length < 2) {
    return country.name.common;
  }
  return country.altSpellings[1];
}
