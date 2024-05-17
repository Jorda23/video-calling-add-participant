import axios from "axios";
import { useQuery } from "react-query";

interface responseData {
  agentId: string;
}

export const useGetStream = () => {
  const getAlertList = useQuery<responseData, Error>(
    ["alert"],
    () => getstreamService(),
    {
      staleTime: Infinity, 
      cacheTime: Infinity,
      enabled: true, 
    }
  );

  return getAlertList;
};

const getstreamService = async () => {
  try {
    const response = await axios.get<responseData>(
      `https://family-care-backend-dev.azurewebsites.net/getStream/getAgent`,
      {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7InVzdWFyaW9JZCI6NiwiZW1haWwiOiJjdWlkYWRvckBlbWFpbC5jb20iLCJub21icmUiOiJjdWlkYWRvciIsImltYWdlblBlcmZpbFNyYyI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNjE2NTg3MTM0NjYwLThlZjRkZDhhMWI3ZT9xPTgwJnc9MTQxMCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZpeGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4ZkElM0QlM0QiLCJ0aXBvVXN1YXJpbyI6ImN1aWRhZG9yIiwidXN1YXJpb1Blcm1pc3Npb25zIjpudWxsLCJidXNpbmVzc1BhcnRuZXJzSWQiOiI3IiwiZ2V0U3RyZWFtSWQiOiJjdWlkYWRvcjI2In0sImlhdCI6MTcxNTk2MjU4MiwiZXhwIjoxNzE1OTkxMzgyfQ.WbHLKBotCeWgUGWCaciKVizhcrpCurvEoTPTfuWj3MI"}`,
          'apikey': "abcd1234",
        },
      }
    );

    if (!response) {
      throw new Error("Failed to get agent");
    }

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
