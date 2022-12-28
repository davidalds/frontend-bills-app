import { IconType } from "react-icons"

export interface IPropsNavbarHeader {
    title: string
}

interface IOption{
    icon: IconType,
    title: string,
    link: string
}

export interface IPropsNavbarSection{
    label: string,
    options: IOption[]
}

export interface IPropsNavbarMenu{
    options: IOption[]
}
