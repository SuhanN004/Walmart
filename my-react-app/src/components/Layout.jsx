import WalmartHeader from './WalmartHeader'
import WalmartFooter from './WalmartFooter'

function Layout({ children }) {
  return (
    <>
      <WalmartHeader />

      <main style={{ paddingTop: '90px', minHeight: '100vh' }}>
        {children}
      </main>

      <WalmartFooter />
    </>
  )
}

export default Layout
