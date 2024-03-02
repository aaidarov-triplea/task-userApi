const USER_URL = "https://jsonplaceholder.typicode.com/users"

// rendering users list to display
const userToRender = (array) => {
    const wrapper = document.querySelector(".users__wrapper")
    const filterByNameInput = document.getElementById("filterByName")

    const filterByName = filterByNameInput.value.toLowerCase()

    wrapper.innerHTML = ''

    const filterUserByName = array
        .filter(item => item.name.toLowerCase().includes(filterByName))
        .sort((a, b) => a.phone.localeCompare(b.phone))

    filterUserByName.forEach((item) => {
      wrapper.insertAdjacentHTML(
        "afterbegin",
        `
            <div class="users__item">
                <h2 class="users__name">${item.name}</h2>
                <a class="users__phone" href="tel:${item.phone}">
                    <span>Phone number:</span> 
                    ${item.phone}
                </a>
                <a class="users__email" href="mailto:${item.email}">
                    <span>Email address:</span> 
                    ${item.email}
                </a>
            </div>
        `
      );
    });
}

//get users data from API
const getUser = () => {
    fetch(USER_URL)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        return response.json()
    })
    .then((data) => {
        userToRender(data)
    })
    .catch((err) => {
        console.log(err)
        showErrorToUser("505\nError while receiving data. Please try again later.")
    })
}

getUser()

const filterByNameInput = document.getElementById("filterByName")
filterByNameInput.addEventListener("input", getUser)

//Error show function
const showErrorToUser = (errorMessage) => {
    const container = document.querySelector('.container')
    const errorEl = document.createElement('div')
    errorEl.className = 'error__message'
    errorEl.textContent = errorMessage

    container.innerHTML = "Page not found 404";
    container.append(errorEl)

    setTimeout(() => {
        errorEl.remove()
    }, 5000)
}

//button to refresh users list
const refreshBtn = document.querySelector(".btn")
refreshBtn.addEventListener("click", getUser)