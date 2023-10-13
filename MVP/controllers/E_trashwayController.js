module.exports = class E_trashwayController {
    static homePage (request,response){
        return response.render('e_trashway/home')
    }

    static aboutPage (request,response){
        return response.render('e_trashway/about')
    }
}