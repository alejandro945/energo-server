import { AbstractRepositoryImpl } from "./domain/repositories/abstract-repository"
import SitesRouter from "./presentation/routers/site-router"
import { server } from "./server"

(async () => {
    const sitesMiddleWare = SitesRouter(AbstractRepositoryImpl<Site>())
    server.use("/site", sitesMiddleWare)
    server.listen(4000, () => console.log("Running on http://localhost:4000"))

})()