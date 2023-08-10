import { RouteObject } from "react-router-dom";


export type RouteExtends = Omit<RouteObject, 'children'> & {
    children?: RouteExtends[],
}