import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { registerUser } from '../apis/authApi';
import { useAuth } from '../provider/authProvider';
import { useNavigate } from 'react-router';

type FormData = {
  name: string;
  email: string;
  reg_no: string;
  password: string;
  semester: number;
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
    reg_no: '',
    password: '',
    semester: 1,
    role: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission based on the user type
    const reqData = userType === 'student' ? {
      ...formData, role: userType
    } : {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      reg_no: formData.reg_no,
      role: userType
    }

    registerUser(reqData).then((res) => {
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
          <>
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

      {/* <TextField
        label="Department"
        fullWidth
        margin="normal"
        name="department"
        value={formData.department}
        onChange={handleChange}
      /> */}
      <TextField
        label="registration number"
        fullWidth
        margin="normal"
        name="reg_no"
        value={formData.reg_no}
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
