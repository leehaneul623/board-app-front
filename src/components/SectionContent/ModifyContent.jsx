import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { BsChatDots } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../../util/url'

const ModifyContent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [detailData, setDetailData] = useState([])
  const [titleValue, setTitleValue] = useState('')
  const [contentValue, setContentValue] = useState('')
  const navigate = useNavigate()

  const { questionId } = useParams()

  const editContent = async () => {
    try {
      const json = await axios({
        url: `${url}/question/detail/${questionId}`,
        method: 'GET',
      })

      setDetailData(json.data)
      setTitleValue(json.data.title)
      setContentValue(json.data.content)
      setIsLoading(false)
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    editContent()
  }, [])

  const postUpDate = async () => {
    const data = await axios({
      url: `${url}/question/modify/${questionId}`,
      method: 'POST',
      data: {
        title: titleValue,
        content: contentValue,
      },
    })
  }

  const postDelete = async () => {
    const data = await axios({
      url: `${url}/question/delete/${questionId}`,
      method: 'POST',
      data: {
        title: titleValue,
        content: contentValue,
      },
    })
  }

  const postCheck = () => {
    if (titleValue === '') {
      alert('제목을 입력해주세요.')
    } else if (contentValue === '') {
      alert('내용을 입력해주세요.')
    } else {
      alert('수정이 완료되었습니다.')
      postUpDate()
      navigate('/')
    }
  }

  const deleteCheck = () => {
    alert('게시물 삭제가 완료 되었습니다.')
    postDelete()
    navigate('/')
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-rose-500 text-2xl">{error.message}</p>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-rose-500 text-2xl">
          <CgSpinner className="m-auto mb-2 animate-spin text-3xl" />
          Loading
        </p>
      </div>
    )
  }

  return (
    <div className="w-full sm:w-[1200px] md:w-[80%] h-[1187px] pt-20 p-[5%] lg:ml-0">
      <div className="flex flex-row ml-[5%] sm:ml-[5%] md:ml-0 mt-16 text-xl">
        <BsChatDots />
        <p className="ml-4">자유롭게 수정해주세요.</p>
      </div>
      <div>
        <input
          type="text"
          className="leading-[75px] w-[100%] h-[75px] bg-white rounded-3xl sm:ml-[5%] md:ml-0 mt-10 p-4 text-lg"
          value={titleValue}
          onChange={(e) => {
            setTitleValue(e.target.value)
          }}
        />
        <textarea
          type="text"
          className="w-[100%] h-[600px] bg-white rounded-3xl sm:ml-[5%] md:ml-0 mt-10 pl-4 p-4 text-lg overflow-y-scroll whitespace-pre-wrap"
          value={contentValue}
          onChange={(e) => {
            setContentValue(e.target.value)
          }}
        ></textarea>
      </div>
      <div className="flex justify-end mt-14">
        <button
          onClick={postCheck}
          className="w-[120px] sm:w-[150px] h-[45px] bg-[#49A9E8] rounded-full"
        >
          <p className="text-white">Edit</p>
        </button>
        <button
          onClick={deleteCheck}
          className="w-[120px] sm:w-[150px] h-[45px] bg-[#49A9E8] rounded-full ml-[5%]"
        >
          <p className="text-white">Delete</p>
        </button>
      </div>
    </div>
  )
}

export default ModifyContent
