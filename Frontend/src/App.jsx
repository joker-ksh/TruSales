import './App.css'
import { Frame } from './components/Frame'
import { Sidebar } from './components/Sidebar'


function App() {

  return (
    <div
          className="flex items-start relative overflow-x-hidden w-full min-w-[1456px] min-h-[955px]"
          data-model-id="1:564"
        >
          <Sidebar />
          <Frame />
          <div className="relative w-[105px] h-[50px] mr-[-105.00px]" />
    </div>
  )
}

export default App
