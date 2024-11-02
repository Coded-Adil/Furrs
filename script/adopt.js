console.log("working");

const sortByPriceButton = document.getElementById('sort-by-price');
sortByPriceButton.addEventListener('click', () => {
  sortPetsByPrice();
});

// Sorting Cards
const sortPetsByPrice = () => {
  showSpinner();

  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((res) => res.json())
    .then((data) => {
      hideSpinner();

      const pets = data.pets;

      const sortedPets = pets.sort((a, b) => b.price - a.price);
      const petsContainer = document.getElementById('pets');
      petsContainer.innerHTML = '';
      displayPets(sortedPets);
    })
    .catch((error) => {
      hideSpinner();
      console.log(error);
    });
};


// loadDetails 
const loadDetails = async(modalId) => {
  console.log(modalId);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${modalId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData);
}

const displayDetails = (modal) => {
  console.log(modal);
  const detailContainer = document.getElementById('modal-content');

  detailContainer.innerHTML = `
    <figure class="px-10 pt-10">
      <img
        src=${modal.image}
        alt=""
        class="rounded-xl h-full w-full" />
    </figure>
    <div class="card-body grid grid-cols-2">
      <h2 class="card-title font-bold col-span-2">${modal.pet_name}</h2>
      <div class="flex gap-1">
        <div>
          <i class="fa-regular fa-heart"></i>
        </div>
        <p>Breed: ${modal.breed}</p>
      </div>
      <div class="flex gap-1">
        <div>
          <i class="fa-regular fa-calendar"></i>
        </div>
        <p>Birth: ${modal.date_of_birth || 'Not Available'}</p>
      </div>
      <div class="flex gap-1">
        <div>
          <i class="fa-solid fa-mercury"></i>
        </div>
        <p>Gender: ${modal.gender || 'Not Available'}</p>
      </div>
      <div class="flex gap-1">
        <div>
          <i class="fa-solid fa-dollar-sign"></i>
        </div>
        <p>Price: ${modal.price}</p>
      </div>
    </div>
    <div>
    <h2 class="text=2xl font-bold">
    Details Information
    </h2>
    <p class="text-lg">
    ${modal.pet_details}
    </p>
    </div>
  `

  document.getElementById('customModal').showModal();
}

// Show spinner
const showSpinner = () => {
  document.getElementById("spinner").classList.remove("hidden");
};

// Hide spinner
const hideSpinner = () => {
  document.getElementById("spinner").classList.add("hidden");
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const btn of buttons) {
    btn.classList.remove("active");
  }
};


const likePet = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => {
      const likedPetsContainer = document.getElementById("liked-pets");
      const likedPet = document.createElement("div");
      likedPet.classList = "p-4 h-40 w-40 m-4";
      likedPet.innerHTML = `
        <img src=${data.petData.image} alt="" class="h-fit rounded-xl w-fit" />
      `;
      likedPetsContainer.appendChild(likedPet);
    })
    .catch((error) => console.log(error));
};

// adding loadCategories
const loadCategories = () => {
  showSpinner(); 
  setTimeout(() => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((res) => res.json())
      .then((data) => {
        hideSpinner(); 
        displayCategories(data.categories);
      })
      .catch((error) => {
        hideSpinner(); 
        console.log(error);
      });
  }, 2000); 
};

// adding loadPets
const loadPets = () => {
  showSpinner(); 
  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
      .then((res) => res.json())
      .then((data) => {
        hideSpinner(); 
        displayPets(data.pets);
      })
      .catch((error) => {
        hideSpinner(); 
        console.log(error);
      });
  }, 2000); 
};

// Adding loadCategoryPets
const loadCategoryPets = (id) => {
  showSpinner(); 
  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        hideSpinner(); 
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayPets(data.data);
      })
      .catch((error) => {
        hideSpinner(); 
        console.log(error);
      });
  }, 2000); 
};

//adding DisplayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);

    //adding buttons
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("mx-auto");
    btnContainer.innerHTML = `
      <button id="btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="btn btn-outline btn-lg w-40 category-btn rounded-xl">
          <img src=${item.category_icon} class="h-6 w-6" />
          <h2 class="font-bold text-lg">${item.category}</h2>
      </button>
    `;
    categoryContainer.append(btnContainer);
  });
};

// Adopt Pet function
const adoptPet = (petId) => {
  const adoptButton = document.getElementById(`adopt-btn-${petId}`);
  const countdownContainer = document.getElementById('countdown-content');
  const modal = document.getElementById('adoptModal');

  let countdown = 3;

  modal.showModal();

  const intervalId = setInterval(() => {
    countdownContainer.textContent = countdown;
    if (countdown === 0) {
      clearInterval(intervalId);
      modal.close();
      adoptButton.disabled = true;
      adoptButton.classList.add("disabled");
    }
    countdown--;
  }, 1000);
}


//adding DisplayPets
const displayPets = (pets) => {
  const petsContainer = document.getElementById("pets");
  petsContainer.innerHTML = "";

  if (pets.length == 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
    <div class="bg-base-200 flex flex-col justify-center items-center min-h-screen gap-5">
      <img src="images/error.webp"/>
      <h2 class="font-bold text-6xl text-center">No Information Available</h2>
      <p class="text-center text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
      its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
    return;
  }

  pets.forEach((pet) => {
    console.log(pet);
    const card = document.createElement("div");
    card.classList = "card border rounded-xl";
    card.innerHTML = `
    <figure class="px-10 pt-10">
      <img
        src=${pet.image}
        alt=""
        class="rounded-xl h-full w-full" />
    </figure>
    <div class="card-body">
      <h2 class="card-title font-bold">${pet.pet_name}</h2>
      <div class="flex gap-1">
        <div>
          <i class="fa-regular fa-heart"></i>
        </div>
        <p>Breed: ${pet.breed}</p>
      </div>
      <div class="flex gap-1">
        <div>
          <i class="fa-regular fa-calendar"></i>
        </div>
        <p>Birth: ${pet.date_of_birth || 'Not Available'}</p>
      </div>
      <div class="flex gap-1">
        <div>
          <i class="fa-solid fa-mercury"></i>
        </div>
        <p>Gender: ${pet.gender || 'Not Available'}</p>
      </div>
      <div class="flex gap-1">
        <div>
          <i class="fa-solid fa-dollar-sign"></i>
        </div>
        <p>Price: ${pet.price}</p>
      </div>
      <div class="card-actions border-t pt-4 flex justify-between">
        <button onclick="likePet(${pet.petId})" class="btn btn-md">
          <i class="fa-regular fa-thumbs-up"></i>
        </button>
        <button id="adopt-btn-${pet.petId}" onclick="adoptPet(${pet.petId})" class="btn btn-md text-[#0E7A81] font-bold text-md">Adopt</button>
        <button onclick="loadDetails(${pet.petId})" class="btn btn-md text-[#0E7A81] font-bold text-md">Details</button>
      </div>
    </div>
    `;
    petsContainer.append(card);
  });
};


loadCategories();
loadPets();
