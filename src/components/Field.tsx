import classNames from 'classnames'

interface Props {
  label: string
  required?: boolean
  error?: string
  type?: 'text' | 'password'
  autoComplete?: 'name' | 'email' | 'current-password' | 'new-password'
  className?: string
  register?: any
}

export const Field = ({
  label,
  required,
  error,
  type = 'text',
  className,
  register,
}: Props): JSX.Element => {
  const id = label.toLowerCase().split(' ').join('_')

  return (
    <div className="space-y-1">
      <label htmlFor={id}>
        {label} {required && <span className="text-sm text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        className={classNames(
          'block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
          className
        )}
        {...register}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
