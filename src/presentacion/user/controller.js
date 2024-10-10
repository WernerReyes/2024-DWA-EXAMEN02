export class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    handleRender = (res, data = [], type, message) => {
        if (type === "danger") console.error("Error:", message);
        return res.render('user', {
            title: 'Users',
            users: data[0],
            roles: data[1],
            type,
            message
        });
    }

    getAll = (req, res) => {
        this.userService.getAll()
            .then((data) => this.handleRender(res, data))
            .catch(err => this.handleRender(res, null, "danger", err));
    }

    add = (req, res) => {
        this.userService.add(req.body)
            .then(() => res.redirect('/users'))
            .catch(err => {
                this.userService.getAll()
                    .then(users => this.handleRender(res, users, "danger", err))
                    .catch(err => this.handleRender(res, null, "danger", err));
            })
    }

    edit = (req, res) => {
        this.userService.edit(req.params.id, req.body)
            .then(() => res.redirect('/users'))
            .catch(err => {
                this.userService.getAll()
                    .then(data => this.handleRender(res, data, "danger", err))
                    .catch(err => this.handleRender(res, null, "danger", err));
            })
    }


    delete = (req, res) => {
        this.userService.delete(req.params.id)
            .then(() => res.redirect('/users'))
            .catch(err => {
                this.userService.getAll()
                    .then(data => this.handleRender(res, data, "danger", err))
                    .catch(err => this.handleRender(res, null, "danger", err));
            })
    }
}