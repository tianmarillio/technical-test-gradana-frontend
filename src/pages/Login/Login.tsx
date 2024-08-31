import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { resetLoginStates } from '@/store/slices/loginSlice'
import { login } from '@/store/slices/loginSlice.actions'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const accessToken = useAppSelector((state) => state.main.accessToken)
  const error = useAppSelector((state) => state.login.error)

  const [payload, setPayload] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (!accessToken) {
      return
    }

    navigate('/')
  }, [accessToken, navigate])

  useEffect(() => {
    return () => {
      dispatch(resetLoginStates())
    }
  }, [dispatch])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setPayload({
      ...payload,
      [name]: value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(payload))
  }

  return (
    <div className="container mx-auto grid min-h-screen place-content-center">
      <form
        className="flex min-h-40 w-80 flex-col gap-2 rounded border-4 p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-8 text-2xl font-bold">Login</h1>

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

        {error ? <div className="mt-4 text-red-600">{error}</div> : null}

        <button className="mt-8 rounded bg-slate-800 px-4 py-2 text-white">
          Sign In
        </button>

        <div className="text-center text-sm">
          or create new account{' '}
          <Link
            to="/register"
            className="cursor-pointer font-bold text-blue-600"
          >
            here
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
