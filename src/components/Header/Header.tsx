// import cn from 'classnames';
import dynamic from "next/dynamic";
import React from 'react';
import s from './Header.module.scss';
const Logos = dynamic(import('../Logo/Logo'));
// const Burger = dynamic(import('../Burger/Burger'));
// const cx = cn.bind(s)
const Header = ({
  isOpen,
}: {
  isOpen: boolean
  hide: boolean
  setIsOpen: (bool: boolean) => void
}) => {

  // const position = useCustomScrollPosition()

  // const handleClick = () => {
  //   setIsOpen(!isOpen)
  // }

  return (
    <header className={s.Header}>
      <div>
        <Logos menuIsOpen={isOpen} />
      </div>
      {/* <div onClick={handleClick} style={{ display: 'block' }}>
        <Burger isOpen={isOpen} position={-position} hide={hide}/>
      </div> */}
      <img src={'/images/herbie-schriftzug.jpg'} alt={'Herbie unverpackt Logo' } className={s.herbie}/>
    </header>
  )
}

export default Header
