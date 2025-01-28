window.onload = () => {
    const fullNameInput = document.getElementById('fullname')
    const usernameInput = document.getElementById('username')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const confirmPasswordInput = document.getElementById('confirm-password')
    const agreementInput = document.getElementById('agreement')
    const registerButton = document.getElementById('register-button')
    const hasAccount = document.getElementById('has-account')
    const formElement = document.getElementById('signup-form')
    const successSignup = document.getElementById('success-signup')
    const successSignupOk = document.getElementById('success-signup-ok')

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
        let message = checkEmptyFields(formElement.getElementsByTagName('input'))
        if (message) {return alert(message)}

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

        successSignup.classList.add('visible')
    }

    successSignupOk.onclick = (event) => {
        successSignup.classList.remove('visible')
        clearForm(formElement)
        toSignInForm()
    }

    hasAccount.onclick = (event) => {
        clearForm(formElement)
        toSignInForm()
    }

    function toSignInForm() {
        document.getElementsByTagName('h1')[0].innerText = 'Log in to the system';
        [fullNameInput, emailInput, confirmPasswordInput, agreementInput].forEach((item) => {
            item.parentElement.parentElement.style.display = 'none'
        })
        hasAccount.style.display = 'none'
        registerButton.innerText = 'Sign In'
        registerButton.onclick = (event) => {
            let message = checkEmptyFields([usernameInput, passwordInput])
            if (message) {
                alert(message)
            } else {
                alert(`Добро пожаловать, ${usernameInput.value}!`)
                clearForm(formElement)
            }
        }
    }
}


function checkEmptyFields(array) {
    let errors = []

    for (let input of array) {
        if (input.type !== 'checkbox' && !input.value) {
            highlightInvalidField(input)
            errors.push(`    - ${input.parentElement.previousElementSibling.innerText}`)
        } else {
            highlightInvalidField(input, false)
        }
    }

    return errors.length !== 0 ? `Заполните поля:\n` + errors.join('\n') : null
}

function highlightInvalidField(element, invalid = true) {
    if (invalid) {
        element.style.borderColor = '#DD3142'
    } else {
        element.style.borderColor = null
    }
}

function clearForm(form) {
    for (let input of form.getElementsByTagName('input')) {
        if (input.type !== 'checkbox') {
            input.value = null
        } else {
            input.checked = false
        }
    }
}
