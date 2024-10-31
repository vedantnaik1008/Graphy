import { useState } from "react";


const FormValidation = () => {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      passwordStrength: 0
  });
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(!show)

  const handleChange = (e) => {
    const {name, value} = e.target
    let newFormData = { ...formData, [name]: value };
     if (name === 'password') {
         let strength = 0;
         if (value.length >= 8) strength += 1;
         if (/[A-Z]/.test(value)) strength += 1;
         if (/[a-z]/.test(value)) strength += 1;
         if (/[0-9]/.test(value)) strength += 1;
         if (/[@#$%^&*(),.?":{}|<>]/g.test(value)) strength += 1;
         newFormData = { ...newFormData, passwordStrength: strength };
     }
     setFormData(newFormData);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let nameError = ""
    let emailError = "" 
    let passwordError = ''
    
    if(formData.name.length <= 3) nameError = 'Name must be at least 4 characters.'

    if(!formData.email){ 
      emailError = "Email is required."
    }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      emailError = 'Email is not valid.';
    }

    if(!formData.password){
      passwordError = "Password is required."
    }else if(formData.password.length < 8){
      passwordError = "Password must be at least 8 characters."
    }

    setFormData({...formData, nameError, emailError, passwordError})

    if(!nameError && !emailError && !passwordError)console.log(formData);
  }

  return (
      <div className='p-10 rounded-2xl bg-black text-white font-mono'>
          <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-8 items-start'>
              <h2 className='text-[30px] font-mono font-bold text-center'>
                  Form Validation
              </h2>
              <label htmlFor='name' className='w-full'>
                  <input
                      type='text'
                      name='name'
                      value={formData.name}
                      id='name'
                      onChange={handleChange}
                      placeholder='name'
                      className=' border-b-2 border-b-white bg-black focus-visible:outline-none focus-visible:border-b-blue-500 text-white w-full'
                  />
                  {formData.nameError && (
                      <p className='text-red-500 text-[10px] my-1 text-center mx-auto w-[95%]'>
                          {formData.nameError}
                      </p>
                  )}
              </label>
              <label htmlFor='email' className='w-full'>
                  <input
                      type='email'
                      name='email'
                      value={formData.email}
                      id='email'
                      onChange={handleChange}
                      placeholder='email'
                      className=' border-b-2 border-b-white bg-black focus-visible:outline-none focus-visible:border-b-blue-500  w-full'
                  />
                  {formData.emailError && (
                      <p className='text-red-500 text-[10px] my-1 text-center'>
                          {formData.emailError}
                      </p>
                  )}
              </label>
              <label htmlFor='password' className='relative w-full'>
                  <input
                      type={show ? 'text' : 'password'}
                      name='password'
                      value={formData.password}
                      id='password'
                      onChange={handleChange}
                      placeholder='password'
                      className=' border-b-2 border-b-white bg-black focus-visible:outline-none focus-visible:border-b-blue-500  w-full'
                  />
                  <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      className='absolute right-0 top-0'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='white'
                      onClick={handleShow}>
                      <path d='M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z' />
                  </svg>
                  {formData.passwordError && (
                      <p className='text-red-500 text-[10px] my-1 text-center'>
                          {formData.passwordError}
                      </p>
                  )}
                  {formData.password && (
                      <div className='password-strength bg-gray-300 rounded-md my-2'>
                          <div
                              className='progress-bar bg-green-500 rounded-md relative'
                              style={{
                                  width: `${formData.passwordStrength * 20}%`
                              }}>
                              {' '}
                              <span className='absolute right-1 top-0'>
                                  {formData.passwordStrength * 20}%
                              </span>
                          </div>
                      </div>
                  )}
              </label>

              <button
                  className='bg-blue-500 rounded-lg w-full font-medium text-white py-3 px-6'
                  type='submit'>
                  Submit
              </button>
          </form>
      </div>
  );
}

export default FormValidation