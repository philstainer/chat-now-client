import {Loader} from 'components/Loader'

interface Props {
  loading: boolean
  children: any
}

export const Button = ({loading, children}: Props): JSX.Element => {
  return (
    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      disabled={loading}
    >
      {loading && <Loader />}
      {!loading && children}
    </button>
  )
}
