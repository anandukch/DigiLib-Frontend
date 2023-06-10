import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';

type FormData = {
  name: string;
  studentId: string;
  teacherId: string;
  issuerId: string;
  adminId: string;
  email: string;
};

type RegistrationFormProps = {
  userType: string;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ userType }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    studentId: '',
    teacherId: '',
    issuerId: '',
    adminId: '',
    email: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission based on the user type
    switch (userType) {
      case 'student':
        console.log('Student Registration Form Submitted:', formData);
        break;
      case 'teacher':
        console.log('Teacher Registration Form Submitted:', formData);
        break;
      case 'issuer':
        console.log('Issuer Registration Form Submitted:', formData);
        break;
      case 'admin':
        console.log('Admin Registration Form Submitted:', formData);
        break;
      default:
        break;
    }
  };

  const renderFormFields = () => {
    switch (userType) {
      case 'student':
        return (
          <> <TextField
            label="Student ID"
            fullWidth
            margin="normal"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          />
          <TextField
            label="Student ID"
            fullWidth
            margin="normal"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          />
          </>
         
        );
      case 'teacher':
        return (
          <TextField
            label="Teacher ID"
            fullWidth
            margin="normal"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
          />
        );
      case 'issuer':
        return (
          <TextField
            label="Issuer ID"
            fullWidth
            margin="normal"
            name="issuerId"
            value={formData.issuerId}
            onChange={handleChange}
          />
        );
      case 'admin':
        return (
          <TextField
            label="Admin ID"
            fullWidth
            margin="normal"
            name="adminId"
            value={formData.adminId}
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
      
      {renderFormFields()}
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
