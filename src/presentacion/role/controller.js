export class RoleController {
    constructor(roleService) {
        this.service = roleService;
    }

    handleRender = (res, roles = [], type, message) => {
        if (type === "danger") console.error("Error:", message);
        return res.render('role', {
            title: 'Roles',
            roles,
            type,
            message
        });
    }

    getAll = (req, res) => {
        this.service.getAll()
            .then(roles => this.handleRender(res, roles))
            .catch(err => this.handleRender(res, null, "danger", err));
    }

    add = (req, res) => {
        this.service.add(req.body)
            .then(() => res.redirect('/roles'))
            .catch(err => {
                this.service.getAll()
                    .then(roles => this.handleRender(res, roles, "danger", err))
                    .catch(err => this.handleRender(res, null, "danger", err));
            })
    }

    edit = (req, res) => {
        this.service.edit(req.params.id, req.body)
            .then(() => res.redirect('/roles'))
            .catch(err => {
                this.service.getAll()
                    .then(roles => this.handleRender(res, roles, "danger", err))
                    .catch(err => this.handleRender(res, null, "danger", err));
            })
    }

    delete = (req, res) => {
        this.service.delete(req.params.id)
            .then(() => res.redirect('/roles'))
            .catch(err => {
                this.service.getAll()
                    .then(roles => this.handleRender(res, roles, "danger", err))
                    .catch(err => this.handleRender(res, null, "danger", err));
            })
    }
}