import useCustomTranslation from "@/hooks/useCustomTranslation"
import Path from "@/utils/Path"
import useAppStore from "@/zustand/app.slice"
import { Button } from "primereact/button"
import { Menu } from "primereact/menu"
import { MenuItem } from "primereact/menuitem"
import { memo, useRef } from "react"


const LangSection = (): JSX.Element => {
    const {T} = useCustomTranslation();
    const { lang, setLang } = useAppStore();
    const refMenu = useRef<Menu>(null);

    const menuItems: MenuItem[] = [
        {
            label: 'vi',
            icon: <img src={Path.get(`../../images/${'vi'}.png`)}/>,
            command: () => {
                setLang('vi');
            },
        },
        {
            label: 'en',
            icon: <img src={Path.get(`../../images/${'en'}.png`)}/>,
            command: () => {
                setLang('en');
            },
        }
    ]

    return (
        <div>
            <Button
                rounded
                size="small"
                text
                severity="secondary"
                outlined
                className={"flex items-center space-x-2 !p-0 lg:!px-[1.09375rem] lg:!py-[.65625rem]"}
                onClick={(e) => refMenu.current?.toggle(e)}>
                <img 
                    src={Path.get(`../../images/${lang}.png`)}/>
                <span className="uppercase hidden lg:inline-block">{T(lang)}</span>
            </Button>
            <Menu
                ref={refMenu}
                popup
                className="w-auto min-w-[80px]"
                model={menuItems}
                pt={{
                    action: {
                        className: "flex items-center space-x-2 uppercase text-gray-9 text-sm"
                    }
                }}/>
        </div>
    )
}

export default memo(LangSection)