import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Button} from "@nextui-org/react";

function NoticeList() {
  const nav = useNavigate();
    const [noticeData, setNoticeData] = useState([]);
    const token = sessionStorage.getItem('aivle19_token')
    const loginUser = sessionStorage.getItem('aivle19_username')


    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/notice/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(response.data) setNoticeData(response.data)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(noticeData.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return noticeData.slice(start, end);
    }, [page, noticeData]);

  return (
    <div className='p-4' style={{position: 'relative', fontFamily: 'JalnanGothic'}}>
        <Table 
            bottomContent={
                <div className="flex w-full items-center">
                        <div className="flex-grow flex justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                        {loginUser === 'admin' && (
                        <div className="flex justify-end">
                            <Button
                                auto
                                color="secondary"
                                onClick={() => {
                                    nav('/notice/new')
                                }}
                            >
                                공지 작성
                            </Button>
                        </div>
                        )}
                    </div>
            }
            classNames={{
            wrapper: "min-h-[666px]",
        }}
        >
            <TableHeader>
                <TableColumn style={{textAlign: 'center', alignItems: 'center', width: '60%'}} key="title">글 제목</TableColumn>
                <TableColumn style={{textAlign: 'center', alignItems: 'center', width: '40%'}} key="created_at">작성 시간</TableColumn>
            </TableHeader>
            <TableBody items={items} style={{textAlign: 'center', alignItems: 'center'}}>
                {(item) => (
                <TableRow className="cell-hover" key={item.id}>
                    {(columnKey) => 
                    <TableCell 
                    style={columnKey === 'title' ? {display: 'flex', justifyContent: 'center', alignItems: 'center'} : {}}
                    onClick ={() => {
                      if (columnKey === 'title') {
                        nav(`/notice/${item.id}`);
                      }
                    }}
                  >
                    {columnKey === 'created_at' ? new Date(getKeyValue(item, columnKey)).toLocaleString() : getKeyValue(item, columnKey)}
                  </TableCell>
                    }
                </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
  )
}

export default NoticeList