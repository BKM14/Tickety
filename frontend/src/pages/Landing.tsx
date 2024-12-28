import { AuthenticationForm } from "../packages/components/AuthenticationForm";
import { HeaderSimple } from "../packages/components/HeaderSimple";

const Landing = () => {
    return <div className="bg-gray-50 h-screen">
        <div>
            <HeaderSimple links={{
                    linksArray: [],
                    user: "admin"
                }} 
            />
        </div>
        
        <main className="grid grid-cols-2">
            <div className="pl-20 my-auto">
                <h2 className="font-bold text-4xl my-4">Ticketing software for every team</h2>
                <div className=" text-2xl">
                    Effortlessly create and customize support tickets to fit your team's unique needs. 
                    Simplify workflows and enhance collaboration - try Tickety for free today!
                </div>
            </div>
            <div className="w-2/5 mx-auto">
                <AuthenticationForm />
            </div>
        </main>
    </div>
}

export default Landing;