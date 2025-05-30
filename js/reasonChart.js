const cat = document.querySelector('#catChart');
const dog = document.querySelector('#dogChart');
const full = document.querySelector('#fullChart');

const icons = document.querySelectorAll('#reasonChartContainer .icon');

const iconCats = document.querySelector('#iconCats');
const iconDogs = document.querySelector('#iconDogs');

for (const icon of icons) {
    icon.addEventListener('mouseout', () => {
        cat.classList.add('hidden');
        dog.classList.add('hidden');
        full.classList.remove('hidden');
    })
}

iconCats.addEventListener('mouseenter', () => {
    cat.classList.remove('hidden');
    dog.classList.add('hidden');
    full.classList.add('hidden');
})

iconDogs.addEventListener('mouseenter', () => {
    cat.classList.add('hidden');
    dog.classList.remove('hidden');
    full.classList.add('hidden');
})