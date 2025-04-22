import { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { PersonCircle, Pencil } from 'react-bootstrap-icons';
import { useFetch } from '../hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';


export default function ProfilePage() {
	const [isEditing, setIsEditing] = useState(false);
	const [user, setUser] = useState({});
	const [formData, setFormData] = useState({ ...user });
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
  const { request, loading, error, clearError } = useFetch();
  const auth = useContext(AuthContext);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
  }, [error]);
  
  useEffect(() => {
    const fetchUserData = async () => {
			try {
				const data = await request('/api/profile', 'GET', null,{
          Authorization: `Bearer ${auth.token}`
        });
				setUser(data);
				setFormData(data);
			} catch (err) {
				console.error('Error fetching user data:', err);
			}
		};
		fetchUserData();
  }, [])

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('username', user.name);
			formData.append('email', user.email);
			formData.append('bio', user.bio);
			if (image) {
				formData.append('image', image);
			}

			const data = await request('/api/profile', 'PUT', formData, {
        Authorization: `Bearer ${auth.token}`,
      });
			if (data) {
				setUser(data);
				setIsEditing(false);
				toast.success('Profile updated successfully!');
			}
		} catch (err) {
			console.error('Error updating profile:', err);
		}
  };
  
  if (loading) return <Loader/> 

	return (
		<Container className='py-4'>
			<Card className='mb-4'>
				<Card.Body>
					<Row>
						<Col
							md={3}
							className='text-center'
						>
							<div className='position-relative d-inline-block'>
								{imagePreview ? (
									<img
										src={imagePreview}
										alt='Profile'
										className='rounded-circle'
										style={{
											width: '120px',
											height: '120px',
											objectFit: 'cover',
										}}
									/>
								) : (
									<PersonCircle
										size={120}
										className='text-primary'
									/>
								)}
								{isEditing && (
									<Button
										variant='light'
										size='sm'
										className='position-absolute bottom-0 end-0 rounded-circle'
										style={{ width: '32px', height: '32px' }}
										onClick={() =>
											document.getElementById('profileImage').click()
										}
									>
										<Pencil size={16} />
									</Button>
								)}
								<input
									type='file'
									id='profileImage'
									accept='image/*'
									onChange={handleImageChange}
									style={{ display: 'none' }}
								/>
							</div>
						</Col>
						<Col md={9}>
							{isEditing ? (
								<Form onSubmit={handleSubmit}>
									<Form.Group className='mb-3'>
										<Form.Label>Name</Form.Label>
										<Form.Control
											type='text'
											name='name'
											value={formData.username}
											onChange={handleInputChange}
											required
										/>
									</Form.Group>
									<Form.Group className='mb-3'>
										<Form.Label>Email</Form.Label>
										<Form.Control
											type='email'
											name='email'
											value={formData.email}
											onChange={handleInputChange}
											required
										/>
									</Form.Group>
									<Form.Group className='mb-3'>
										<Form.Label>Bio</Form.Label>
										<Form.Control
											as='textarea'
											rows={3}
											name='bio'
											value={formData.bio || ''}
											onChange={handleInputChange}
										/>
									</Form.Group>
									<div className='d-flex gap-2'>
										<Button
											variant='outline-secondary'
											onClick={() => {
												setIsEditing(false);
												setFormData({ ...user });
											}}
										>
											Cancel
										</Button>
										<Button
											variant='primary'
											type='submit'
											disabled={loading}
										>
											{loading ? 'Saving...' : 'Save Changes'}
										</Button>
									</div>
								</Form>
							) : (
								<div>
									<div className='d-flex justify-content-between align-items-start mb-3'>
										<div>
											<h2 className='mb-1'>{user.name}</h2>
											<p className='text-muted mb-2'>{user.email}</p>
											<p className='mb-3'>{user.bio}</p>
											<small className='text-muted'>
												Joined {new Date(user.joined).toLocaleDateString()}
											</small>
										</div>
										<Button
											variant='outline-primary'
											onClick={() => setIsEditing(true)}
										>
											Edit Profile
										</Button>
									</div>
								</div>
							)}
						</Col>
					</Row>
				</Card.Body>
			</Card>
			<ToastContainer />
		</Container>
	);
}
