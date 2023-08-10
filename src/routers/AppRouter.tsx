import { memo, Suspense } from "react"
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom"
import routes from "./route-define"
import RouteLoading from "./RouteLoading"

const router = createBrowserRouter(
    routes.map((route) => ({
        ...route as RouteObject,
        element: (
            <Suspense fallback={<RouteLoading/>}>
                {route.element}
            </Suspense>
        ),
    }))
)

const AppRouter = (): JSX.Element => {

    return (
        <RouterProvider router={router} />
    )
}

export default memo(AppRouter)