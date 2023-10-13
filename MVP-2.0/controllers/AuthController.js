const bcrypt = require('bcryptjs')

const User = require('../models/User')
const { use } = require('../routes/authRoutes')

module.exports = class AuthController {
    static async registerUserSave(request, response) {
        const { name, email, password, passwordConfirm } = request.body

        if (password != passwordConfirm) {
            request.flash('message', 'As senhas informadas não coincidem')
            return response.render('e_trashway/home', { openRegister: true, inputs: { name, email, password } })
        }

        if (await User.findOne({ raw: true, where: { email } })) {
            request.flash('message', 'O endereço de e-mail informado já está cadastrado')
            return response.render('e_trashway/home', { openRegister: true, inputs: { name, password, passwordConfirm } })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        try {
            const createdUser = await User.create({ name, email, password: hashedPassword })

            request.session.userId = createdUser.id

            request.flash('message', 'Cadastro realizado com sucesso')

            request.session.save(() => {
                response.redirect('/')
                return
            })
        } catch (error) {
            console.error('Não foi possível cadastrar o usuário, erro: ' + error)
        }
    }

    static async loginUserSave(request, response) {
        const { email, password } = request.body

        const user = await User.findOne({ raw: true, where: { email } })

        if (!user) {
            request.flash('message', 'O endereço de e-mail informado não está cadastrado')
            return response.render('e_trashway/home', { openLogin: true, inputs: { password } })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            request.flash('message', 'A senha informada está incorreta')
            return response.render('e_trashway/home', { openLogin: true, inputs: { email } })
        }

        request.session.userId = user.id

        request.flash('message', 'Login realizado com secesso')

        request.session.save(()=>{
            response.redirect('/')
            return
        })
    }
}