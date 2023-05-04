import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const SpecialsEvents = () => {
    return (
        <div className="flex justify-center justify-items-center items-center min-h-screen">
            <div className="w-1/3 bg-slate-200 rounded-xl">
                
                <header className="flex items-center justify-between pt-6 px-8 pb-3">
                    <p className="text-2xl font-medium">September 2022</p>
                    <div className="grid grid-cols-2">
                        <span className="hover:bg-slate-400 rounded-full"><IoIosArrowBack className="h-8 w-8 my-0 mx-1 text-center leading-8 cursor-pointer"/></span>
                        <span className="hover:bg-slate-400 rounded-full"><IoIosArrowForward className="h-8 w-8 my-0 mx-1 text-center leading-8 cursor-pointer"/></span>
                    </div>
                </header>

                <div className="p-5">
                    <ul className="flex flex-wrap text-center font-medium">
                        <li className="w-[calc(100%/7)]">Sun</li>
                        <li className="w-[calc(100%/7)]">Mon</li>
                        <li className="w-[calc(100%/7)]">Tue</li>
                        <li className="w-[calc(100%/7)]">Wed</li>
                        <li className="w-[calc(100%/7)]">Thu</li>
                        <li className="w-[calc(100%/7)]">Fri</li>
                        <li className="w-[calc(100%/7)]">Sat</li>
                    </ul>
                    <ul className="flex flex-wrap text-center mb-4">
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">1</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">2</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">3</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">4</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">5</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">6</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">7</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">8</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">9</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">10</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">11</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">12</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">13</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">14</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">15</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">16</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">17</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">18</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">19</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">20</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">21</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">22</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">23</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">24</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">25</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">26</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">27</li>
                        <li className="w-[calc(100%/7)] mt-7 cursor-pointer">28</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default SpecialsEvents;