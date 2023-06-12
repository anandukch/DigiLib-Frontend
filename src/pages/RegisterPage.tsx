import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { registerUser } from '../apis/authApi';
import { useAuth } from '../provider/authProvider';
import { useNavigate } from 'react-router';

type FormData = {
  name: string;
  email: string;
  adm_no: string;
  password: string;
  semester: any;
  department: any;
  designation: any;
  role: any;
};

type RegistrationFormProps = {
  userType: string;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ userType }) => {
  const { setToken, setRole } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    adm_no: '',
    password: '',
    semester: '',
    department: '',
    designation: '',
    role: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate=useNavigate()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission based on the user type
    registerUser({
      ...formData,
      role: userType,
    }).then((res) => {
      const token = res.data.access_token;
      setToken(token);
      setRole(res.data.role);
      navigate('/login', { replace: true });
    }).catch((err) => {
      console.log(err);
    });


  };

  const renderFormFields = () => {
    switch (userType) {
      case 'student':
        return (
          <> <TextField
            label="admission number"
            fullWidth
            margin="normal"
            name="adm_no"
            value={formData.adm_no}
            onChange={handleChange}
          />
            <TextField
              label="Semester"
              fullWidth
              margin="normal"
              name="semester"
              type='number'
              value={formData.semester}
              onChange={handleChange}
            />
          </>

        );
      case 'teacher':
        return (
          <TextField
            label="Designation"
            fullWidth
            margin="normal"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <TextField
        label="Password"
        fullWidth
        margin="normal"
        type='password'
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <TextField
        label="Department"
        fullWidth
        margin="normal"
        name="department"
        value={formData.department}
        onChange={handleChange}
      />
      {renderFormFields()}
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
