// import React, { useState, FormEvent } from 'react';
// import { useMutation } from '@apollo/client';
// import { REGISTER_USER } from '../graphql/mutations'; // Import your GraphQL mutation

// const Register: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
//     onCompleted: (data) => {
//       console.log('Registration successful!', data);
//     },
//   });

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     // Perform the registration mutation
//     registerUser({
//       variables: {
//         email,
//         password,
//       },
//     });
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           Register
//         </button>
//         {error && <p>Error: {error.message}</p>}
//       </form>
//     </div>
//   );
// };

// export default Register;

import React from 'react'

const Register = () => {
  return (
    <div>Register</div>
  )
}

export default Register