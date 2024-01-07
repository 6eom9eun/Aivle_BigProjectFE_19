import React, { useState, useEffect } from "react";
import axios from "axios";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Button, Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import UserProfile2 from "../board/UserProfile2";

function RankPage() {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const token = sessionStorage.getItem('aivle19_token');
    const [profiles, setProfiles] = useState({});


    let list = useAsyncList({
    async load({signal, cursor}) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

      const res = await fetch(cursor || "http://127.0.0.1:8000/rank/", {signal});
      let json = await res.json();
      console.log(json);

      if (!cursor) {
        setIsLoading(false);
      }

      return {
        items: json,
        cursor: json.next,
      };
    },
  });

  const hasMore = page < 9;

  return (
    <div style={{padding:'63px', fontFamily: 'JalnanGothic'}}>
        <Table
          bottomContent={
            hasMore && !isLoading ? (
              <div className="flex w-full justify-center">
                <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
                  {list.isLoading && <Spinner color="white" size="sm" />}
                  더 보기
                </Button>
              </div>
            ) : null
          }
          classNames={{
            base: "max-h-[666px] overflow-scroll",
            table: "min-h-[666px]",
          }}
        >
        <TableHeader>
          <TableColumn style={{paddingLeft:'95px'}} key="rank">순위</TableColumn>
          <TableColumn style={{paddingLeft:'102px'}} key="username">아이디</TableColumn>
          <TableColumn style={{paddingLeft:'112px'}} key="user_level">레벨</TableColumn>
          <TableColumn style={{paddingLeft:'145px'}} key="created_dt">클리어 시간</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items.map((item, index) => ({...item, rank: index + 1}))}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item, index) => (
            <TableRow key={item.user_id}>
              {(columnKey, cellIndex) => 
                <TableCell style={{paddingLeft:'100px'}}>
                {columnKey === 'username' ? ( 
                  <Popover placement="right">
                    <PopoverTrigger>
                      <span>{getKeyValue(item, columnKey)}</span>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <UserProfile2 userId={item.user_id} token={token} profiles={profiles} setProfiles={setProfiles}/>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : columnKey === 'rank' ? (item.rank <= 3 ? '👑' : getKeyValue(item, columnKey)) : columnKey === 'user_level' ? `${getKeyValue(item, columnKey)} Level` : columnKey === 'created_dt' ? new Date(getKeyValue(item, columnKey)).toLocaleString() : getKeyValue(item, columnKey)}
              </TableCell>}
          </TableRow>
        )}
      </TableBody>
      </Table>
    </div>
  )
}

export default RankPage