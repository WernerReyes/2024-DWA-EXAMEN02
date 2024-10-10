function showAlert(message, type) {
    Swal.fire({
        title: message,
        icon: getIcon(type),
        confirmButtonText: "Aceptar"
    });
}

function getIcon(type) {
    switch (type) {
        case 'success':
            return 'success';
        case 'danger':
            return 'error';
        case 'warning':
            return 'warning';
        case 'info':
            return 'info';
        default:
            return 'question';
    }
}


function showAlertToDelete(message, route, id) {
    Swal.fire({
        title: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `/${route}/${id}`;
        }
    });
}