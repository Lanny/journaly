import React, { Children } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

const NavLink: React.FC<LinkProps> = (props) => {
  const { href, children, ...otherProps } = props
  const router = useRouter()
  const child = Children.only(children) as React.ReactElement
  let className = child.props.className

  if (router.pathname === href) {
    if (className) className = `${className} active`
    else className = 'active'
  }

  return (
    <Link href={href} {...otherProps}>
      {React.cloneElement(child, { className })}
    </Link>
  )
}

export default NavLink
