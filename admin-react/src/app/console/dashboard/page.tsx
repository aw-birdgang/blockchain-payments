// src/app/page.tsx (루트 경로)
import CBasicPage from '@/common/components/layout/CBasicPage';
import React from 'react';
import DashboardToday from '@/app/console/dashboard/DashboardToday';
import { useLanguageStore } from '@/common/states/locale';
import { TokenUtil } from '@/common/utils/TokenUtil';
import { headers } from 'next/headers';
import { BaseHttp } from '@/common/api/BaseHttp';
import { ApiUrl } from '@/common/api/ApiUrl';


async function fetchGameDraw(accessToken: string) {
  return BaseHttp.call({
    url: ApiUrl.A00_A0000000_GAME_DRAW,
    method: 'GET',
    target: 'api',
    accessToken,
  });
}

async function fetchLineIssue(accessToken: string) {
  return BaseHttp.call({
    url: ApiUrl.A00_A0000000_LINE_ISSUE_DAY,
    method: 'GET',
    target: 'api',
    accessToken,
  });
}

async function fetchMemberJoin(accessToken: string) {
  return BaseHttp.call({
    url: ApiUrl.A00_A0000000_MEMBER_JOIN_DAY,
    method: 'GET',
    target: 'api',
    accessToken,
  });
}

export default async function DashboardPage({ params }: any) {
  const lang = useLanguageStore.getState?.().langSet;
  const userInfo = await TokenUtil.getUserInfoFromServer(headers());
  const drawData = await fetchGameDraw(userInfo?.access_token);
  const ticketIssue = await fetchLineIssue(userInfo?.access_token);
  const memberJoin = await fetchMemberJoin(userInfo?.access_token);

  return (
    <CBasicPage
      userInfo={userInfo}
      title={lang.dashboard}
      logout={drawData.logout || ticketIssue.logout || memberJoin.logout}
      alertMessage={
        drawData.logout || ticketIssue.logout || memberJoin.logout
          ? lang.message_loading_error
          : undefined
      }>
      <DashboardToday
        drawData={drawData.data}
        ticketIssue={ticketIssue.data}
        memberJoin={memberJoin.data}
      />
    </CBasicPage>
  );
};