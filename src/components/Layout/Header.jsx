import React from 'react'
import { BsSearch, BsBoxArrowInRight, BsPersonPlusFill } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../../Recoil'

const Header = () => {
  return (
    <div className="w-full h-20 bg-[#F6F3F3] shadow-xl">
      <div className="flex flex-row justify-between items-center w-full h-20">
        <Link to="/">
          <div className="w-[150px] h-[70px] bg-[url(../../board-img/logo.jpg)] bg-center bg-cover"></div>
        </Link>
        <div className="w-[600px] h-[60px] bg-[#F6F3F3] border-solid border-4 border-gray rounded-full">
          <form className="flex items-center justify-between">
            <input className="w-[530px] h-[50px] p-4 bg-[#F6F3F3] rounded-3xl outline-none" />
            <button>
              <BsSearch className="text-3xl mr-4" />
            </button>
          </form>
        </div>
        <div className="flex flex-row justify-between items-center w-[150px] h-[60px] mr-8">
          <Link to="/login">
            <BsBoxArrowInRight className="text-[28px] text-gray-500" />
          </Link>
          <Link to="/signup">
            <BsPersonPlusFill className="text-[28px] text-gray-500" />
          </Link>
          <Link to="/write">
            <BiEditAlt className="text-[28px] text-gray-500" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
