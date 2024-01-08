import style from "./style.css";
import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import GoToLatestAndQuizList from "./GoToLatestAndQuizList";

import { IoMdLogOut } from "react-icons/io";
import { GoCommentDiscussion } from "react-icons/go";
import { FaRankingStar } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";

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
                                <td colspan="2">
                                    <a href="/myinfo" className="flex justify-end hover:text-[var(--color-primary-500)]">
                                        <CiUser size={25} />
                                        <span>&nbsp;&nbsp;{props.username} 님</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <a href="/rank" className="flex justify-end hover:text-[var(--color-primary-500)]">
                                        <FaRankingStar size={25} />
                                        <span>&nbsp;&nbsp;전체랭킹 {props.userrank}위</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <a href="/board" className="flex justify-end hover:text-[var(--color-primary-500)]">
                                        <GoCommentDiscussion size={25} />
                                        <span>&nbsp;&nbsp;커뮤니티</span>
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
                        <div className="w-[100%] text-right p-[10px]">
                            <a href={process.env.PUBLIC_URL+'/login'} className="hover:text-[var(--color-primary-500)]">로그인</a>
                        </div>
                    }
                </div>
                <div>
                    {
                        props.isLogin ? <GoToLatestAndQuizList />
                        : <div className="w-[100%] text-right p-[10px] text-sm">
                            <div>로그인 정보가 없습니다.</div>
                            <div>로그인하고 서비스를 이용해 보세요.</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
    );
};

export default Sidebar;