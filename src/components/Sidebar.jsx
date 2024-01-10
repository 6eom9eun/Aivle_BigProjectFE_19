import style from "./style.css";
import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import GoToLatestAndQuizList from "./GoToLatestAndQuizList";

import { IoMdLogOut, IoMdLogIn } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { FaRankingStar } from "react-icons/fa6";
import { GoCommentDiscussion } from "react-icons/go";
import { MdDeveloperMode, MdOutlineNotificationImportant  } from "react-icons/md";

const Sidebar = (props) => {
    return (
    <div>
        <div ref={props.side} className={`${props.isOpen === true? 'drop-shadow-[25px_25px_100px_var(--color-primary-900)]' :'drop-shadow-none'} sidebar`} style={{ width: `${props.width}px`, height: '100%',  transform: `translatex(${-props.xPosition}px)`}}>
            <div className="content">
                <div className="lg:hidden">
                    {
                        props.isLogin ?
                        <table className="w-[100%] text-right">
                            <tr>
                                <td colspan="2">
                                    <a href="#" onClick={props.onClickLogout} className="flex justify-end hover:text-[var(--color-warning-500)]">
                                        <IoMdLogOut size={25} />
                                        <span>&nbsp;&nbsp;로그아웃</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href={process.env.PUBLIC_URL+"/rank"} className="flex justify-end hover:text-[var(--color-primary-500)]">
                                        <FaRankingStar size={25} />
                                        <span>&nbsp;&nbsp;전체랭킹</span>
                                    </a>
                                </td>
                                <td>
                                    <a href={process.env.PUBLIC_URL+"/myinfo"} className="flex justify-end hover:text-[var(--color-primary-500)] border-s-2">
                                        <CiUser size={25} />
                                        <span>&nbsp;&nbsp;{props.username} 님</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href={process.env.PUBLIC_URL+"/notice"} className="flex justify-end text-[var(--color-danger-500)] hover:text-[var(--color-primary-600)]">
                                        <MdOutlineNotificationImportant size={25} />
                                        <span>&nbsp;&nbsp;공지사항</span>
                                    </a>
                                </td>
                                <td>
                                    <a href={process.env.PUBLIC_URL+"/board"} className="flex justify-end hover:text-[var(--color-primary-500)] border-s-2">
                                        <GoCommentDiscussion size={25} />
                                        <span>&nbsp;&nbsp;커뮤니티</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <a href={process.env.PUBLIC_URL+"/we"} className="flex justify-end text-[var(--color-primary-900)] hover:text-[var(--color-primary-500)]">
                                        <MdDeveloperMode size={25} />
                                        <span>&nbsp;&nbsp;개발팀 소개</span>
                                    </a>
                                </td>
                            </tr>
                            {/* <tr> */}
                                {/* <td> */}
                                    {/* <a href="" className="flex justify-end hover:text-[var(--color-primary-500)]" > */}
                                        {/* <span>&nbsp;&nbsp;찬스 --개</span> */}
                                    {/* </a> */}
                                {/* </td> */}
                                {/* <td> */}
                                    {/* <a href="" className="flex justify-end hover:text-[var(--color-primary-500)]" > */}
                                        {/* <span>&nbsp;&nbsp;포인트 --점</span> */}
                                    {/* </a> */}
                                {/* </td> */}
                            {/* </tr> */}
                        </table>
                        :
                        <table className="w-[100%] text-right">
                            <tr>
                                <td colspan="2">
                                    <a href={process.env.PUBLIC_URL+"/login"} className="flex justify-end hover:text-[var(--color-primary-500)]">
                                        <IoMdLogIn size={25} />
                                        <span>&nbsp;&nbsp;로그인</span>
                                    </a>
                                    <div className="w-[100%] text-right text-xs mt-2 mb-4">
                                        <div>로그인 정보가 없습니다.</div>
                                        <div>로그인하고 서비스를 이용해 보세요.</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <a href={process.env.PUBLIC_URL+"/we"} className="flex justify-end text-[var(--color-primary-900)] hover:text-[var(--color-primary-500)]">
                                        <MdDeveloperMode size={25} />
                                        <span>&nbsp;&nbsp;개발팀 소개</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <a href={process.env.PUBLIC_URL+"/notice"} className="flex justify-end text-[var(--color-danger-500)] hover:text-[var(--color-primary-600)]">
                                        <MdOutlineNotificationImportant size={25} />
                                        <span>&nbsp;&nbsp;공지사항</span>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    }
                </div>
                <div>
                    { props.isLogin && <GoToLatestAndQuizList /> }
                </div>
            </div>
        </div>
    </div>
    );
};

export default Sidebar;