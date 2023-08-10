import { memo } from "react"
import ActionSteps from "./ActionSteps"
import WelcomeSection from "./WelcomeSection"

const Home = (): JSX.Element => {

    return (
        <div className="w-full h-full p-5 pt-0 flex flex-col space-y-5">
            <WelcomeSection/>
            <div className="grow">
                <ActionSteps/>
            </div>
            {/* <BottomNav/> */}
        </div>
    )
}

export default memo(Home)