import clsx from 'clsx'
import { ClassStyleConfig } from '../../../configs/style-config';

const baseStyles = {
  solid:
    'text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'ring-1 text-sm font-semibold focus:outline-none hover:bg-primary-base hover:text-white focus:outline-none',
}

const variantStyles = {
  solid: {
    primary: 'bg-primary-base text-white hover:bg-primary-light active:bg-primary-light active:text-white focus-visible:outline-primary-base',
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    white:
      'bg-white border border-[#344054] text-slate-900 hover:bg-gray-400 active:bg-gray-300 active:text-slate-900 focus-visible:outline-white',
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
  },
  outline: {
    primary: 'ring-primary-base text-primary-base hover:text-primary-light hover:ring-primary-base hover:bg-white active:bg-white active:text-white focus-visible:outline-primary-base',
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
  },
}

export function Button({
  variant = 'solid',
  color = 'primary',
  className = '',
  href = null,
  disabled = false,
  ...props
}) {

  const classes = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className,
    ClassStyleConfig.button.rounded,
    ClassStyleConfig.button.spacing,
    ClassStyleConfig.button.fontFamily,
    'group inline-flex items-center justify-center transition-all duration-500 ease-in-out',
    disabled ? 'disabled:opacity-50 cursor-not-allowed' : 'cursor-pointer'
  )

  const defautBtnUI = () => {
    return href ? (
      <a href={href} className={clsx(classes)} {...props}></a>
    ) : (
      <button
        type="button"
        className={clsx(
          classes,
          ClassStyleConfig.onboarding.buttonBg,
          ClassStyleConfig.onboarding.buttonTextColor,
          ClassStyleConfig.onboarding.buttonHoverBg,
          ClassStyleConfig.onboarding.buttonHoverTextColor,
        )}
        disabled={disabled}
        {...props}
      />
    );
  }

  return defautBtnUI();

}

export default Button;
