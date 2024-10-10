const modal = new bootstrap.Modal(document.getElementById('modal'))
const form = document.querySelector('#form')
const contentTable = document.querySelector('#content-table')


const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
on(document, 'click', '.btn-edit', e => {
    const id = e.target.dataset.id

    if (document.querySelector('[name="name"]')) {
        loadRole(id, e)
    } else {
        loadUser(id)
    }

    modal.show()
})


function loadRole(id, e) {
    form.action = `/roles/${id}`
    form.method = 'POST'

    let name = document.querySelector('[name="name"]')
    name.value = e.target.parentElement.previousElementSibling.innerHTML

}


function loadUser(id) {
    form.action = `/users/${id}`
    form.method = 'POST'

    const inputs = form.querySelectorAll('input');
    const row = contentTable.querySelector(".row-" + id)

    const select = form.querySelector('select')
    const roleName = row.children[inputs.length + 1].innerHTML

    Array.from(select.options).forEach(option => {
        if (option.innerHTML === roleName) {
            option.selected = true;
        }
    });

    inputs.forEach((input, index) => {
        const value = row.children[index + 1].innerHTML;
        input.value = value;
    })


}
