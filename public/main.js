//Main Sections
const weaponClass = document.querySelector('.weaponClass');
const weaponName = document.querySelector('.weaponName');
const weapon = document.querySelector('.weapon');

//Weapon Sub Sections
const wPic = document.querySelector('.weaponPic');
const wName = document.querySelector('.name');
const wSkill = document.querySelector('.skill');
const wDamage = document.querySelector('.baseDamage');
const wRequirements = document.querySelector('.requirements');
const wScaling = document.querySelector('.scaling');
const wCrit = document.querySelector('.crit');
const wWeight = document.querySelector('.weight');
const wDescription = document.querySelector('.description');

//API Object
let objData;

//Event Listeners
weaponClass.addEventListener('click', getClassObj);
weaponName.addEventListener('click', getNameObj);

//Fetch on page load
fetch(`http://localhost:8000/api/`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    objData = data;

    for (let key in data) {
      let links = document.createElement('div');
      // console.log(key);
      links.textContent = key;
      links.setAttribute('value', key);
      weaponClass.appendChild(links);
    }
  });

function getClassObj(event) {
  let value = event.target.getAttribute('value');
  weaponClass.classList.toggle('hidden');

  for (let key in objData[value]) {
    let links = document.createElement('div');
    links.textContent = key;
    links.setAttribute('value', key);
    links.setAttribute('weaponClassName', value);
    weaponName.appendChild(links);
    weaponClass.classList.toggle('hidden');
  }
}

function getNameObj(event) {
  function showAll(obj) {
    let dString = '';
    for (val in obj) {
      console.log(val);
      dString += `<br> &emsp;${val}: ${obj[val]} `;
    }
    return dString;
  }

  let value = event.target.getAttribute('value');
  let weaponClassValue = event.target.getAttribute('weaponClassName');
  const weaponObj = objData[weaponClassValue][value];

  let links = document.createElement('div');
  weapon.appendChild(links);

  wPic.src = weaponObj.image;
  wName.innerText = weaponObj.name;
  wSkill.innerText = weaponObj.skill;
  wDamage.innerHTML = showAll(weaponObj['base damage']);
  wRequirements.innerHTML = showAll(weaponObj['requirements']);
  wScaling.innerHTML = showAll(weaponObj['scaling']);
  wCrit.innerText = weaponObj.crit;
  wWeight.innerText = weaponObj.weight;
  wDescription.innerText = weaponObj.description;

  weaponName.classList.toggle('hidden');
  weapon.classList.toggle('hidden');
  wPic.classList.toggle('hidden');
}
