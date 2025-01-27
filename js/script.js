window.onload = () => {
    const fullNameInput = document.getElementById('fullname')
    const usernameInput = document.getElementById('username')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const confirmPasswordInput = document.getElementById('confirm-password')
    const agreementInput = document.getElementById('agreement')
    const registerButton = document.getElementById('register-button')
    const hasAccountCheck = document.getElementById('has-account')
    const formElement = document.getElementById('signup-form')

    fullNameInput.onkeydown = (event) => {
        if (!isNaN(parseInt(event.key))) {
            return false
        }
    }

    usernameInput.onkeydown = (event) => {
        if (['.', ','].includes(event.key)) {
            return false
        }
    }

    agreementInput.onchange = (event) => {
        console.log(event.target.checked ? 'Согласен' : 'Не согласен')
    }

    registerButton.onclick = (event) => {
        for (let input of formElement.getElementsByTagName('input')) {
            if (input.type !== 'checkbox' && !input.value) {
                highlightInvalidField(input)
                return alert(`Заполните поле "${input.parentElement.previousElementSibling.innerText}"`)
            } else {
                highlightInvalidField(input, false)
            }
        }
        if (passwordInput.value.length < 8) {
            highlightInvalidField(passwordInput)
            return alert('Пароль должен содержать не менее 8 символов!')
        } else {
            highlightInvalidField(passwordInput, false)
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            highlightInvalidField(passwordInput)
            highlightInvalidField(confirmPasswordInput)
            return alert('Введенные пароли не совпадают!')
        }

        if (!agreementInput.checked) {
            highlightInvalidField(agreementInput.parentElement)
            return alert('Необходимо принять условия!')
        } else {
            highlightInvalidField(agreementInput.parentElement, false)
        }
    }

    // registerButton.onclick = () => {}
}


function highlightInvalidField(element, invalid=true) {
    if (invalid) {
        element.style.borderColor = '#DD3142'
    } else {
        element.style.borderColor = null
    }
}
