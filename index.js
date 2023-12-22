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
  select.addEventListener('change', (e) => {
    let container = document.getElementById('container');
    container.innerHTML = '';
    arr.forEach((element) => {
      if (element.region == select.value) {
        render(element);
      }
    });
    if (flag == 1) {
      modechange('hsl(207, 26%, 17%)', 'hsl(209, 23%, 22%)', 'white');
    } else {
      modechange('hsl(0, 0%, 98%)', 'white', 'black');
    }
  });
  let search = document.getElementById('search');
  search.addEventListener('keyup', (e) => {
    let container = document.getElementById('container');
    container.innerHTML = '';
    arr.forEach((element) => {
      if (
        element.name.common
          .toLowerCase()
          .includes(search.value.toLowerCase())
      ) {
        render(element);
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
    //   }
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
});

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
}
