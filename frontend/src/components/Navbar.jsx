import { Link } from 'react-router';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';

export default function Navbar() {

    const handleLogout = () => {
       console.log('logout');
    };

    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/">DevLogs</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/bookmarks">Bookmarks</Nav.Link>
                    </Nav>
                    <Button 
                        variant="light" 
                        onClick={handleLogout}
                        className="ms-2"
                    >
                        Logout
                    </Button>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
} 