import ComponentsList from '../_components/ComponentsList'
import UpperBar from '../_components/UpperBar'
import Generator from '../_components/Generator'
import PagesList from '../_components/PagesList'
import ComponentsTree from '../_components/ComponentsTree'
import "./index.css"

function App() {


  return (
    <div id='root'>
      <UpperBar>
        <PagesList/>
      </UpperBar>
      <ComponentsList />
      <ComponentsTree />
      <Generator />
    </div>
  )
}

export default App