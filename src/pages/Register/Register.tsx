import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { resetLoginStates } from '@/store/slices/loginSlice';
import { resetRegisterStates } from '@/store/slices/registerSlice';
import { register } from '@/store/slices/registerSlice.actions';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const success = useAppSelector((state) => state.register.success);
  const error = useAppSelector((state) => state.register.error);

  const [payload, setPayload] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!success) {
      return;
    }

    navigate('/login');
  }, [success]);

  useEffect(() => {
    return () => {
      dispatch(resetRegisterStates())
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(payload));
  };

  return (
    <div className="container mx-auto grid min-h-screen place-content-center">
      <form
        className="flex min-h-40 flex-col gap-2 rounded border-4 p-8 w-80"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-8 text-2xl font-bold">Register</h1>

        <label>Name</label>
        <div>
          <input
            name="name"
            type="text"
            className="size-full rounded border-2 px-2 py-1"
            onChange={handleChange}
          />
        </div>

        <label>Phone Number</label>
        <div className="mb-8">
          <input
            name="phoneNumber"
            type="text"
            className="size-full rounded border-2 px-2 py-1"
            onChange={handleChange}
          />
        </div>

        <label>Email</label>
        <div>
          <input
            name="email"
            type="text"
            className="size-full rounded border-2 px-2 py-1"
            onChange={handleChange}
          />
        </div>

        <label>Password</label>
        <div>
          <input
            name="password"
            type="password"
            className="size-full rounded border-2 px-2 py-1"
            onChange={handleChange}
          />
        </div>

        <label>Confirm Password</label>
        <div>
          <input
            name="confirmPassword"
            type="password"
            className="size-full rounded border-2 px-2 py-1"
            onChange={handleChange}
          />
        </div>

        {error ? <div className="mt-4 text-red-600">{error}</div> : null}

        <button className="mt-8 rounded bg-slate-800 px-4 py-2 text-white">
          Sign Up
        </button>

        <div className="text-center text-sm">
          or log in{' '}
          <Link to="/login" className="cursor-pointer font-bold text-blue-600">
            here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
