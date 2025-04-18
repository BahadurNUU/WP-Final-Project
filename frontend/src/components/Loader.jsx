import { Spinner } from "react-bootstrap"

export default function Loader() {
  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <h1 className="mb-4">Loading...</h1>
      <Spinner animation="border" variant="primary" />
    </div>
  )
}