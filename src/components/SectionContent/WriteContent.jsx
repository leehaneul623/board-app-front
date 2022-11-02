import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { BsChatDots } from 'react-icons/bs'
import { url } from '../../util/url'
import { useNavigate } from 'react-router-dom'

const WriteContent = () => {
  const navigate = useNavigate()
  const [writeData, setWriteData] = useState({
    writeTitle: '',
    writeContent: '',
    writeCategory: '',
  })
  const [item, setItem] = useState('none')

  const writeCreate = async (event) => {
    setWriteData(() => {
      return {
        writeTitle: '',
        writeContent: '',
      }
    })
    const json = await axios({
      url: `${url}/question/write?title=${writeData.writeTitle}&content=${writeData.writeContent}&category=${item}`,
      method: 'GET',
    })
    if (json.data === '작성완료' && item != 'none') {
      alert('성공적으로 작성되었습니다')

      navigate('/')
    } else if (item === 'none') {
      alert('항목을 다시 확인해주세요.')
    }
  }

  const option = (e) => {
    console.log(e.target.value)
    setItem(e.target.value)
  }

  return (
    <div className="w-[1200px] h-[1187px] pt-20">
      <div className="flex flex-row justify-around ml-20 mt-16 text-xl">
        <div className="flex mt-4">
          <BsChatDots />
          <p className="ml-4">자유롭게 작성해주세요.</p>
        </div>
        <select
          className="select select-info w-full max-w-xs"
          onChange={option}
        >
          <option value="none">Category</option>
          <option value="Knowledge">Knowledge</option>
          <option value="Music">Music</option>
          <option value="Exercise">Exercise</option>
          <option value="Cooking">Cooking</option>
          <option value="Etc">Etc</option>
        </select>
      </div>
      <input
        type="text"
        className="flex items-center w-[1024px] h-[75px] bg-white rounded-3xl ml-32 mt-10 pl-4 outline-none"
        placeholder="제목을 입력해주세요."
        value={writeData.writeTitle}
        onChange={(e) => {
          setWriteData((prev) => {
            return { ...prev, writeTitle: e.target.value }
          })
        }}
      />
      <textarea
        type="text"
        className="w-[1024px] h-[600px] bg-white rounded-3xl ml-32 mt-14 pl-4 p-4"
        placeholder="내용을 입력해주세요."
        value={writeData.writeContent}
        onChange={(e) => {
          setWriteData((prev) => {
            return { ...prev, writeContent: e.target.value }
          })
        }}
      ></textarea>
      <button
        className="w-[150px] h-[60px] bg-[#49A9E8] rounded-full mt-14 ml-[1000px]"
        onClick={writeCreate}
      >
        <p className="text-white">Submit</p>
      </button>
    </div>
  )
}

export default WriteContent
